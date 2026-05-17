import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

type HeroSectionProps = {
  featured: BlogPost;
  className?: string;
};

export function HeroSection({ featured, className }: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative -mt-14 min-h-[min(92vh,820px)] w-full overflow-hidden md:-mt-16",
        className
      )}
    >
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={featured.image}
          alt=""
          className="size-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="relative flex min-h-[min(92vh,820px)] flex-col justify-end px-4 pb-16 pt-28 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <Link
            href={`/${featured.slug}`}
            className="group block max-w-2xl space-y-4 md:max-w-3xl lg:max-w-4xl"
          >
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm">
                AI News
              </span>
              <time dateTime={featured.createdAt}>{featured.createdAt}</time>
              <span className="text-white/40">·</span>
              <span>{featured.readTime}</span>
            </div>
            <h1 className="text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {featured.title}
            </h1>
            <p className="line-clamp-3 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg md:line-clamp-2">
              {featured.description}
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-white transition-opacity group-hover:opacity-80">
              Read story
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>

          <div className="mt-10 flex justify-center gap-2 md:mt-12">
            <span className="size-2 rounded-full bg-white" />
            <span className="size-2 rounded-full bg-white/35" />
            <span className="size-2 rounded-full bg-white/35" />
          </div>
        </div>
      </div>
    </section>
  );
}
