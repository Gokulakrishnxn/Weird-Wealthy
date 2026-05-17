import { blogPosts } from "@/lib/blog/posts";
import { getPublishedPosts } from "@/lib/supabase/posts";
import { CategoryCards } from "@/components/home/category-cards";
import { FeaturedSidebar } from "@/components/home/featured-sidebar";
import { HeroSection } from "@/components/home/hero-section";
import { LatestStories } from "@/components/home/latest-stories";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { PopularNow } from "@/components/home/popular-now";

export async function HomePage() {
  const dbPosts = await getPublishedPosts();
  const posts = dbPosts.length > 0 ? dbPosts : blogPosts;

  const [featured, second, third, fourth, ...rest] = posts;

  if (!featured) {
    return (
      <div className="flex min-h-[60dvh] items-center justify-center text-muted-foreground text-sm">
        No stories published yet.
      </div>
    );
  }

  return (
    <>
      <HeroSection featured={featured} />
      <CategoryCards />
      <PopularNow posts={[second, third, fourth].filter(Boolean)} />
      <NewsletterSection />
      <FeaturedSidebar featured={fourth ?? featured} popular={rest} />
      <LatestStories posts={posts} />
    </>
  );
}
