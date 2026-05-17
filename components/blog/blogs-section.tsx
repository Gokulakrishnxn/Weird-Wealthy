import { BlogCard } from "@/components/blog/blog-card";
import { BlogHero } from "@/components/blog/blog-hero";
import { ScrollReveal } from "@/components/scroll-reveal";
import { blogPosts } from "@/lib/blog/posts";
import { pageContainer, scrollMtHeader } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function BlogsSection() {
  return (
    <div className={cn("relative min-w-0 grow", pageContainer)}>
      <BlogHero />
      <section
        id="ai-news"
        className={cn(
          "z-10 grid grid-cols-1 gap-5 py-6 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-3 lg:gap-10 lg:pb-16",
          scrollMtHeader
        )}
      >
        {blogPosts.map((post, index) => (
          <ScrollReveal key={post.slug} delay={Math.min(index * 0.06, 0.48)}>
            <BlogCard {...post} />
          </ScrollReveal>
        ))}
      </section>
    </div>
  );
}
