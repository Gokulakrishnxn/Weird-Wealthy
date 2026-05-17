"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { AuthorUpdate } from "@/lib/supabase/types";

export async function updateAuthorAction(id: string, data: AuthorUpdate) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("authors")
    .update(data)
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/authors");
  revalidatePath(`/admin/authors/${id}`);
  return { success: true };
}

export async function deactivateAuthorAction(id: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("authors")
    .update({ is_active: false })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/authors");
  return { success: true };
}

export async function activateAuthorAction(id: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("authors")
    .update({ is_active: true })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/authors");
  return { success: true };
}

export async function deleteAuthorAction(id: string) {
  const admin = createSupabaseAdminClient();

  // Archive all their posts first
  await admin
    .from("posts")
    .update({ status: "archived" })
    .eq("author_id", id);

  // Get user_id to delete auth user
  const { data: author } = await admin
    .from("authors")
    .select("user_id")
    .eq("id", id)
    .single();

  // Delete the author record
  const { error } = await admin.from("authors").delete().eq("id", id);
  if (error) return { error: error.message };

  // Delete the auth user if linked
  if (author?.user_id) {
    await admin.auth.admin.deleteUser(author.user_id);
  }

  revalidatePath("/admin/authors");
  return { success: true };
}
