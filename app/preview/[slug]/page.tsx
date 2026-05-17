import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentAuthor, createSupabaseServerClient } from "@/lib/supabase/server";
import { PostArticle } from "@/components/blog/post-article";
import { getAuthorAvatar } from "@/lib/blog/authors";
import type { BlogPost } from "@/lib/blog/types";

export const metadata: Metadata = {
  title: "Post Preview",
  robots: { index: false, follow: false },
};

export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [author, supabase] = await Promise.all([
    getCurrentAuthor(),
    createSupabaseServerClient(),
  ]);

  if (!author) redirect("/auth/login");

  const { data: post } = await supabase
    .from("posts")
    .select("*, authors(name, avatar_url, slug)")
    .eq("slug", slug)
    .single();

  if (!post) notFound();

  const authorData = post.authors as { name: string; avatar_url: string | null; slug: string } | null;

  const blogPost: BlogPost = {
    slug: post.slug,
    title: post.title,
    description: post.description ?? "",
    category: post.category as BlogPost["category"],
    author: authorData?.name ?? "Unknown",
    authorAvatar: authorData?.avatar_url ?? undefined,
    createdAt: post.published_at ?? post.created_at,
    readTime: post.read_time ?? "1 min read",
    image: post.image_url ?? "https://placehold.co/1200x630?text=Preview",
  };

  return (
    <div>
      <div className="sticky top-0 z-50 flex items-center gap-3 border-b border-border bg-amber-500/10 px-4 py-2 text-amber-700 dark:text-amber-400">
        <span className="text-xs font-semibold uppercase tracking-wider">Preview mode</span>
        <span className="text-xs opacity-70">This post is not publicly visible</span>
      </div>
      <PostArticle
        post={blogPost}
        contentHtml={post.content_html ?? "<p>No content yet.</p>"}
      />
    </div>
  );
}
