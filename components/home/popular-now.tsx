import Link from "next/link";
import type { BlogPost } from "@/lib/blog/types";
import { pageContainer } from "@/lib/layout";
import { cn } from "@/lib/utils";

type PopularNowProps = {
  posts: BlogPost[];
};

const categoryTags = ["AI News", "Finance", "Personal Branding"];

export function PopularNow({ posts }: PopularNowProps) {
  return (
    <section className={cn("border-t border-border py-12 sm:py-16", pageContainer)}>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
        Popular now
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-8">
        {posts.slice(0, 3).map((post, index) => (
          <Link
            key={post.slug}
            href={`/${post.slug}`}
            className="group space-y-3 border-border sm:border-r sm:pr-8 lg:last:border-r-0 lg:last:pr-0"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:text-sm">
              <span className="rounded-full border border-border px-2.5 py-0.5 font-medium uppercase tracking-wider">
                {categoryTags[index] ?? "Journal"}
              </span>
              <time dateTime={post.createdAt}>{post.createdAt}</time>
            </div>
            <h3 className="text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-white/90 sm:text-xl md:text-2xl">
              {post.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
