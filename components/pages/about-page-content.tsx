import Link from "next/link";
import { Mail } from "lucide-react";
import { CardArrow } from "@/components/card-arrow";
import { PageHero } from "@/components/pages/page-hero";
import { categoryList } from "@/lib/blog/categories";
import { articleColumn, pageContainer } from "@/lib/layout";
import { aboutFaqs } from "@/lib/seo/about";
import { subscribeHref } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";
import { textLinkInternal, textLinkInternalEmphasis } from "@/lib/link-styles";
import { cn } from "@/lib/utils";

const pillars = [
  {
    title: "Think differently",
    body: "We celebrate unconventional ideas—the ones most people ignore—because breakthrough products, brands, and portfolios often start there.",
  },
  {
    title: "Build with discipline",
    body: "Creativity without systems burns out. We focus on design systems, money habits, and workflows that compound over years, not weeks.",
  },
  {
    title: "Publish with clarity",
    body: "No jargon for its own sake. Every story is edited so you can act on it—whether you are shipping UI, evaluating AI tools, or refining your brand.",
  },
] as const;

const audiences = [
  "Founders and indie builders shipping products",
  "Product designers and design-system leads",
  "Engineers exploring AI in real workflows",
  "Creators growing audience and personal brand",
  "Professionals building wealth with intention",
] as const;

export function AboutPageContent() {
  return (
    <>
      <PageHero
        eyebrow="About Weird & Wealthy"
        title="A journal for builders who think differently—and build wealth on purpose"
        description="We publish practical stories on design, AI, finance, personal branding, and creative life for founders, designers, and ambitious professionals worldwide."
        tagline={siteConfig.tagline}
        image="https://storage.efferd.com/creative/ripple-grid.webp"
        featuredHref="/blog"
        featuredLabel="Browse all stories"
      />

      <article className="border-b border-border bg-background">
        <div className={cn(pageContainer, "py-10 sm:py-14 md:py-16")}>
          <nav aria-label="Breadcrumb" className={cn(articleColumn, "mb-8")}>
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className={textLinkMutedClass()}>
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-muted-foreground/50">
                /
              </li>
              <li>
                <span className="font-medium text-foreground" aria-current="page">
                  About
                </span>
              </li>
            </ol>
          </nav>

          <div className={cn(articleColumn, "space-y-10 sm:space-y-12")}>
            <section aria-labelledby="about-mission">
              <h2
                id="about-mission"
                className="text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                Our mission
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                <p>
                  <strong className="font-medium text-foreground">
                    {siteConfig.name}
                  </strong>{" "}
                  exists at the intersection of{" "}
                  <Link href="/ai-news" className={textLinkInternal}>
                    AI and technology
                  </Link>
                  ,{" "}
                  <Link href="/finance" className={textLinkInternal}>
                    personal finance
                  </Link>
                  ,{" "}
                  <Link href="/personal-branding" className={textLinkInternal}>
                    personal branding
                  </Link>
                  , and{" "}
                  <Link href="/lifestyle" className={textLinkInternal}>
                    lifestyle design
                  </Link>
                  . We help you connect bold ideas with durable outcomes—better
                  products, stronger brands, and wealth that supports the work
                  you care about.
                </p>
                <p>
                  The internet is full of hot takes and recycled listicles. We
                  publish fewer pieces and make them worth your time: researched,
                  honest, and written for people who build things in the real
                  world.
                </p>
              </div>
            </section>

            <section aria-labelledby="about-audience">
              <h2
                id="about-audience"
                className="text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                Who we write for
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Weird &amp; Wealthy is for readers who want signal over noise—
                whether you are based in San Francisco, London, Bangalore, or
                building remotely from anywhere.
              </p>
              <ul className="mt-6 space-y-3">
                {audiences.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-base text-muted-foreground sm:text-lg"
                  >
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/70"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="about-pillars">
              <h2
                id="about-pillars"
                className="text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                How we work
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-3 sm:gap-5">
                {pillars.map((pillar) => (
                  <li
                    key={pillar.title}
                    className="rounded-2xl border border-border bg-card p-5 sm:p-6"
                  >
                    <h3 className="text-lg font-semibold tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {pillar.body}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </article>

      <section
        className={cn(pageContainer, "py-12 sm:py-16")}
        aria-labelledby="about-topics"
      >
        <div className={articleColumn}>
          <h2
            id="about-topics"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Topics we cover
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Explore our editorial categories—each built for depth, not trends.
            Start with the{" "}
            <Link href="/blog" className={textLinkInternalEmphasis}>
              full blog archive
            </Link>{" "}
            or jump into a section below.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {categoryList.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={cat.path}
                  className="group flex items-start justify-between gap-4 rounded-2xl border border-border px-5 py-4 transition-colors hover:bg-elevated-hover"
                >
                  <span>
                    <span className="block font-medium">{cat.label}</span>
                    <span className="mt-1 block text-sm text-muted-foreground line-clamp-2">
                      {cat.description}
                    </span>
                  </span>
                  <CardArrow variant="muted" size="sm" className="mt-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="border-y border-border bg-elevated py-12 sm:py-16"
        aria-labelledby="about-faq"
      >
        <div className={cn(pageContainer, articleColumn)}>
          <h2
            id="about-faq"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Quick answers about {siteConfig.name}—helpful for new readers and
            search engines alike.
          </p>
          <dl className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
            {aboutFaqs.map((faq) => (
              <div key={faq.question} className="px-5 py-5 sm:px-6 sm:py-6">
                <dt className="text-base font-semibold tracking-tight sm:text-lg">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        className={cn(pageContainer, "py-12 sm:py-16 md:py-20")}
        aria-labelledby="about-cta"
      >
        <div
          className={cn(
            articleColumn,
            "rounded-3xl border border-border bg-card p-8 text-center sm:p-10 md:p-12"
          )}
        >
          <h2
            id="about-cta"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Stay in the loop
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Get one curated email each week—the best of Weird &amp; Wealthy on
            AI, money, branding, and building a life that lasts.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href={subscribeHref}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-inverse px-6 text-sm font-medium text-inverse-foreground transition-opacity hover:opacity-90 sm:text-base"
            >
              Subscribe to the newsletter
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className={cn(
                "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border px-6 text-sm font-medium transition-colors hover:bg-elevated-hover sm:text-base",
                textLinkInternal
              )}
            >
              <Mail className="size-4 shrink-0" aria-hidden />
              Contact us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function textLinkMutedClass() {
  return cn(
    "underline-offset-2 transition-colors hover:text-foreground hover:underline"
  );
}
