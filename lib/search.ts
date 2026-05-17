import { categoryList } from "@/lib/blog/categories";
import { blogPosts } from "@/lib/blog/posts";
import { mainNav, subscribeHref } from "@/lib/navigation";

export type SearchResult = {
  id: string;
  title: string;
  description: string;
  href: string;
  type: "post" | "page";
};

const extraPages: SearchResult[] = [
  {
    id: "newsletter",
    title: "Newsletter",
    description: "Subscribe for weekly insights",
    href: subscribeHref,
    type: "page",
  },
  {
    id: "about",
    title: "About",
    description: "Our story and mission",
    href: "/about",
    type: "page",
  },
];

function normalize(text: string) {
  return text.toLowerCase().trim();
}

export function searchContent(query: string): SearchResult[] {
  const q = normalize(query);
  if (!q) return [];

  const postResults: SearchResult[] = blogPosts
    .filter(
      (post) =>
        normalize(post.title).includes(q) ||
        normalize(post.description).includes(q) ||
        normalize(post.author).includes(q)
    )
    .map((post) => ({
      id: post.slug,
      title: post.title,
      description: post.description,
      href: `/${post.slug}`,
      type: "post" as const,
    }));

  const navResults: SearchResult[] = mainNav
    .filter((item) => normalize(item.label).includes(q))
    .map((item) => ({
      id: item.href,
      title: item.label,
      description: "Page",
      href: item.href,
      type: "page" as const,
    }));

  const categoryResults: SearchResult[] = categoryList
    .filter(
      (cat) =>
        normalize(cat.label).includes(q) ||
        normalize(cat.description).includes(q)
    )
    .map((cat) => ({
      id: cat.path,
      title: cat.label,
      description: cat.description,
      href: cat.path,
      type: "page" as const,
    }));

  const pageResults: SearchResult[] = [...extraPages, ...navResults, ...categoryResults];

  const seen = new Set<string>();
  const merged = [...postResults, ...pageResults].filter((item) => {
    if (seen.has(item.href)) return false;
    seen.add(item.href);
    return true;
  });

  return merged.slice(0, 10);
}
