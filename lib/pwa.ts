/** True when opened as installed PWA (home screen / Add to Home Screen). */
export function isStandaloneApp(): boolean {
  if (typeof window === "undefined") return false;
  return (
    document.documentElement.classList.contains("app-standalone") ||
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: fullscreen)").matches ||
    ("standalone" in navigator &&
      (navigator as Navigator & { standalone?: boolean }).standalone ===
        true)
  );
}

export const APP_STANDALONE_CLASS = "app-standalone";
