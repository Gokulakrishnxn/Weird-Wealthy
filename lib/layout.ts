/** Shared page width and responsive spacing */
export const pageContainer =
  "mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12";

/** Centered reading column for blog posts */
export const articleColumn = "mx-auto w-full max-w-3xl";

/** Installed PWA — compact top bar */
export const appHeaderHeight = "h-12";

export const appHeaderSpacer =
  "h-[calc(env(safe-area-inset-top)+3rem)] shrink-0";

/** Installed PWA — bottom tab bar (bar only; safe-area on nav element) */
export const appTabBarHeight = "h-14";

export const appTabBarSpacer =
  "h-[calc(env(safe-area-inset-bottom)+3.5rem)] shrink-0";

/** Fixed navbar height (excludes safe-area; header adds inset separately) */
export const headerBarHeight = "h-14 lg:h-16";

/** Spacer below fixed header (bar + safe-area) */
export const headerSpacer =
  "h-[calc(env(safe-area-inset-top)+3.5rem)] shrink-0 lg:h-[calc(env(safe-area-inset-top)+4rem)]";

/** Top edge of mobile menu panel (below fixed header) */
export const mobileNavPanelTop =
  "top-[calc(env(safe-area-inset-top)+3.5rem)] lg:top-[calc(env(safe-area-inset-top)+4rem)]";

/** Sticky header offset for anchor links (matches navbar height) */
export const scrollMtHeader =
  "scroll-mt-[calc(env(safe-area-inset-top)+3.5rem)] lg:scroll-mt-[calc(env(safe-area-inset-top)+4rem)]";

/** Minimum touch target (44×44px) for interactive controls */
export const touchTarget =
  "min-h-11 min-w-11 inline-flex items-center justify-center";

/** Minty chat — FAB (fixed, bottom-right, safe-area aware) */
export const chatFabPosition =
  "bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-[max(0.75rem,env(safe-area-inset-right))] sm:bottom-6 sm:right-6";

/** Minty chat — panel sits above FAB + insets on all viewports */
export const chatPanelPosition = [
  "bottom-[max(5rem,calc(env(safe-area-inset-bottom)+4.25rem))]",
  "left-[max(0.5rem,env(safe-area-inset-left))]",
  "right-[max(0.5rem,env(safe-area-inset-right))]",
  "sm:bottom-[max(6.5rem,calc(env(safe-area-inset-bottom)+5.5rem))]",
  "sm:left-auto sm:w-[min(100%,24rem)]",
].join(" ");

export const chatPanelSize = [
  "max-h-[min(32rem,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-5.5rem))]",
  "min-h-[min(16rem,42dvh)]",
  "sm:max-h-[min(36rem,calc(100dvh-env(safe-area-inset-top)-8rem))]",
  "sm:min-h-[min(20rem,48dvh)]",
  "md:max-h-[min(40rem,calc(100dvh-env(safe-area-inset-top)-7rem))]",
].join(" ");

/** Inset hero card — category / about pages */
export const heroCardHeightPage =
  "aspect-[4/5] w-full min-h-[16rem] max-h-[min(72dvh,28rem)] sm:aspect-[16/11] sm:max-h-[min(75dvh,32rem)] md:aspect-[16/9] md:max-h-[min(70dvh,36rem)] lg:max-h-[min(68dvh,40rem)] xl:max-h-[min(65dvh,44rem)]";

/** Inset hero card — home featured */
export const heroCardHeightHome =
  "aspect-[4/5] w-full min-h-[18rem] max-h-[min(78dvh,32rem)] sm:aspect-[3/4] sm:max-h-[min(80dvh,36rem)] md:aspect-[16/10] md:max-h-[min(78dvh,42rem)] lg:aspect-[2/1] lg:max-h-[min(75dvh,48rem)] xl:max-h-[min(72dvh,52rem)]";

/** Shared hero card shell (border, radius, shadow) */
export const heroCardShell =
  "relative isolate w-full overflow-hidden rounded-3xl border border-border bg-card shadow-lg shadow-foreground/[0.06] ring-1 ring-foreground/[0.08] md:rounded-[2rem] md:shadow-xl";

/** Hero section outer spacing (below fixed nav spacer in layout) */
export const heroSectionPadding = "pb-4 pt-4 sm:pb-6 sm:pt-6 md:pb-8 md:pt-8";
