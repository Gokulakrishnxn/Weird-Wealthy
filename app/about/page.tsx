import type { Metadata } from "next";
import { AboutPageContent } from "@/components/pages/about-page-content";

export const metadata: Metadata = {
  title: "About | Weird & Wealthy",
  description:
    "Weird & Wealthy is a journal at the intersection of design, AI, money, and creative life.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
