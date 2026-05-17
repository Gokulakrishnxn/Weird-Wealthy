import Link from "next/link";
import { Mail, PenLine } from "lucide-react";
import { PageHero } from "@/components/pages/page-hero";
import { articleColumn, pageContainer, scrollMtHeader } from "@/lib/layout";
import { subscribeHref } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";
import { textLinkInternal } from "@/lib/link-styles";
import { cn } from "@/lib/utils";

const topics = [
  "AI tools, workflows, and industry shifts",
  "Personal finance, investing mindset, and wealth habits",
  "Design systems, UI craft, and product thinking",
  "Personal branding and audience building",
  "Lifestyle design for ambitious builders",
] as const;

const guidelines = [
  "Original work—no AI-generated drafts sent as finished pieces",
  "1,200–2,500 words with a clear takeaway readers can use",
  "Concrete examples, not generic listicles",
  "Edited for clarity; we help tighten structure before publish",
] as const;

const pitchMailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Become an author — Weird & Wealthy")}`;

export function WritePageContent() {
  return (
    <>
      <PageHero
        eyebrow="Write for us"
        title="Become an author at Weird & Wealthy"
        description="Share practical ideas on design, AI, finance, and building a life around your work—with readers who think differently and build on purpose."
        tagline="We welcome pitches from practitioners, not promoters."
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
                Send a pitch
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Email a few sentences on your idea, your background, and links to
                writing samples (portfolio, Substack, or published work). We
                reply within a week when there&apos;s a fit.
              </p>
              <a
                href={pitchMailto}
                className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-inverse px-6 text-sm font-medium text-inverse-foreground transition-opacity hover:opacity-90"
              >
                <Mail className="size-4" aria-hidden />
                Pitch your story
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
