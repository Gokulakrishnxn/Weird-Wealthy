import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeroBannerImage } from "@/components/hero-banner-image";
import {
  heroCardHeightPage,
  heroCardShell,
  heroSectionPadding,
  pageContainer,
  scrollMtHeader,
} from "@/lib/layout";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  tagline?: string;
  image: string;
  imagePosition?: string;
  featuredHref?: string;
  featuredLabel?: string;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  tagline,
  image,
  imagePosition = "center center",
  featuredHref,
  featuredLabel = "Read featured story",
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "border-b border-border bg-background",
        scrollMtHeader,
        className
      )}
    >
      <div
        className={cn(
          pageContainer,
          heroSectionPadding,
          "pb-4 sm:pb-6 md:pb-8"
        )}
      >
        <div className={cn(heroCardShell, heroCardHeightPage)}>
          <div className="absolute inset-0">
            <HeroBannerImage
              src={image}
              objectPosition={imagePosition}
              className="transform-gpu"
            />
            <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-black/55 via-black/30 to-transparent" />
            <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
          </div>

          <div className="relative flex h-full min-h-[inherit] flex-col justify-end p-5 sm:p-7 md:p-9 lg:p-11">
            <div className="max-w-3xl space-y-3 sm:space-y-4 md:space-y-5">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
                {eyebrow}
              </p>
              <h1 className="text-2xl font-semibold leading-[1.12] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                {title}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
                {description}
              </p>
              {tagline && (
                <p className="border-l-2 border-white/30 pl-4 text-sm text-white/70 sm:text-base">
                  {tagline}
                </p>
              )}
              {featuredHref && (
                <Link
                  href={featuredHref}
                  className="inline-flex items-center gap-2 pt-2 text-sm font-medium text-white transition-opacity hover:opacity-80"
                >
                  {featuredLabel}
                  <ArrowUpRight className="size-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
