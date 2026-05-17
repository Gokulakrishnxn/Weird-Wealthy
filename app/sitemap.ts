import type { MetadataRoute } from "next";
import { categoryList } from "@/lib/blog/categories";
import { getAllBlogSlugs } from "@/lib/blog/posts";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/about",
    "/write",
    "/blog",
    "/newsletter",
    ...categoryList.map((c) => c.path),
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: absoluteUrl(path || "/"),
    lastModified: now,
    changeFrequency: path === "" || path === "/blog" ? "daily" : "weekly",
    priority: path === "" ? 1 : path === "/about" ? 0.9 : 0.8,
  }));

  const postEntries: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => ({
    url: absoluteUrl(`/${slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...postEntries];
}
