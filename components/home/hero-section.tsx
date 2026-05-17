import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeroBannerImage } from "@/components/hero-banner-image";
import { categories } from "@/lib/blog/categories";
import type { BlogPost } from "@/lib/blog/types";
import {
  heroCardHeightHome,
  heroCardShell,
  heroSectionPadding,
  pageContainer,
} from "@/lib/layout";
import { cn } from "@/lib/utils";

type HeroSectionProps = {
  featured: BlogPost;
  className?: string;
};

export function HeroSection({ featured, className }: HeroSectionProps) {
  const categoryLabel = categories[featured.category].label;

  return (
    <section className={cn("bg-background", className)}>
      <div className={cn(pageContainer, heroSectionPadding)}>
        <div className={cn(heroCardShell, heroCardHeightHome)}>
          <div className="absolute inset-0">
            <HeroBannerImage
              src={featured.image}
              objectPosition="center 35%"
              className="transform-gpu"
            />
            <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-t from-black/95 via-black/50 to-black/15" />
            <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
          </div>

          <div className="relative flex h-full min-h-[inherit] flex-col justify-end p-5 sm:p-7 md:p-9 lg:p-11">
            <Link
              href={`/${featured.slug}`}
              className="group block max-w-2xl space-y-3 sm:space-y-4 md:max-w-3xl lg:max-w-4xl"
            >
              <div className="flex flex-wrap items-center gap-2.5 text-sm text-white/80 sm:gap-3">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm">
                  {categoryLabel}
                </span>
                <time dateTime={featured.createdAt}>{featured.createdAt}</time>
                <span className="text-white/40" aria-hidden>
                  ·
                </span>
                <span>{featured.readTime}</span>
              </div>
              <h1 className="text-2xl font-semibold leading-[1.12] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                {featured.title}
              </h1>
              <p className="line-clamp-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base md:line-clamp-2 md:text-lg">
                {featured.description}
              </p>
              <span className="inline-flex items-center gap-2 pt-1 text-sm font-medium text-white transition-opacity group-hover:opacity-80">
                Read story
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
