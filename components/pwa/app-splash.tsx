"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LOGO_MARK_SRC } from "@/components/logo";
import { useAppMobileShell } from "@/hooks/use-app-mobile-shell";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const MIN_SPLASH_MS = 900;

export function AppSplash() {
  const isApp = useAppMobileShell();
  const [phase, setPhase] = useState<"visible" | "exit" | "done">("visible");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isApp) {
      setPhase("done");
      return;
    }

    const started = Date.now();

    const finish = () => {
      const elapsed = Date.now() - started;
      const wait = Math.max(0, MIN_SPLASH_MS - elapsed);
      window.setTimeout(() => setPhase("exit"), wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      return () => window.removeEventListener("load", finish);
    }
  }, [isApp]);

  useEffect(() => {
    if (phase !== "exit") return;
    const t = window.setTimeout(() => setPhase("done"), 420);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (!mounted || !isApp || phase === "done") return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background px-6",
        "pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]",
        phase === "exit" && "pointer-events-none animate-out fade-out duration-400"
      )}
      aria-hidden={phase === "exit"}
      aria-label={`Loading ${siteConfig.name}`}
    >
      <div
        className={cn(
          "flex flex-col items-center gap-5 text-center",
          phase === "exit"
            ? "animate-out zoom-out-95 fade-out duration-400"
            : "animate-in fade-in zoom-in-95 duration-500"
        )}
      >
        <div className="relative size-24 sm:size-28">
          <Image
            src={LOGO_MARK_SRC}
            alt=""
            fill
            priority
            className="object-contain dark:invert"
            sizes="112px"
          />
        </div>
        <div className="space-y-1">
          <p className="font-[family-name:var(--font-logo)] text-2xl font-bold tracking-[-0.04em] text-foreground sm:text-[1.65rem]">
            weird <span className="font-normal text-muted-foreground">&</span>{" "}
            wealthy
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
            the journal
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
