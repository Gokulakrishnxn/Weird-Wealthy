"use client";

import Link from "next/link";
import { CardArrow } from "@/components/card-arrow";
import { AuthorMeta } from "@/components/blog/author-meta";
import { LazyImage } from "@/components/lazy-image";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/blog/types";

type BlogCardProps = BlogPost & {
  className?: string;
};

export function BlogCard({
  slug,
  title,
  description,
  createdAt,
  readTime,
  image,
  author,
  authorAvatar,
  className,
}: BlogCardProps) {
  return (
    <article
      className={cn(
        "group flex min-w-0 transform-gpu flex-col gap-3 rounded-2xl border border-transparent p-3 transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-foreground/12 hover:bg-elevated-hover active:bg-elevated sm:gap-4 sm:p-4 md:p-5",
        className
      )}
    >
      <Link
        href={`/${slug}`}
        className="flex min-w-0 flex-col gap-3 sm:gap-4"
      >
        <LazyImage
          alt={title}
          className="transform-gpu rounded-2xl transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] will-change-transform group-hover:scale-[1.03] md:rounded-3xl"
          containerClassName="overflow-hidden rounded-2xl border border-border bg-elevated shadow-none transition-colors duration-500 group-hover:border-foreground/16 md:rounded-3xl"
          fallback="https://placehold.co/640x360?text=fallback-image"
          inView
          ratio={16 / 9}
          src={image}
        />
        <div className="space-y-3 px-1 pb-1 md:px-2">
          <div className="flex items-start justify-between gap-3">
            <h2 className="line-clamp-2 text-lg font-semibold tracking-tight sm:text-xl md:text-2xl">
              {title}
            </h2>
            <CardArrow className="mt-1" />
          </div>
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-foreground/80 sm:text-base md:text-lg">
            {description}
          </p>
        </div>
      </Link>
      <AuthorMeta
        author={author}
        authorAvatar={authorAvatar}
        createdAt={createdAt}
        readTime={readTime}
        avatarSize="sm"
        className="px-1 md:px-2"
      />
    </article>
  );
}
