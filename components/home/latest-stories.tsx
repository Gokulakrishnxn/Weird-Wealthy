import { BlogCard } from "@/components/blog/blog-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { blogPosts } from "@/lib/blog/posts";
import { pageContainer, scrollMtHeader } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function LatestStories() {
  return (
    <section
      id="ai-news"
      className={cn(
        "scroll-mt-24 pb-16 pt-4 sm:pb-20 md:pb-24",
        pageContainer,
        scrollMtHeader
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            The feed
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Latest stories
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {blogPosts.length} articles
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-3 lg:gap-10">
        {blogPosts.map((post, index) => (
          <ScrollReveal key={post.slug} delay={Math.min(index * 0.05, 0.4)}>
            <BlogCard {...post} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
