import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/pages/page-hero";
import { categoryList } from "@/lib/blog/categories";
import { pageContainer } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function AboutPageContent() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Weird ideas. Lasting wealth. Honest craft."
        description="Weird & Wealthy is a journal at the intersection of design, AI, money, and the life you build around your work."
        tagline="Built for people who think differently—and build accordingly."
        image="https://storage.efferd.com/creative/ripple-grid.webp"
      />

      <section className={cn("py-12 sm:py-16", pageContainer)}>
        <div className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
          <p>
            We publish sharp, practical stories for builders, designers, and
            founders who want more than hot takes. Every piece is edited for
            clarity—whether we&apos;re covering AI news, money habits, personal
            branding, or the lifestyle that keeps you creative long-term.
          </p>
          <p>
            The name says it all: embrace what makes you different, then compound
            the results with discipline and good design.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <h2 className="text-xl font-semibold sm:text-2xl">What we cover</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {categoryList.map((cat) => (
              <Link
                key={cat.id}
                href={cat.path}
                className="group flex items-center justify-between rounded-2xl border border-border px-5 py-4 transition-colors hover:bg-elevated-hover"
              >
                <span className="font-medium">{cat.label}</span>
                <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
