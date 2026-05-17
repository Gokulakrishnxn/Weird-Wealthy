"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { FileText, LayoutGrid, Search } from "lucide-react";
import { searchContent } from "@/lib/search";
import { cn } from "@/lib/utils";

type SearchCommandProps = {
  className?: string;
};

function useIsMac() {
  return useSyncExternalStore(
    () => () => {},
    () => /Mac|iPhone|iPad|iPod/.test(navigator.userAgent),
    () => false
  );
}

function SearchKbd() {
  const isMac = useIsMac();
  const shortcut = isMac ? "⌘K" : "Ctrl+K";

  return (
    <kbd className="hidden rounded-md border border-border bg-elevated px-1.5 py-0.5 font-sans text-[10px] font-medium text-muted-foreground sm:inline-block">
      {shortcut}
    </kbd>
  );
}

export function SearchCommand({ className }: SearchCommandProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const results = useMemo(() => searchContent(query), [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const openSearch = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }
      if (e.key === "Escape") {
        close();
      }
    };

    const onOpenSearch = () => setOpen(true);

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-search", onOpenSearch);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-search", onOpenSearch);
    };
  }, [close]);

  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navigateTo = (href: string) => {
    close();
    router.push(href);
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Enter" && results[activeIndex]) {
      e.preventDefault();
      navigateTo(results[activeIndex].href);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        className={cn(
          "inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border bg-elevated px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/20 hover:bg-elevated-hover hover:text-foreground sm:gap-2 sm:px-3",
          className
        )}
        aria-label="Search"
      >
        <Search className="size-4 shrink-0" />
        <span className="hidden sm:inline">Search</span>
        <SearchKbd />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-foreground/40 p-3 pt-[max(1rem,env(safe-area-inset-top))] backdrop-blur-sm sm:p-4 sm:pt-[12vh]"
          role="presentation"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            className="flex max-h-[min(85dvh,560px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl shadow-foreground/10 sm:max-h-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex min-h-12 shrink-0 items-center gap-2 border-b border-border px-3 sm:min-h-14 sm:gap-3 sm:px-4">
              <Search className="size-4 shrink-0 text-muted-foreground sm:size-5" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={onInputKeyDown}
                placeholder="Search stories, topics…"
                className="min-h-11 min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="hidden shrink-0 rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline">
                esc
              </kbd>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-2 sm:max-h-[min(50vh,320px)]">
              {query && results.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                  No results for &ldquo;{query}&rdquo;
                </p>
              )}

              {!query && (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                  Type to search posts and sections
                </p>
              )}

              {results.length > 0 && (
                <ul className="space-y-0.5" role="listbox">
                  {results.map((result, index) => (
                    <li
                      key={result.id}
                      role="option"
                      aria-selected={index === activeIndex}
                    >
                      <button
                        type="button"
                        className={cn(
                          "flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                          index === activeIndex
                            ? "bg-elevated-hover text-foreground"
                            : "text-muted-foreground hover:bg-elevated hover:text-foreground"
                        )}
                        onClick={() => navigateTo(result.href)}
                        onMouseEnter={() => setActiveIndex(index)}
                      >
                        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-elevated">
                          {result.type === "post" ? (
                            <FileText className="size-4" />
                          ) : (
                            <LayoutGrid className="size-4" />
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-foreground">
                            {result.title}
                          </span>
                          <span className="block truncate text-xs text-muted-foreground">
                            {result.description}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
