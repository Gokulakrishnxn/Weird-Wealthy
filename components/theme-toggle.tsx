"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useResolvedTheme } from "@/lib/use-resolved-theme";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme } = useTheme();
  const { hydrated, isDark } = useResolvedTheme();

  return (
    <button
      type="button"
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-elevated-hover",
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
