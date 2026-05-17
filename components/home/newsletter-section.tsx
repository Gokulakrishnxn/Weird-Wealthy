"use client";

import { useState } from "react";
import { pageContainer } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  return (
    <section
      id="newsletter"
      className={cn(
        "scroll-mt-24 border-y border-border bg-newsletter py-12 sm:py-16 md:py-20"
      )}
    >
      <div className={cn(pageContainer, "max-w-2xl")}>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Subscribe to our newsletter for weekly insights
          </h2>
          <p
            className="max-w-md text-sm sm:text-base"
            style={{ color: "var(--newsletter-muted)" }}
          >
            One sharp note per week on AI, finance, branding, and building
            wealth—no noise, no fluff.
          </p>
          <form
            className="flex max-w-md flex-col gap-3 pt-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="min-h-12 flex-1 rounded-full border border-[color-mix(in_srgb,var(--newsletter-fg)_18%,transparent)] bg-[color-mix(in_srgb,var(--newsletter-fg)_8%,transparent)] px-5 text-base outline-none placeholder:opacity-50 focus:border-[color-mix(in_srgb,var(--newsletter-fg)_35%,transparent)]"
              style={{ color: "var(--newsletter-fg)" }}
            />
            <button
              type="submit"
              className="min-h-12 shrink-0 rounded-full px-8 text-sm font-medium transition-opacity hover:opacity-85"
              style={{
                backgroundColor: "var(--newsletter-fg)",
                color: "var(--newsletter-bg)",
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
