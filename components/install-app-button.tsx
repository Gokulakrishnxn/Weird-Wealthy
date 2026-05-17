"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, Share, X } from "lucide-react";
import { touchTarget } from "@/lib/layout";
import { isStandaloneApp } from "@/lib/pwa";
import { cn } from "@/lib/utils";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isIosDevice() {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

type InstallAppButtonProps = {
  className?: string;
};

export function InstallAppButton({ className }: InstallAppButtonProps) {
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [iosHintOpen, setIosHintOpen] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    setInstalled(isStandaloneApp());
    setIsIos(isIosDevice());

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    };

    const onInstalled = () => {
      setInstalled(true);
      setInstallEvent(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const handleInstall = useCallback(async () => {
    if (installed) return;

    if (installEvent) {
      await installEvent.prompt();
      await installEvent.userChoice;
      setInstallEvent(null);
      return;
    }

    if (isIos) {
      setIosHintOpen(true);
      return;
    }
  }, [installEvent, installed, isIos]);

  if (installed) {
    return (
      <p className={cn("text-xs text-muted-foreground", className)}>
        App installed — open from your home screen.
      </p>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <button
        type="button"
        onClick={() => void handleInstall()}
        className={cn(
          touchTarget,
          "inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-inverse px-5 text-sm font-medium text-inverse-foreground transition-opacity hover:opacity-90 sm:w-auto"
        )}
      >
        <Download className="size-4 shrink-0" aria-hidden />
        Download app
      </button>
      <p className="max-w-xs text-xs text-muted-foreground">
        Install Weird &amp; Wealthy on your phone for a fast, full-screen
        reading experience.
      </p>

      {iosHintOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ios-install-title"
          className="rounded-2xl border border-border bg-card p-4 text-left shadow-lg"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-elevated">
                <Share className="size-4" aria-hidden />
              </span>
              <div>
                <p
                  id="ios-install-title"
                  className="text-sm font-semibold tracking-tight"
                >
                  Add to Home Screen
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Tap the Share button in Safari, then choose{" "}
                  <strong className="font-medium text-foreground">
                    Add to Home Screen
                  </strong>
                  .
                </p>
              </div>
            </div>
            <button
              type="button"
              className={cn(touchTarget, "shrink-0 rounded-full")}
              aria-label="Close"
              onClick={() => setIosHintOpen(false)}
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
