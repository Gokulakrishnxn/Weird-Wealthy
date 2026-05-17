import type { Metadata } from "next";
import { HomePage } from "@/components/home/home-page";

export const metadata: Metadata = {
  title: "Weird & Wealthy — The Journal",
  description:
    "Where weird ideas meet lasting wealth. AI news, finance, branding, and lifestyle for builders and founders.",
};

export default function Home() {
  return <HomePage />;
}
