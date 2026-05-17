import { cn } from "@/lib/utils";

/** Blue links for external websites */
export const textLinkExternal = cn(
  "text-link underline-offset-2 transition-colors",
  "hover:text-link-hover hover:underline"
);

/** Author bylines — blue, links to author archive on /blog */
export const textLinkAuthor = cn(
  "text-link font-medium underline-offset-2 transition-colors",
  "hover:text-link-hover hover:underline"
);

/** Internal site navigation */
export const textLinkInternal = cn(
  "text-foreground underline-offset-2 transition-colors",
  "hover:text-foreground/80 hover:underline"
);

export const textLinkInternalEmphasis = cn(
  textLinkInternal,
  "font-medium"
);

export const textLinkMuted = cn(
  "text-muted-foreground underline-offset-2 transition-colors",
  "hover:text-foreground hover:underline"
);

export function isExternalHref(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//")
  );
}

export function linkClassForHref(href: string, emphasis = false) {
  if (isExternalHref(href)) {
    return textLinkExternal;
  }
  return emphasis ? textLinkInternalEmphasis : textLinkInternal;
}
