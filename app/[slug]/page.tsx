import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostArticle } from "@/components/blog/post-article";
import {
  getAllBlogSlugs,
  getBlogPost,
  reservedSlugs,
} from "@/lib/blog/posts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllBlogSlugs()
    .filter((slug) => !reservedSlugs.includes(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (reservedSlugs.includes(slug)) {
    return { title: "Not found" };
  }

  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: `${post.title} | Weird & Wealthy`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  if (reservedSlugs.includes(slug)) {
    notFound();
  }

  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return <PostArticle post={post} />;
}
