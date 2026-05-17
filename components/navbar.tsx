"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { SearchCommand } from "@/components/search-command";
import { ThemeToggle } from "@/components/theme-toggle";
import { pageContainer, scrollMtHeader, touchTarget } from "@/lib/layout";
import { isNavActive, mainNav, subscribeHref } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function NavLink({
  item,
  isActive,
  transparent,
  className,
  onClick,
}: {
  item: (typeof mainNav)[number];
  isActive: boolean;
  transparent?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-sm transition-colors duration-300 md:px-2.5 md:text-[13px] lg:px-3 lg:text-sm xl:px-4",
        isActive
          ? transparent
            ? "bg-white/20 text-white"
            : "bg-elevated text-foreground"
          : transparent
            ? "text-white/80 hover:bg-white/10 hover:text-white"
            : "text-muted-foreground hover:bg-elevated-hover hover:text-foreground",
        className
      )}
    >
      {item.label}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollPastHero, setScrollPastHero] = useState(false);
  const scrolled = !isHome || scrollPastHero;

  const isTransparent = isHome && !scrolled && !mobileOpen;

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => setScrollPastHero(window.scrollY > 64);
    window.addEventListener("scroll", onScroll, { passive: true });
    const raf = requestAnimationFrame(onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome]);

  return (
    <header
      className={cn(
        "sticky top-0 inset-x-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-300",
        isTransparent
          ? "border-b border-transparent bg-gradient-to-b from-[var(--nav-scrim)] to-transparent"
          : "border-b border-border bg-background/90 backdrop-blur-xl backdrop-saturate-150"
      )}
    >
      <div
        className={cn(
          "flex h-14 min-w-0 items-center gap-2 md:h-16 md:gap-3",
          pageContainer
        )}
      >
        <Link
          href="/"
          className={cn(
            "min-w-0 max-w-[42vw] shrink-0 truncate text-sm font-semibold tracking-tight transition-opacity duration-300 hover:opacity-70 sm:max-w-none sm:text-base md:text-lg",
            isTransparent ? "text-white" : "text-foreground"
          )}
        >
          Weird & Wealthy
        </Link>

        <nav
          className="scrollbar-none hidden min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto px-1 md:flex lg:hidden"
          aria-label="Main navigation"
        >
          {mainNav.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              transparent={isTransparent}
              isActive={isNavActive(pathname, item.href)}
            />
          ))}
        </nav>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex"
          aria-label="Main navigation"
        >
          {mainNav.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              transparent={isTransparent}
              isActive={isNavActive(pathname, item.href)}
            />
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center justify-end gap-1 sm:gap-1.5">
          <ThemeToggle transparent={isTransparent} />
          <SearchCommand
            className={cn(
              "hidden md:inline-flex",
              isTransparent &&
                "border-white/20 bg-white/10 text-white hover:border-white/30 hover:bg-white/15 hover:text-white"
            )}
          />
          <button
            type="button"
            className={cn(
              touchTarget,
              "rounded-full transition-colors md:hidden",
              isTransparent
                ? "text-white hover:bg-white/10"
                : "text-foreground hover:bg-elevated-hover"
            )}
            aria-label="Search"
            onClick={() => window.dispatchEvent(new Event("open-search"))}
          >
            <Search className="size-5" />
          </button>
          <Link
            href={subscribeHref}
            className={cn(
              "hidden shrink-0 rounded-full px-3 py-2 text-xs font-medium transition-colors sm:inline-flex sm:px-4 sm:text-sm",
              isTransparent
                ? "border border-white/30 bg-white text-black hover:bg-white/90"
                : "bg-inverse text-inverse-foreground hover:opacity-90"
            )}
          >
            Subscribe
          </Link>
          <button
            type="button"
            className={cn(
              touchTarget,
              "rounded-full transition-colors md:hidden",
              isTransparent
                ? "text-white hover:bg-white/10"
                : "text-foreground hover:bg-elevated-hover"
            )}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-14 z-40 overflow-y-auto border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav
            className={cn(
              "flex flex-col gap-1 py-4",
              pageContainer,
              scrollMtHeader
            )}
          >
            {mainNav.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                isActive={isNavActive(pathname, item.href)}
                className="rounded-xl px-4 py-3.5 text-base"
                onClick={() => setMobileOpen(false)}
              />
            ))}
            <button
              type="button"
              className="flex min-h-11 items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-muted-foreground transition-colors hover:bg-elevated-hover hover:text-foreground"
              onClick={() => {
                setMobileOpen(false);
                window.dispatchEvent(new Event("open-search"));
              }}
            >
              <Search className="size-5 shrink-0" />
              Search
            </button>
            <Link
              href={subscribeHref}
              className="mt-2 flex min-h-11 items-center justify-center rounded-full bg-inverse px-4 py-3 text-center text-base font-medium text-inverse-foreground transition-opacity hover:opacity-90"
              onClick={() => setMobileOpen(false)}
            >
              Subscribe
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
