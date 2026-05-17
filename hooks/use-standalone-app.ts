"use client";

import { useSyncExternalStore } from "react";
import { isStandaloneApp } from "@/lib/pwa";

function subscribe(onStoreChange: () => void) {
  const mqStandalone = window.matchMedia("(display-mode: standalone)");
  const mqFullscreen = window.matchMedia("(display-mode: fullscreen)");

  mqStandalone.addEventListener("change", onStoreChange);
  mqFullscreen.addEventListener("change", onStoreChange);

  return () => {
    mqStandalone.removeEventListener("change", onStoreChange);
    mqFullscreen.removeEventListener("change", onStoreChange);
  };
}

function getSnapshot() {
  return isStandaloneApp();
}

function getServerSnapshot() {
  return false;
}

export function useStandaloneApp() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
