"use client";

import { useSyncExternalStore } from "react";
import { isStandaloneApp } from "@/lib/pwa";

/** Matches Tailwind `lg` — desktop nav from 1024px up */
export const APP_MOBILE_MAX_WIDTH = 1023;

const mobileQuery = `(max-width: ${APP_MOBILE_MAX_WIDTH}px)`;

function subscribe(onStoreChange: () => void) {
  const mqMobile = window.matchMedia(mobileQuery);
  const mqStandalone = window.matchMedia("(display-mode: standalone)");
  const mqFullscreen = window.matchMedia("(display-mode: fullscreen)");

  mqMobile.addEventListener("change", onStoreChange);
  mqStandalone.addEventListener("change", onStoreChange);
  mqFullscreen.addEventListener("change", onStoreChange);

  return () => {
    mqMobile.removeEventListener("change", onStoreChange);
    mqStandalone.removeEventListener("change", onStoreChange);
    mqFullscreen.removeEventListener("change", onStoreChange);
  };
}

/** Installed PWA on a phone-sized viewport — bottom tab bar + app chrome */
export function isAppMobileShell(): boolean {
  if (typeof window === "undefined") return false;
  return (
    isStandaloneApp() &&
    window.matchMedia(mobileQuery).matches
  );
}

function getSnapshot() {
  return isAppMobileShell();
}

function getServerSnapshot() {
  return false;
}

export function useAppMobileShell() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
