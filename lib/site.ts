/** Site-wide config for metadata, SEO, and structured data */
export const siteConfig = {
  name: "Weird & Wealthy",
  shortName: "W&W",
  legalName: "Weird & Wealthy",
  tagline: "Where weird ideas meet lasting wealth",
  description:
    "Weird & Wealthy is a weekly journal for builders and founders—covering AI news, finance, personal branding, and lifestyle design for people who think differently and build accordingly.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://weirdandwealthy.com",
  locale: "en_US",
  language: "en",
  email: "hello@weirdandwealthy.com",
} as const;

export function absoluteUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
}
