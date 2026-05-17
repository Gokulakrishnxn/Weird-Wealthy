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
  className,
  onClick,
}: {
  item: (typeof mainNav)[number];
  isActive: boolean;
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
          ? "bg-elevated text-foreground"
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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 inset-x-0 z-50 pt-[env(safe-area-inset-top)]",
        "border-b border-border bg-background/95 text-foreground backdrop-blur-xl backdrop-saturate-150",
        "supports-[backdrop-filter]:bg-background/90"
      )}
    >
      <div
        className={cn(
          "flex h-14 min-w-0 items-center gap-2 text-foreground md:h-16 md:gap-3",
          pageContainer
        )}
      >
        <Link
          href="/"
          className="min-w-0 max-w-[42vw] shrink-0 truncate text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-70 sm:max-w-none sm:text-base md:text-lg"
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
              isActive={isNavActive(pathname, item.href)}
            />
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center justify-end gap-1 text-foreground sm:gap-1.5">
          <ThemeToggle />
          <SearchCommand className="hidden md:inline-flex" />
          <button
            type="button"
            className={cn(
              touchTarget,
              "rounded-full text-foreground transition-colors hover:bg-elevated-hover md:hidden"
            )}
            aria-label="Search"
            onClick={() => window.dispatchEvent(new Event("open-search"))}
          >
            <Search className="size-5" strokeWidth={2} />
          </button>
          <Link
            href={subscribeHref}
            className="hidden shrink-0 rounded-full bg-inverse px-3 py-2 text-xs font-medium text-inverse-foreground transition-opacity hover:opacity-90 sm:inline-flex sm:px-4 sm:text-sm"
          >
            Subscribe
          </Link>
          <button
            type="button"
            className={cn(
              touchTarget,
              "rounded-full text-foreground transition-colors hover:bg-elevated-hover md:hidden"
            )}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <X className="size-5" strokeWidth={2} />
            ) : (
              <Menu className="size-5" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-14 z-40 overflow-y-auto border-t border-border bg-background text-foreground md:hidden"
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
              className="flex min-h-11 items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-elevated-hover"
              onClick={() => {
                setMobileOpen(false);
                window.dispatchEvent(new Event("open-search"));
              }}
            >
              <Search className="size-5 shrink-0" strokeWidth={2} />
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
