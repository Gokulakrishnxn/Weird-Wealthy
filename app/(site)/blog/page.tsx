import type { Metadata } from "next";
import { BlogOverviewPage } from "@/components/pages/blog-overview-page";
import { getPublishedPosts } from "@/lib/supabase/posts";
import { blogPosts } from "@/lib/blog/posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Weird & Wealthy",
  description:
    "Browse every story on Weird & Wealthy—AI, finance, personal branding, lifestyle, and building wealth with intention.",
};

type BlogPageProps = {
  searchParams: Promise<{ author?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { author } = await searchParams;
  const dbPosts = await getPublishedPosts();
  const posts = dbPosts.length > 0 ? dbPosts : blogPosts;

  return <BlogOverviewPage authorSlug={author} posts={posts} />;
}
