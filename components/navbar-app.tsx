"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  BookOpen,
  Compass,
  Home,
  MoreHorizontal,
  Search,
  X,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { SearchCommand } from "@/components/search-command";
import { ThemeToggle } from "@/components/theme-toggle";
import { categoryList } from "@/lib/blog/categories";
import {
  appHeaderSpacer,
  appTabBarHeight,
  appTabBarSpacer,
  pageContainer,
  touchTarget,
} from "@/lib/layout";
import { isNavActive, mainNav, subscribeHref } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type AppTab = "home" | "blog" | "topics" | "search" | "more";

const primaryTabs: {
  id: AppTab;
  label: string;
  href?: string;
  icon: typeof Home;
}[] = [
  { id: "home", label: "Home", href: "/", icon: Home },
  { id: "blog", label: "Blog", href: "/blog", icon: BookOpen },
  { id: "topics", label: "Topics", icon: Compass },
  { id: "search", label: "Search", icon: Search },
  { id: "more", label: "More", icon: MoreHorizontal },
];

function AppSheet({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted || !open) return null;

  return createPortal(
    <>
      <button
        type="button"
        className="fixed inset-0 z-[70] bg-foreground/30 backdrop-blur-[2px]"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="fixed inset-x-0 bottom-0 z-[71] max-h-[min(70dvh,28rem)] overflow-y-auto overscroll-contain rounded-t-3xl border-t border-border bg-background shadow-2xl"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur-md">
          <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
          <button
            type="button"
            className={cn(touchTarget, "rounded-full text-foreground")}
            aria-label="Close"
            onClick={onClose}
          >
            <X className="size-5" />
          </button>
        </div>
        <div className={cn("py-2", pageContainer)}>{children}</div>
      </div>
    </>,
    document.body
  );
}

function SheetLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex min-h-12 items-center rounded-xl px-4 text-base transition-colors",
        active
          ? "bg-elevated font-medium text-foreground"
          : "text-foreground/90 active:bg-elevated-hover"
      )}
    >
      {label}
    </Link>
  );
}

export function AppNavbar() {
  const pathname = usePathname();
  const [sheet, setSheet] = useState<"topics" | "more" | null>(null);

  const closeSheet = () => setSheet(null);

  const openSearch = () => {
    window.dispatchEvent(new Event("open-search"));
  };

  const handleTab = (tab: AppTab) => {
    if (tab === "topics") {
      setSheet("topics");
      return;
    }
    if (tab === "more") {
      setSheet("more");
      return;
    }
    if (tab === "search") {
      openSearch();
    }
  };

  const isTabActive = (tab: (typeof primaryTabs)[number]) => {
    if (tab.id === "topics" || tab.id === "search" || tab.id === "more") {
      if (tab.id === "topics") {
        return categoryList.some((c) => isNavActive(pathname, c.path));
      }
      if (tab.id === "more") {
        return pathname === "/about" || pathname === subscribeHref;
      }
      return false;
    }
    return tab.href ? isNavActive(pathname, tab.href) : false;
  };

  useEffect(() => {
    closeSheet();
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl",
          "supports-[backdrop-filter]:bg-background/90",
          "pt-[env(safe-area-inset-top)]"
        )}
      >
        <div
          className={cn(
            "flex h-12 items-center justify-between gap-2",
            pageContainer
          )}
        >
          <Logo size="sm" className="min-w-0 max-w-[52%]" />
          <div className="flex shrink-0 items-center gap-0.5">
            <ThemeToggle />
            <button
              type="button"
              className={cn(
                touchTarget,
                "rounded-full text-foreground transition-colors hover:bg-elevated-hover"
              )}
              aria-label="Search"
              onClick={openSearch}
            >
              <Search className="size-5" strokeWidth={2} />
            </button>
          </div>
        </div>
        <SearchCommand className="sr-only" />
      </header>

      <nav
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl",
          "supports-[backdrop-filter]:bg-background/90",
          appTabBarHeight
        )}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-label="App navigation"
      >
        <div className="mx-auto flex h-14 max-w-lg items-stretch justify-around px-1">
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const active = isTabActive(tab);

            if (tab.href) {
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={cn(
                    "flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 py-1.5 text-[10px] font-medium transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground active:text-foreground"
                  )}
                >
                  <Icon
                    className={cn("size-5", active && "stroke-[2.25]")}
                    strokeWidth={active ? 2.25 : 2}
                    aria-hidden
                  />
                  <span className="truncate">{tab.label}</span>
                </Link>
              );
            }

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTab(tab.id)}
                className={cn(
                  "flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 py-1.5 text-[10px] font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground active:text-foreground"
                )}
              >
                <Icon
                  className={cn("size-5", active && "stroke-[2.25]")}
                  strokeWidth={active ? 2.25 : 2}
                  aria-hidden
                />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <AppSheet open={sheet === "topics"} title="Topics" onClose={closeSheet}>
        <ul className="flex flex-col gap-0.5 pb-4">
          {categoryList.map((category) => (
            <li key={category.id}>
              <SheetLink
                href={category.path}
                label={category.label}
                active={isNavActive(pathname, category.path)}
                onClick={closeSheet}
              />
            </li>
          ))}
        </ul>
      </AppSheet>

      <AppSheet open={sheet === "more"} title="More" onClose={closeSheet}>
        <ul className="flex flex-col gap-0.5 pb-4">
          {mainNav
            .filter((item) => item.href !== "/" && item.href !== "/blog")
            .map((item) => (
              <li key={item.href}>
                <SheetLink
                  href={item.href}
                  label={item.label}
                  active={isNavActive(pathname, item.href)}
                  onClick={closeSheet}
                />
              </li>
            ))}
          <li>
            <SheetLink
              href="/about"
              label="About"
              active={pathname === "/about"}
              onClick={closeSheet}
            />
          </li>
          <li className="pt-2">
            <Link
              href={subscribeHref}
              onClick={closeSheet}
              className="flex min-h-12 items-center justify-center rounded-full bg-inverse px-4 text-base font-medium text-inverse-foreground"
            >
              Subscribe
            </Link>
          </li>
        </ul>
      </AppSheet>
    </>
  );
}

/** Spacers for fixed app chrome (top header + bottom tab bar). */
export function AppNavbarSpacers() {
  return (
    <>
      <div className={cn(appHeaderSpacer)} aria-hidden />
      <div className={cn(appTabBarSpacer)} aria-hidden />
    </>
  );
}
