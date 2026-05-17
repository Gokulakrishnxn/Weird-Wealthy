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

/** On-site overview for writers */
export const becomeAuthorHref = "/write";

/** Google Form — author applications */
export const becomeAuthorFormHref =
  "https://docs.google.com/forms/d/e/1FAIpQLScbvbPJgI028t5Hr7mcr2mss1-GMAQUv2bM4C00QB5rVSU4-A/viewform";

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getNavItemForCategory(category: CategoryMeta): NavItem {
  return { label: category.label, href: category.path };
}
