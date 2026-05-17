"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Authentication failed" };

  const { data: author } = await supabase
    .from("authors")
    .select("role")
    .eq("user_id", user.id)
    .single();

  redirect(author?.role === "admin" ? "/admin" : "/author");
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/auth/login");
}

export async function inviteAuthorAction(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const role = (formData.get("role") as string) || "author";

  const admin = createSupabaseAdminClient();

  const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
    data: { name, role },
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?type=invite`,
  });

  if (error) return { error: error.message };

  // Pre-create the author profile so admin can see it immediately
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  await admin.from("authors").insert({
    user_id: data.user.id,
    name,
    slug,
    role: role as "admin" | "author",
    is_active: true,
  });

  return { success: true };
}
