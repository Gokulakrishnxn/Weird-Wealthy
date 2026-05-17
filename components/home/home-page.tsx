import { blogPosts } from "@/lib/blog/posts";
import { CategoryCards } from "@/components/home/category-cards";
import { FeaturedSidebar } from "@/components/home/featured-sidebar";
import { HeroSection } from "@/components/home/hero-section";
import { LatestStories } from "@/components/home/latest-stories";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { PopularNow } from "@/components/home/popular-now";

export function HomePage() {
  const [featured, second, third, fourth, ...rest] = blogPosts;

  return (
    <>
      <HeroSection featured={featured} />
      <CategoryCards />
      <PopularNow posts={[second, third, fourth]} />
      <NewsletterSection />
      <FeaturedSidebar featured={fourth} popular={rest} />
      <LatestStories />
    </>
  );
}
