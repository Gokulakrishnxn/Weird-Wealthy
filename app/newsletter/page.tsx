import type { Metadata } from "next";
import { NewsletterPageContent } from "@/components/pages/newsletter-page-content";

export const metadata: Metadata = {
  title: "Newsletter | Weird & Wealthy",
  description:
    "Subscribe to Weird & Wealthy for weekly AI, finance, branding, and lifestyle insights.",
};

export default function NewsletterPage() {
  return <NewsletterPageContent />;
}
