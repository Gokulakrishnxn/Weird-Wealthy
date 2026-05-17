import type { Metadata } from "next";
import { AboutPageContent } from "@/components/pages/about-page-content";
import { JsonLd } from "@/components/seo/json-ld";
import { getAboutPageJsonLd } from "@/lib/seo/about";
import { absoluteUrl, siteConfig } from "@/lib/site";

const title = "About Weird & Wealthy — Design, AI, Finance & Wealth Journal";
const description =
  "Learn about Weird & Wealthy: a weekly journal for founders and builders on AI news, personal finance, personal branding, and lifestyle design. Our mission, topics, and FAQs.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: absoluteUrl("/about"),
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: absoluteUrl("/about"),
    siteName: siteConfig.name,
    title,
    description,
    images: [
      {
        url: "https://storage.efferd.com/creative/ripple-grid.webp",
        width: 1200,
        height: 630,
        alt: "About Weird & Wealthy — design, AI, and wealth journal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://storage.efferd.com/creative/ripple-grid.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={getAboutPageJsonLd()} />
      <AboutPageContent />
    </>
  );
}
