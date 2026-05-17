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
      <div
        className={cn(
          pageContainer,
          "grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
        )}
      >
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

        <div className="relative mx-auto flex w-full max-w-md items-center justify-center lg:max-w-none">
          <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--newsletter-fg)_12%,transparent)] bg-[color-mix(in_srgb,var(--newsletter-fg)_6%,transparent)] p-4 shadow-2xl">
            <div
              className="h-full overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--newsletter-fg)_8%,transparent)] p-4"
              style={{ backgroundColor: "var(--newsletter-bg)" }}
            >
              <div className="space-y-3">
                <div
                  className="h-2 w-16 rounded-full"
                  style={{ backgroundColor: "var(--newsletter-muted)" }}
                />
                <div
                  className="h-24 rounded-lg"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--newsletter-fg) 12%, transparent)",
                  }}
                />
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-14 rounded-md"
                      style={{
                        backgroundColor:
                          "color-mix(in srgb, var(--newsletter-fg) 12%, transparent)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p
              className="mt-3 text-center text-xs font-medium"
              style={{ color: "var(--newsletter-muted)" }}
            >
              Weird & Wealthy — The Journal
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
