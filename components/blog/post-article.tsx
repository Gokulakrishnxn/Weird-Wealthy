"use client";

import Link from "next/link";
import { AuthorMeta } from "@/components/blog/author-meta";
import { ScrollReveal } from "@/components/scroll-reveal";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { pageContainer, scrollMtHeader } from "@/lib/layout";
import { getCategory } from "@/lib/blog/categories";
import type { BlogPost } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

type PostArticleProps = {
  post: BlogPost;
};

export function PostArticle({ post }: PostArticleProps) {
  const category = getCategory(post.category);

  return (
    <article
      className={cn(
        "min-w-0 grow py-8 sm:py-12 md:py-16 lg:py-20",
        pageContainer,
        scrollMtHeader
      )}
    >
      <ScrollReveal>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-sm text-muted-foreground transition-opacity duration-300 hover:text-foreground sm:text-base md:text-lg"
        >
          ← Back
        </Link>
      </ScrollReveal>
      <ScrollReveal delay={0.05}>
        <header className="mt-6 space-y-5 sm:mt-8 sm:space-y-6 md:mt-12">
          <Link
            href={category.path}
            className="inline-flex w-fit rounded-full border border-border px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground/25 hover:text-foreground sm:text-sm"
          >
            {category.label}
          </Link>
          <AuthorMeta
            author={post.author}
            authorAvatar={post.authorAvatar}
            createdAt={post.createdAt}
            readTime={post.readTime}
            avatarSize="lg"
            stackedOnMobile
            className="text-sm sm:text-base md:text-lg"
          />
          <h1 className="text-[1.75rem] font-semibold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl md:leading-[1.08] lg:text-6xl xl:text-7xl">
            {post.title}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl md:text-2xl lg:text-3xl">
            {post.description}
          </p>
        </header>
      </ScrollReveal>
      <FullWidthDivider className="my-8 sm:my-12 md:my-16" contained />
      <ScrollReveal delay={0.1}>
        <div className="max-w-none text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl lg:text-2xl">
          <p>
            Full article content goes here. Replace this placeholder with your MDX
            or CMS content when you wire up a content source.
          </p>
        </div>
      </ScrollReveal>
    </article>
  );
}
