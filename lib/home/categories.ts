import { categories, type BlogCategoryId } from "@/lib/blog/categories";

export type HomeCategory = {
  id: BlogCategoryId;
  label: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

/** Featured on homepage category grid (subset of full nav) */
export const homeCategories: HomeCategory[] = (
  ["ai-tips", "finance", "personal-branding"] as const
).map((id) => {
  const cat = categories[id];
  return {
    id: cat.id,
    label: cat.label,
    title: cat.title,
    description: cat.description,
    image: cat.image,
    href: cat.path,
  };
});
