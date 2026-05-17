import { ScrollReveal } from "@/components/scroll-reveal";
import { blogPosts } from "@/lib/blog/posts";

type BlogHeroProps = {
  eyebrow?: string;
  headline?: string;
  subline?: string;
  tagline?: string;
  storyCount?: number;
};

export function BlogHero({
  eyebrow = "The Journal",
  headline = "Where weird ideas meet lasting wealth.",
  subline = "Design, technology, and the craft of building what lasts.",
  tagline = "Fresh perspectives for builders, designers, and founders.",
  storyCount = blogPosts.length,
}: BlogHeroProps) {
  return (
    <ScrollReveal>
      <header className="border-b border-border py-8 sm:py-10 md:py-14 lg:py-20">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:text-xs sm:tracking-[0.2em]">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-foreground sm:mt-5 sm:text-4xl md:text-5xl md:leading-[1.08] lg:text-6xl xl:text-7xl">
          {headline}
        </h1>
        <div className="mt-6 max-w-2xl space-y-3 border-l-2 border-border pl-4 sm:mt-8 sm:space-y-4 sm:pl-5 md:mt-10 md:pl-6">
          <p className="text-base font-medium leading-snug text-foreground/90 sm:text-lg md:text-xl">
            {subline}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            {tagline}
          </p>
        </div>
        <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground sm:mt-8 sm:text-sm md:mt-10">
          <span className="text-foreground/80">
            {storyCount} {storyCount === 1 ? "story" : "stories"}
          </span>
          <span className="text-white/20" aria-hidden>
            ·
          </span>
          <span>Updated weekly</span>
        </p>
      </header>
    </ScrollReveal>
  );
}
