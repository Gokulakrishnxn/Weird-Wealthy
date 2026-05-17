"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { categoryList } from "@/lib/blog/categories";
import { pageContainer, scrollMtHeader } from "@/lib/layout";
import { cn } from "@/lib/utils";

const perks = [
  "Weekly roundup of our best stories",
  "Early access to deep dives",
  "Tool picks we actually use",
  "One email per week—unsubscribe anytime",
];

export function NewsletterPageContent() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className={cn("flex flex-col", scrollMtHeader)}>
      <div className={cn("pb-16 sm:pb-24 md:pb-28", pageContainer)}>
        <ScrollReveal>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to journal
          </Link>
        </ScrollReveal>

        <div className="mx-auto mt-10 max-w-2xl text-center sm:mt-14">
          <ScrollReveal delay={0.05}>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
              The Weekly Note
            </p>
            <h1 className="mt-4 text-[2rem] font-semibold leading-[1.06] tracking-tight sm:text-5xl md:text-6xl">
              Ideas worth opening
            </h1>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              AI, finance, branding, and building a life around your work—one
              curated email every week.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.1} className="mx-auto mt-10 max-w-xl sm:mt-12">
          <div className="overflow-hidden rounded-[1.75rem] bg-newsletter shadow-2xl shadow-foreground/10 ring-1 ring-foreground/10 sm:rounded-[2rem]">
            {submitted ? (
              <div className="px-6 py-14 text-center sm:px-10 sm:py-16">
                <div
                  className="mx-auto flex size-16 items-center justify-center rounded-full"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--newsletter-fg) 14%, transparent)",
                  }}
                >
                  <Check className="size-8" strokeWidth={2} />
                </div>
                <h2 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
                  You&apos;re on the list
                </h2>
                <p
                  className="mx-auto mt-3 max-w-xs text-sm leading-relaxed sm:text-base"
                  style={{ color: "var(--newsletter-muted)" }}
                >
                  Your first note is on its way. Check your inbox to confirm.
                </p>
                <Link
                  href="/"
                  className="mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: "var(--newsletter-fg)",
                    color: "var(--newsletter-bg)",
                  }}
                >
                  Read the journal
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            ) : (
              <form
                className="px-6 py-8 sm:px-10 sm:py-10"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <p
                  className="text-center text-[11px] font-medium uppercase tracking-[0.2em] opacity-70"
                >
                  Join Weird & Wealthy
                </p>
                <p className="mt-3 text-center text-lg font-semibold tracking-tight sm:text-xl">
                  Free. No spam. Ever.
                </p>

                <div className="mt-8 space-y-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="min-h-12 w-full rounded-2xl border px-4 text-center text-base outline-none transition-colors focus:ring-2 focus:ring-[color-mix(in_srgb,var(--newsletter-fg)_25%,transparent)] sm:min-h-[3.25rem] sm:text-left sm:pl-5"
                    style={{
                      borderColor:
                        "color-mix(in srgb, var(--newsletter-fg) 20%, transparent)",
                      backgroundColor:
                        "color-mix(in srgb, var(--newsletter-fg) 8%, transparent)",
                      color: "var(--newsletter-fg)",
                    }}
                  />
                  <button
                    type="submit"
                    className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl text-base font-semibold transition-transform hover:opacity-95 active:scale-[0.99] sm:min-h-[3.25rem]"
                    style={{
                      backgroundColor: "var(--newsletter-fg)",
                      color: "var(--newsletter-bg)",
                    }}
                  >
                    Subscribe now
                    <ArrowRight className="size-5" />
                  </button>
                </div>

                <p
                  className="mt-5 text-center text-xs leading-relaxed"
                  style={{ color: "var(--newsletter-muted)" }}
                >
                  By subscribing you agree to receive our weekly newsletter.
                  Unsubscribe with one click.
                </p>
              </form>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="mx-auto mt-12 max-w-lg sm:mt-14">
          <ul className="divide-y divide-border rounded-2xl border border-border bg-card/50">
            {perks.map((perk, index) => (
              <li
                key={perk}
                className="flex items-start gap-4 px-5 py-4 sm:px-6 sm:py-5"
              >
                <span className="mt-0.5 font-mono text-xs tabular-nums text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-relaxed sm:text-base">{perk}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="mt-14 text-center sm:mt-16">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            We write about
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-sm sm:text-base">
            {categoryList.map((cat, i) => (
              <span key={cat.id} className="inline-flex items-center">
                <Link
                  href={cat.path}
                  className="font-medium text-foreground/80 underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  {cat.label}
                </Link>
                {i < categoryList.length - 1 && (
                  <span className="mx-2 text-muted-foreground/50">·</span>
                )}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
