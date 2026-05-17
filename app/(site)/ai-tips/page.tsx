import type { Metadata } from "next";
import { CategoryPage } from "@/components/pages/category-page";
import { getCategory } from "@/lib/blog/categories";
import { getPublishedPostsByCategory } from "@/lib/supabase/posts";
import { getPostsByCategory } from "@/lib/blog/posts";

export const dynamic = "force-dynamic";
const category = getCategory("ai-tips");

export const metadata: Metadata = {
  title: `${category.label} | Weird & Wealthy`,
  description: category.description,
};

export default async function AiTipsPage() {
  const dbPosts = await getPublishedPostsByCategory("ai-tips");
  const posts = dbPosts.length > 0 ? dbPosts : getPostsByCategory("ai-tips");
  return <CategoryPage categoryId="ai-tips" posts={posts} />;
}
