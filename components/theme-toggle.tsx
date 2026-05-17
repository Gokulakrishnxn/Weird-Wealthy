"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
  transparent?: boolean;
};

const subscribe = () => () => {};

function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}

export function ThemeToggle({ className, transparent }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useHydrated();

  const isDark = hydrated ? resolvedTheme === "dark" : true;

  return (
    <button
      type="button"
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-full transition-colors",
        transparent
          ? "text-white hover:bg-white/10"
          : "text-foreground hover:bg-foreground/[0.06]",
        className
      )}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {hydrated ? (
        isDark ? <Sun className="size-4" /> : <Moon className="size-4" />
      ) : (
        <span className="inline-block size-4" aria-hidden />
      )}
    </button>
  );
}
