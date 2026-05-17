import type { CategoryMeta } from "@/lib/blog/categories";
import { categoryList } from "@/lib/blog/categories";

export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  ...categoryList.map((c) => ({ label: c.label, href: c.path })),
];

export const subscribeHref = "/newsletter";

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getNavItemForCategory(category: CategoryMeta): NavItem {
  return { label: category.label, href: category.path };
}
