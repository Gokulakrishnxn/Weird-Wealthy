import type { Metadata } from "next";
import { BlogOverviewPage } from "@/components/pages/blog-overview-page";

export const metadata: Metadata = {
  title: "Blog | Weird & Wealthy",
  description:
    "Browse every story on Weird & Wealthy—AI, finance, personal branding, lifestyle, and building wealth with intention.",
};

type BlogPageProps = {
  searchParams: Promise<{ author?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { author } = await searchParams;

  return <BlogOverviewPage authorSlug={author} />;
}
