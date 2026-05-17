"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getCurrentAuthor } from "@/lib/supabase/server";
import type { PostInsert, PostUpdate } from "@/lib/supabase/types";

function calcReadTime(html: string): string {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

export async function createPostAction(data: Omit<PostInsert, "author_id">) {
  const supabase = await createSupabaseServerClient();
  const author = await getCurrentAuthor();
  if (!author) return { error: "Not authenticated" };

  const readTime = data.content_html ? calcReadTime(data.content_html) : "1 min read";

  const { data: post, error } = await supabase
    .from("posts")
    .insert({ ...data, author_id: author.id, read_time: data.read_time || readTime })
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath("/author/posts");
  revalidatePath("/admin/posts");
  return { success: true, id: post.id, slug: post.slug };
}

export async function updatePostAction(id: string, data: PostUpdate) {
  const supabase = await createSupabaseServerClient();
  const author = await getCurrentAuthor();
  if (!author) return { error: "Not authenticated" };

  if (data.content_html) {
    data.read_time = data.read_time || calcReadTime(data.content_html);
  }

  const { error } = await supabase
    .from("posts")
    .update(data)
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/author/posts");
  revalidatePath("/admin/posts");
  return { success: true };
}

export async function publishPostAction(id: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("posts")
    .update({ status: "published", published_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/author/posts");
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  return { success: true };
}

export async function unpublishPostAction(id: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("posts")
    .update({ status: "draft", published_at: null })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/author/posts");
  revalidatePath("/admin/posts");
  return { success: true };
}

export async function deletePostAction(id: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/author/posts");
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  return { success: true };
}

export async function archivePostAction(id: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("posts")
    .update({ status: "archived" })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/author/posts");
  revalidatePath("/admin/posts");
  return { success: true };
}
