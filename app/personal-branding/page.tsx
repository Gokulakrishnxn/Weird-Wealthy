import type { Metadata } from "next";
import { CategoryPage } from "@/components/pages/category-page";
import { getCategory } from "@/lib/blog/categories";

const category = getCategory("personal-branding");

export const metadata: Metadata = {
  title: `${category.label} | Weird & Wealthy`,
  description: category.description,
};

export default function PersonalBrandingPage() {
  return <CategoryPage categoryId="personal-branding" />;
}
