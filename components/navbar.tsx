"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, Search, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { SearchCommand } from "@/components/search-command";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  mobileNavPanelTop,
  pageContainer,
  touchTarget,
} from "@/lib/layout";
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
        "shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-sm transition-colors duration-300",
        "lg:px-2.5 lg:text-[13px] xl:px-3 xl:text-sm",
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

function NavActions({
  mobileOpen,
  onMenuToggle,
  variant,
}: {
  mobileOpen: boolean;
  onMenuToggle: () => void;
  variant: "mobile" | "desktop";
}) {
  const isMobile = variant === "mobile";

  return (
    <div className="flex shrink-0 items-center justify-end gap-0.5 sm:gap-1">
      <ThemeToggle />
      <SearchCommand className={isMobile ? "hidden" : "inline-flex"} />
      {isMobile && (
        <button
          type="button"
          className={cn(
            touchTarget,
            "rounded-full text-foreground transition-colors hover:bg-elevated-hover"
          )}
          aria-label="Search"
          onClick={() => window.dispatchEvent(new Event("open-search"))}
        >
          <Search className="size-5" strokeWidth={2} />
        </button>
      )}
      <Link
        href={subscribeHref}
        className={cn(
          "shrink-0 rounded-full bg-inverse font-medium text-inverse-foreground transition-opacity hover:opacity-90",
          isMobile
            ? "hidden"
            : "inline-flex px-4 py-2 text-sm"
        )}
      >
        Subscribe
      </Link>
      {isMobile && (
        <button
          type="button"
          className={cn(
            touchTarget,
            "rounded-full text-foreground transition-colors hover:bg-elevated-hover"
          )}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={onMenuToggle}
        >
          {mobileOpen ? (
            <X className="size-5" strokeWidth={2} />
          ) : (
            <Menu className="size-5" strokeWidth={2} />
          )}
        </button>
      )}
    </div>
  );
}

function MobileNavDrawer({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !open) return null;

  return createPortal(
    <>
      <button
        type="button"
        className="fixed inset-0 z-[60] bg-foreground/25 backdrop-blur-[2px] lg:hidden"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div
        id="mobile-nav-panel"
        className={cn(
          "fixed inset-x-0 bottom-0 z-[61] overflow-y-auto overscroll-contain border-t border-border bg-background text-foreground lg:hidden",
          mobileNavPanelTop
        )}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav className={cn("flex flex-col gap-1 py-4 sm:py-5", pageContainer)}>
          {mainNav.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              isActive={isNavActive(pathname, item.href)}
              className="rounded-xl px-4 py-3.5 text-base sm:py-4"
              onClick={onClose}
            />
          ))}
          <Link
            href={subscribeHref}
            className="mt-2 flex min-h-11 items-center justify-center rounded-full bg-inverse px-4 py-3.5 text-center text-base font-medium text-inverse-foreground transition-opacity hover:opacity-90 sm:py-4"
            onClick={onClose}
          >
            Subscribe
          </Link>
        </nav>
      </div>
    </>,
    document.body
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);
  const toggleMobile = () => setMobileOpen((open) => !open);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]",
        "border-b border-border bg-background/95 text-foreground backdrop-blur-xl backdrop-saturate-150",
        "supports-[backdrop-filter]:bg-background/90"
      )}
    >
      {/* Mobile / tablet bar — no inline nav links */}
      <div
        className={cn(
          "flex h-14 min-w-0 items-center justify-between gap-2 lg:hidden",
          pageContainer
        )}
      >
        <div className="min-w-0 flex-1 overflow-hidden">
          <Logo size="sm" />
        </div>
        <NavActions
          variant="mobile"
          mobileOpen={mobileOpen}
          onMenuToggle={toggleMobile}
        />
      </div>

      {/* Desktop bar */}
      <div
        className={cn(
          "hidden h-16 min-w-0 items-center gap-3 lg:flex",
          pageContainer
        )}
      >
        <div className="shrink-0">
          <Logo size="md" />
        </div>
        <nav
          className="scrollbar-none flex min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto px-1"
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
        <NavActions
          variant="desktop"
          mobileOpen={mobileOpen}
          onMenuToggle={toggleMobile}
        />
      </div>

      <MobileNavDrawer
        open={mobileOpen}
        pathname={pathname}
        onClose={closeMobile}
      />
    </header>
  );
}
