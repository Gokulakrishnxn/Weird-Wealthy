"use client";

import { useState } from "react";
import { PageHero } from "@/components/pages/page-hero";
import { pageContainer } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function NewsletterPageContent() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Newsletter"
        title="One sharp note per week. No noise."
        description="Join thousands of builders, designers, and founders who read Weird & Wealthy for AI, finance, branding, and lifestyle—curated, not cluttered."
        tagline="Free forever. Unsubscribe anytime."
        image="https://storage.efferd.com/creative/silk.webp"
      />

      <section className={cn("py-12 sm:py-16 md:py-20", pageContainer)}>
        <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What you&apos;ll get
            </h2>
            <ul className="space-y-4 text-muted-foreground">
              {[
                "Weekly roundup of our best stories and frameworks",
                "Early access to deep dives before they publish",
                "Tool recommendations we actually use",
                "No spam—ever",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm sm:text-base">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-white/50" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <h3 className="text-lg font-semibold">Subscribe</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your email to join the list.
            </p>
            {submitted ? (
              <p className="mt-6 text-base text-foreground">
                You&apos;re on the list. Watch your inbox.
              </p>
            ) : (
              <form
                className="mt-6 space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="min-h-12 w-full rounded-xl border border-border bg-background px-4 text-base outline-none focus:border-foreground/25"
                />
                <button
                  type="submit"
                  className="min-h-12 w-full rounded-full bg-white text-sm font-medium text-black transition-opacity hover:opacity-90"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
