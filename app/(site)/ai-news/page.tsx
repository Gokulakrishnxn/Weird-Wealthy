import type { Metadata } from "next";
import { CategoryPage } from "@/components/pages/category-page";
import { getCategory } from "@/lib/blog/categories";
import { getPublishedPostsByCategory } from "@/lib/supabase/posts";
import { getPostsByCategory } from "@/lib/blog/posts";

export const dynamic = "force-dynamic";

const category = getCategory("ai-news");

export const metadata: Metadata = {
  title: `${category.label} | Weird & Wealthy`,
  description: category.description,
};

export default async function AiNewsPage() {
  const dbPosts = await getPublishedPostsByCategory("ai-news");
  const posts = dbPosts.length > 0 ? dbPosts : getPostsByCategory("ai-news");
  return <CategoryPage categoryId="ai-news" posts={posts} />;
}
