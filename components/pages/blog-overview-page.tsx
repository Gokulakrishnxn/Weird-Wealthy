import Link from "next/link";
import { CardArrow } from "@/components/card-arrow";
import Image from "next/image";
import { BlogHero } from "@/components/blog/blog-hero";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  categories,
  categoryList,
  type BlogCategoryId,
} from "@/lib/blog/categories";
import { AuthorLink } from "@/components/blog/author-link";
import type { BlogPost } from "@/lib/blog/types";
import {
  blogPosts,
  getPostsByAuthorSlug,
} from "@/lib/blog/posts";
import {
  textLinkInternal,
  textLinkInternalEmphasis,
  textLinkMuted,
} from "@/lib/link-styles";
import { pageContainer, scrollMtHeader } from "@/lib/layout";
import { subscribeHref } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type BlogOverviewPageProps = {
  authorSlug?: string;
  /** Pre-fetched posts from Supabase — falls back to static data. */
  posts?: BlogPost[];
};

export function BlogOverviewPage({ authorSlug, posts: propPosts }: BlogOverviewPageProps) {
  const allPosts = propPosts ?? blogPosts;
  const filtered = authorSlug
    ? allPosts.filter((p) => p.author.toLowerCase().replace(/[^a-z0-9]+/g, "-") === authorSlug)
    : allPosts;
  const authorName = authorSlug
    ? filtered[0]?.author ?? authorSlug.replace(/-/g, " ")
    : null;
  const [featured, ...rest] = filtered;
  const sorted = [...filtered].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="min-w-0 pb-16 sm:pb-20 md:pb-24">
      <div className={pageContainer}>
        <BlogHero
          eyebrow={authorName ? "Author" : "All stories"}
          headline={
            authorName
              ? `Stories by ${authorName}`
              : "The full journal archive."
          }
          subline={
            authorName
              ? `Every article ${authorName} has published on Weird & Wealthy.`
              : "Browse every article on AI, finance, branding, and the life you build around your work."
          }
          tagline={
            authorName
              ? undefined
              : "Use the topics below to jump in—or scroll the complete list."
          }
          storyCount={filtered.length}
        />
        {authorName && (
          <p className="-mt-4 mb-2 text-sm text-muted-foreground">
            <Link href="/blog" className={textLinkMuted}>
              ← View all stories
            </Link>
          </p>
        )}


        {featured && (
          <ScrollReveal delay={0.05}>
            <section className="py-10 sm:py-12 md:py-14">
              <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Featured
              </h2>
              <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-12">
                <Link
                  href={`/${featured.slug}`}
                  className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-elevated md:rounded-3xl"
                >
                  <Image
                    src={featured.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </Link>
                <div className="space-y-4">
                  <Link
                    href={categories[featured.category].path}
                    className={cn(textLinkMuted, "text-xs uppercase tracking-wider")}
                  >
                    {categories[featured.category].label}
                  </Link>
                  <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                    <Link
                      href={`/${featured.slug}`}
                      className={textLinkInternalEmphasis}
                    >
                      {featured.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground sm:text-lg">
                    {featured.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <AuthorLink name={featured.author} /> ·{" "}
                    {formatDate(featured.createdAt)} · {featured.readTime}
                  </p>
                  <Link
                    href={`/${featured.slug}`}
                    className={cn(
                      textLinkInternalEmphasis,
                      "group inline-flex items-center gap-1.5 text-sm font-medium"
                    )}
                  >
                    Read article
                    <CardArrow variant="emphasis" size="sm" />
                  </Link>
                </div>
                </div>
            </section>
          </ScrollReveal>
        )}

        <ScrollReveal delay={0.08}>
          <section className={cn("border-t border-border py-8", scrollMtHeader)}>
            <h2 className="text-sm font-medium text-foreground">Browse by topic</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {categoryList.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={cat.path}
                    className={cn(
                      textLinkMuted,
                      "inline-flex rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-elevated-hover"
                    )}
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <section className="border-t border-border py-10 sm:py-12">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  All articles
                </h2>
                <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                  {allPosts.length} stories · sorted by date
                </p>
              </div>
            </div>

            <ol className="mt-8 divide-y divide-border border-y border-border">
              {sorted.map((post) => (
                <li
                  key={post.slug}
                  className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:py-6"
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-1 sm:gap-1.5">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground sm:text-sm">
                      <time dateTime={post.createdAt}>
                        {formatDate(post.createdAt)}
                      </time>
                      <span aria-hidden>·</span>
                      <Link
                        href={categories[post.category].path}
                        className={textLinkMuted}
                      >
                        {categories[post.category].label}
                      </Link>
                    </div>
                    <Link
                      href={`/${post.slug}`}
                      className={cn(
                        textLinkInternalEmphasis,
                        "text-lg font-semibold leading-snug sm:text-xl"
                      )}
                    >
                      {post.title}
                    </Link>
                    <p className="line-clamp-2 text-sm text-muted-foreground sm:text-base">
                      {post.description}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm text-muted-foreground">
                    {post.readTime}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <section className="border-t border-border py-10 sm:py-12 md:py-14">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Visual archive
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
              Prefer cards? Browse the same stories in grid view.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
              {rest.map((post, index) => (
                <ScrollReveal
                  key={post.slug}
                  delay={Math.min(index * 0.04, 0.28)}
                >
                  <BlogOverviewCard post={post} />
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.14}>
          <section className="rounded-2xl border border-border bg-elevated px-6 py-8 sm:px-8 sm:py-10 md:rounded-3xl">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Never miss a story
            </h2>
            <p className="mt-2 max-w-lg text-muted-foreground">
              Get the weekly note in your inbox—curated reads and one idea worth
              acting on.
            </p>
            <Link
              href={subscribeHref}
              className={cn(
                textLinkInternalEmphasis,
                "group mt-4 inline-flex items-center gap-1.5 font-medium"
              )}
            >
              Subscribe to the newsletter
              <CardArrow variant="emphasis" size="sm" />
            </Link>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}

function BlogOverviewCard({ post }: { post: (typeof blogPosts)[number] }) {
  const category = categories[post.category as BlogCategoryId];

  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:p-5">
      <Link
        href={category.path}
        className={cn(
          textLinkMuted,
          "w-fit text-xs font-medium uppercase tracking-wider"
        )}
      >
        {category.label}
      </Link>
      <h3 className="text-lg font-semibold leading-snug tracking-tight sm:text-xl">
        <Link href={`/${post.slug}`} className={textLinkInternalEmphasis}>
          {post.title}
        </Link>
      </h3>
      <p className="line-clamp-2 text-sm text-muted-foreground">
        {post.description}
      </p>
      <Link
        href={`/${post.slug}`}
        className={cn(textLinkMuted, "mt-1 text-sm font-medium")}
      >
        Read more →
      </Link>
    </article>
  );
}
