import { createSupabaseServerClient } from "./server";
import type { BlogPost } from "@/lib/blog/types";
import type { BlogCategoryId } from "@/lib/blog/categories";

function dbPostToBlogPost(post: {
  slug: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string | null;
  published_at: string | null;
  created_at: string;
  read_time: string | null;
  authors: { name: string; avatar_url: string | null } | null;
}): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description ?? "",
    category: post.category as BlogCategoryId,
    image: post.image_url ?? "https://placehold.co/1200x630?text=W%26W",
    createdAt: post.published_at ?? post.created_at,
    readTime: post.read_time ?? "1 min read",
    author: (post.authors as { name: string } | null)?.name ?? "Weird & Wealthy",
    authorAvatar: (post.authors as { avatar_url: string | null } | null)?.avatar_url ?? undefined,
  };
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("posts")
      .select("slug, title, description, category, image_url, published_at, created_at, read_time, authors(name, avatar_url)")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (!data || data.length === 0) return [];
    return data.map((p) => dbPostToBlogPost(p as Parameters<typeof dbPostToBlogPost>[0]));
  } catch {
    return [];
  }
}

export async function getPublishedPostsByCategory(category: BlogCategoryId): Promise<BlogPost[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("posts")
      .select("slug, title, description, category, image_url, published_at, created_at, read_time, authors(name, avatar_url)")
      .eq("status", "published")
      .eq("category", category)
      .order("published_at", { ascending: false });

    if (!data || data.length === 0) return [];
    return data.map((p) => dbPostToBlogPost(p as Parameters<typeof dbPostToBlogPost>[0]));
  } catch {
    return [];
  }
}

export async function getPublishedPostBySlug(slug: string) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("posts")
      .select("*, authors(name, avatar_url, slug)")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    return data ?? null;
  } catch {
    return null;
  }
}

export async function getPublishedSlugs(): Promise<string[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from("posts")
      .select("slug")
      .eq("status", "published");

    return data?.map((p) => p.slug) ?? [];
  } catch {
    return [];
  }
}
