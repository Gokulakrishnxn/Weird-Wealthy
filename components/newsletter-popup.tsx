"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Check, Mail, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import {
  hasSeenNewsletterPopup,
  markNewsletterPopupSeen,
} from "@/lib/newsletter-popup";
import { subscribeHref } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const SHOW_DELAY_MS = 2500;

export function NewsletterPopup() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const dismiss = useCallback(() => {
    markNewsletterPopupSeen();
    setOpen(false);
  }, []);

  useEffect(() => {
    if (pathname === subscribeHref || hasSeenNewsletterPopup()) {
      return;
    }

    const timer = window.setTimeout(() => {
      if (!hasSeenNewsletterPopup()) {
        setOpen(true);
      }
    }, SHOW_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    markNewsletterPopupSeen();
    window.setTimeout(() => setOpen(false), 2400);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="newsletter-popup-title"
          initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.96 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: 14, scale: 0.97 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "fixed z-[60] w-[min(calc(100vw-1.25rem),24rem)]",
            "bottom-[max(0.875rem,env(safe-area-inset-bottom))] right-[max(0.75rem,env(safe-area-inset-right))]",
            "sm:bottom-6 sm:right-6"
          )}
        >
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)] ring-1 ring-foreground/[0.06] dark:shadow-[0_24px_60px_-16px_rgba(0,0,0,0.65)]">
            {/* Header strip */}
            <div className="relative flex items-center gap-3 bg-newsletter px-5 py-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--newsletter-fg)_12%,transparent)]">
                {submitted ? (
                  <Check className="size-4" strokeWidth={2.5} />
                ) : (
                  <Mail className="size-4" strokeWidth={2} />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] opacity-70">
                  Weird & Wealthy
                </p>
                <p className="truncate text-sm font-semibold tracking-tight">
                  The Weekly Note
                </p>
              </div>
              <button
                type="button"
                onClick={dismiss}
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--newsletter-fg)_10%,transparent)] transition-opacity hover:opacity-80"
                aria-label="Dismiss"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Body */}
            <div className="min-h-[13.5rem] space-y-5 bg-card p-5 sm:p-6">
              {submitted ? (
                <div className="flex min-h-[10.5rem] flex-col items-center justify-center py-3 text-center">
                  <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-elevated">
                    <Check className="size-5 text-foreground" strokeWidth={2.5} />
                  </div>
                  <p className="mt-3 text-sm font-semibold tracking-tight">
                    You&apos;re in.
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    First issue heading to your inbox soon.
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <h2
                      id="newsletter-popup-title"
                      className="text-lg font-semibold leading-tight tracking-tight"
                    >
                      Stay weird. Build wealth.
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      AI, money, and craft—one curated email every week.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3 pt-1">
                    <div className="flex items-center gap-1.5 rounded-full border border-border bg-background p-1.5 pl-4 shadow-inner shadow-foreground/[0.02] focus-within:border-foreground/20">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        className="min-h-10 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                      />
                      <button
                        type="submit"
                        className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-inverse text-inverse-foreground transition-transform hover:scale-[1.03] active:scale-[0.98]"
                        aria-label="Subscribe"
                      >
                        <ArrowRight className="size-4" />
                      </button>
                    </div>
                    <p className="text-center text-[10px] text-muted-foreground">
                      Free · Unsubscribe anytime
                    </p>
                  </form>

                  <Link
                    href={subscribeHref}
                    onClick={dismiss}
                    className="block pb-1 text-center text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    See what you&apos;ll get →
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
