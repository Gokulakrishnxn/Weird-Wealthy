import Link from "next/link";
import { CardArrow } from "@/components/card-arrow";
import { BlogCard } from "@/components/blog/blog-card";
import { PageHero } from "@/components/pages/page-hero";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  categoryList,
  getCategory,
  type BlogCategoryId,
} from "@/lib/blog/categories";
import type { BlogPost } from "@/lib/blog/types";
import { getPostsByCategory } from "@/lib/blog/posts";
import { pageContainer } from "@/lib/layout";
import { cn } from "@/lib/utils";

type CategoryPageProps = {
  categoryId: BlogCategoryId;
  /** Pre-fetched posts (from Supabase). Falls back to static data. */
  posts?: BlogPost[];
};

export function CategoryPage({ categoryId, posts: propPosts }: CategoryPageProps) {
  const category = getCategory(categoryId);
  const posts = propPosts ?? getPostsByCategory(categoryId);
  const featured = posts[0];
  const otherCategories = categoryList.filter((c) => c.id !== categoryId);

  return (
    <>
      <PageHero
        eyebrow={category.label}
        title={category.title}
        description={category.description}
        tagline={category.tagline}
        image={category.image}
        imagePosition={category.imagePosition}
        featuredHref={featured ? `/${featured.slug}` : undefined}
      />

      <section className={cn("py-12 sm:py-16 md:py-20", pageContainer)}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              All {category.label} stories
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              {posts.length} {posts.length === 1 ? "article" : "articles"} in this
              category
            </p>
          </div>
        </div>

        {posts.length === 0 ? (
          <p className="mt-10 text-muted-foreground">
            New stories coming soon. Check back shortly.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {posts.map((post, index) => (
              <ScrollReveal key={post.slug} delay={Math.min(index * 0.05, 0.35)}>
                <BlogCard {...post} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-border bg-elevated py-12 sm:py-16">
        <div className={pageContainer}>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Explore other topics
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherCategories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.path}
                className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition-colors hover:bg-elevated-hover"
              >
                <span className="font-medium">{cat.label}</span>
                <CardArrow variant="muted" size="sm" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
