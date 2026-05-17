import Link from "next/link";
import { ExternalLink, PenLine } from "lucide-react";
import { PageHero } from "@/components/pages/page-hero";
import { articleColumn, pageContainer, scrollMtHeader } from "@/lib/layout";
import { becomeAuthorFormHref, subscribeHref } from "@/lib/navigation";
import { textLinkInternal } from "@/lib/link-styles";
import { cn } from "@/lib/utils";

const topics = [
  "Technology, AI, and startups",
  "Business, finance, and productivity",
  "Design, marketing, and creativity",
  "Lifestyle, self-improvement, and personal stories",
  "Internet culture and unique perspectives",
] as const;

const guidelines = [
  "Original content only—we review every submission carefully",
  "Practical ideas with a clear takeaway for readers",
  "Concrete examples and real experience, not generic listicles",
  "Open to feedback and editorial suggestions before publish",
] as const;

export function WritePageContent() {
  return (
    <>
      <PageHero
        eyebrow="Write for us"
        title="Become an author at Weird & Wealthy"
        description="We’re building a modern publishing platform for writers, creators, and internet thinkers—share ideas on design, AI, finance, and the craft of building what lasts."
        tagline="Whether you’re a beginner or a seasoned creator, we’d love to hear from you."
        image="https://storage.efferd.com/creative/light-rays.webp"
        featuredHref="/blog"
        featuredLabel="Read the journal"
      />

      <section className="border-b border-border bg-background">
        <div className={cn(pageContainer, "py-10 sm:py-14 md:py-16", scrollMtHeader)}>
          <div className={cn(articleColumn, "space-y-10 sm:space-y-12")}>
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight sm:text-xl">
                <PenLine className="size-5 text-muted-foreground" aria-hidden />
                What we publish
              </h2>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {topics.map((topic) => (
                  <li key={topic} className="flex gap-2">
                    <span className="text-foreground/40" aria-hidden>
                      —
                    </span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                What we look for
              </h2>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {guidelines.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-foreground/40" aria-hidden>
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                Apply to become an author
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Fill out our application form with your background, writing
                samples, and a few story ideas. We review every submission and
                reply when there&apos;s a fit.
              </p>
              <a
                href={becomeAuthorFormHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-inverse px-6 text-sm font-medium text-inverse-foreground transition-opacity hover:opacity-90"
              >
                Open application form
                <ExternalLink className="size-4" aria-hidden />
              </a>
            </div>

            <p className="text-sm text-muted-foreground">
              Not ready to write?{" "}
              <Link href={subscribeHref} className={textLinkInternal}>
                Subscribe to the newsletter
              </Link>{" "}
              for weekly stories from our authors.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
