import type { Metadata } from "next";
import { CategoryPage } from "@/components/pages/category-page";
import { getCategory } from "@/lib/blog/categories";

const category = getCategory("finance");

export const metadata: Metadata = {
  title: `${category.label} | Weird & Wealthy`,
  description: category.description,
};

export default function FinancePage() {
  return <CategoryPage categoryId="finance" />;
}
