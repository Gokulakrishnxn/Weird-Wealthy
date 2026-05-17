import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeroBannerImage } from "@/components/hero-banner-image";
import { pageContainer } from "@/lib/layout";
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
        "relative min-h-[min(52vh,520px)] overflow-hidden border-b border-border sm:min-h-[min(56vh,560px)] md:min-h-[min(60vh,600px)]",
        className
      )}
    >
      <div className="absolute inset-0">
        <HeroBannerImage
          src={image}
          objectPosition={imagePosition}
          className="transform-gpu"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </div>

      <div className={cn("relative py-16 sm:py-20 md:py-24", pageContainer)}>
        <div className="max-w-3xl space-y-4 md:space-y-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70 drop-shadow-sm">
            {eyebrow}
          </p>
          <h1 className="text-3xl font-semibold leading-[1.1] tracking-tight text-white drop-shadow-md sm:text-4xl md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/85 drop-shadow-sm sm:text-lg md:text-xl">
            {description}
          </p>
          {tagline && (
            <p className="border-l-2 border-white/30 pl-4 text-sm text-white/70 drop-shadow-sm sm:text-base">
              {tagline}
            </p>
          )}
          {featuredHref && (
            <Link
              href={featuredHref}
              className="inline-flex items-center gap-2 pt-2 text-sm font-medium text-white drop-shadow-sm transition-opacity hover:opacity-80"
            >
              {featuredLabel}
              <ArrowUpRight className="size-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
