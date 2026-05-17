import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostArticle } from "@/components/blog/post-article";
import { getPublishedPostBySlug, getPublishedSlugs } from "@/lib/supabase/posts";
import { getBlogPost, getAllBlogSlugs, reservedSlugs } from "@/lib/blog/posts";
import type { BlogPost } from "@/lib/blog/types";
import type { BlogCategoryId } from "@/lib/blog/categories";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const staticSlugs = getAllBlogSlugs().filter((s) => !reservedSlugs.includes(s));
  return staticSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (reservedSlugs.includes(slug)) return { title: "Not found" };

  // Try Supabase first
  const dbPost = await getPublishedPostBySlug(slug);
  if (dbPost) {
    return {
      title: dbPost.title,
      description: dbPost.description ?? undefined,
      openGraph: {
        title: dbPost.title,
        description: dbPost.description ?? undefined,
        images: dbPost.image_url ? [{ url: dbPost.image_url }] : [],
      },
    };
  }

  // Fallback to static
  const post = getBlogPost(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  if (reservedSlugs.includes(slug)) notFound();

  // Try Supabase first
  const dbPost = await getPublishedPostBySlug(slug);
  if (dbPost) {
    const authorData = dbPost.authors as { name: string; avatar_url: string | null } | null;
    const blogPost: BlogPost = {
      slug: dbPost.slug,
      title: dbPost.title,
      description: dbPost.description ?? "",
      category: dbPost.category as BlogCategoryId,
      image: dbPost.image_url ?? "https://placehold.co/1200x630?text=W%26W",
      createdAt: dbPost.published_at ?? dbPost.created_at,
      readTime: dbPost.read_time ?? "1 min read",
      author: authorData?.name ?? "Weird & Wealthy",
      authorAvatar: authorData?.avatar_url ?? undefined,
    };
    return <PostArticle post={blogPost} contentHtml={dbPost.content_html ?? undefined} />;
  }

  // Fallback to static data
  const post = getBlogPost(slug);
  if (!post) notFound();
  return <PostArticle post={post} />;
}
