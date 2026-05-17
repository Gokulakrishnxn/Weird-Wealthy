import type { Metadata } from "next";
import { WritePageContent } from "@/components/pages/write-page-content";
import { absoluteUrl, siteConfig } from "@/lib/site";

const title = "Become an author | Weird & Wealthy";
const description =
  "Pitch a story to Weird & Wealthy. We publish practical articles on design, AI, finance, personal branding, and lifestyle for builders and founders.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: absoluteUrl("/write"),
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: absoluteUrl("/write"),
    siteName: siteConfig.name,
    title,
    description,
    images: [
      {
        url: "https://storage.efferd.com/creative/light-rays.webp",
        width: 1200,
        height: 630,
        alt: "Become an author at Weird & Wealthy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://storage.efferd.com/creative/light-rays.webp"],
  },
};

export default function WritePage() {
  return <WritePageContent />;
}
