import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentAuthor, createSupabaseServerClient } from "@/lib/supabase/server";
import { PostEditor } from "@/components/cms/post-editor";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("posts").select("title").eq("id", id).single();
  return { title: data ? `Edit: ${data.title}` : "Edit Post", robots: { index: false } };
}

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [author, supabase] = await Promise.all([
    getCurrentAuthor(),
    createSupabaseServerClient(),
  ]);

  if (!author) redirect("/auth/login");

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) notFound();

  // Authors can only edit their own posts; admins can edit any
  if (author.role !== "admin" && post.author_id !== author.id) {
    redirect("/author/posts");
  }

  return (
    <div className="flex h-full flex-col">
      <PostEditor post={post} authorId={author.id} />
    </div>
  );
}
