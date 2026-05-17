import { searchContent } from "@/lib/search";
import { blogPosts } from "@/lib/blog/posts";

export function buildRetrievalContext(query: string): string {
  const results = searchContent(query);
  if (results.length === 0) return "";

  const lines = results.slice(0, 5).map((r) => {
    const path = r.href.startsWith("/") ? r.href : `/${r.href}`;
    return `- [${r.type}] ${r.title}: ${r.description} (path: ${path})`;
  });

  return `## Relevant ${"Weird & Wealthy"} pages and articles\n${lines.join("\n")}`;
}

/** Fallback snippets when search returns few post hits */
export function getFeaturedPostHints(): string {
  return blogPosts
    .slice(0, 6)
    .map((p) => `- ${p.title}: ${p.description} (path: /${p.slug})`)
    .join("\n");
}
