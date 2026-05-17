/** Shared page width and responsive spacing */
export const pageContainer =
  "mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12";

/** Centered reading column for blog posts */
export const articleColumn = "mx-auto w-full max-w-3xl";

/** Fixed navbar height (excludes safe-area; header adds inset separately) */
export const headerBarHeight = "h-14 md:h-16";

/** Spacer below fixed header (bar + safe-area) */
export const headerSpacer =
  "h-[calc(env(safe-area-inset-top)+3.5rem)] shrink-0 md:h-[calc(env(safe-area-inset-top)+4rem)]";

/** Top edge of mobile menu panel (below fixed header) */
export const mobileNavPanelTop =
  "top-[calc(env(safe-area-inset-top)+3.5rem)]";

/** Sticky header offset for anchor links (matches navbar height) */
export const scrollMtHeader =
  "scroll-mt-[calc(env(safe-area-inset-top)+3.5rem)] md:scroll-mt-[calc(env(safe-area-inset-top)+4rem)]";

/** Minimum touch target (44×44px) for interactive controls */
export const touchTarget =
  "min-h-11 min-w-11 inline-flex items-center justify-center";

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
