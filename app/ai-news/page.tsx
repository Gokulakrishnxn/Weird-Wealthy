import type { Metadata } from "next";
import { CategoryPage } from "@/components/pages/category-page";
import { getCategory } from "@/lib/blog/categories";

const category = getCategory("ai-news");

export const metadata: Metadata = {
  title: `${category.label} | Weird & Wealthy`,
  description: category.description,
};

export default function AiNewsPage() {
  return <CategoryPage categoryId="ai-news" />;
}
