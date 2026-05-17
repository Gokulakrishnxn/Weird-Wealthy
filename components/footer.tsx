"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { ExternalLink, Mail, Rss, Share2 } from "lucide-react";
import { Logo } from "@/components/logo";
import { mainNav, subscribeHref } from "@/lib/navigation";
import { pageContainer } from "@/lib/layout";
import { cn } from "@/lib/utils";

type FooterLink = {
  title: string;
  href: string;
  icon?: ReactNode;
};

type FooterSection = {
  label: string;
  links: FooterLink[];
};

const footerLinks: FooterSection[] = [
  {
    label: "Journal",
    links: mainNav.map((item) => ({
      title: item.label,
      href: item.href,
    })),
  },
  {
    label: "Company",
    links: [
      { title: "About", href: "/about" },
      { title: "Newsletter", href: subscribeHref },
      { title: "Contact", href: "mailto:hello@weirdandwealthy.com" },
      { title: "Privacy", href: "/about" },
    ],
  },
  {
    label: "Resources",
    links: [
      { title: "All Stories", href: "/" },
      { title: "AI News", href: "/ai-news" },
      { title: "Subscribe", href: subscribeHref },
    ],
  },
  {
    label: "Social",
    links: [
      {
        title: "Facebook",
        href: "https://facebook.com",
        icon: <Share2 className="size-4" />,
      },
      {
        title: "Instagram",
        href: "https://instagram.com",
        icon: <Rss className="size-4" />,
      },
      {
        title: "Youtube",
        href: "https://youtube.com",
        icon: <ExternalLink className="size-4" />,
      },
      {
        title: "LinkedIn",
        href: "https://linkedin.com",
        icon: <Mail className="size-4" />,
      },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className={cn(
        "relative mt-auto w-full border-t border-border",
        "dark:bg-[radial-gradient(35%_128px_at_50%_0%,--theme(--color-foreground/.08),transparent)]"
      )}
    >
      <div
        className={cn(
          pageContainer,
          "relative flex w-full flex-col items-center justify-center rounded-t-4xl md:rounded-t-6xl"
        )}
      >
        <div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/20 blur" />

        <div className="grid w-full gap-8 py-8 sm:py-10 md:py-12 lg:grid-cols-3 lg:gap-8">
          <AnimatedContainer className="space-y-4">
            <Logo className="text-base sm:text-lg" />
            <p className="max-w-xs text-sm text-muted-foreground">
              Where weird ideas meet lasting wealth—design, AI, finance, and
              the craft of building what lasts.
            </p>
          </AnimatedContainer>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            {footerLinks.map((section, index) => (
              <AnimatedContainer delay={0.1 + index * 0.1} key={section.label}>
                <div className="mb-6 md:mb-0">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-foreground/80">
                    {section.label}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {section.links.map((link) => (
                      <li key={`${section.label}-${link.title}`}>
                        <Link
                          className="inline-flex items-center gap-1 duration-200 hover:text-foreground [&_svg]:size-4"
                          href={link.href}
                        >
                          {link.icon}
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />
        <div className="flex w-full items-center justify-center py-4 sm:py-6">
          <p className="text-center text-xs text-muted-foreground sm:text-sm">
            &copy; {new Date().getFullYear()} Weird & Wealthy. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      transition={{ delay, duration: 0.8 }}
      viewport={{ once: true }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
    >
      {children}
    </motion.div>
  );
}
