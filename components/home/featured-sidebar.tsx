import Link from "next/link";
import { AuthorAvatar } from "@/components/blog/author-avatar";
import type { BlogPost } from "@/lib/blog/types";
import { pageContainer } from "@/lib/layout";
import { cn } from "@/lib/utils";

type FeaturedSidebarProps = {
  featured: BlogPost;
  popular: BlogPost[];
};

export function FeaturedSidebar({ featured, popular }: FeaturedSidebarProps) {
  return (
    <section
      id="lifestyle"
      className={cn(
        "scroll-mt-24 border-t border-border py-12 sm:py-16 md:py-20",
        pageContainer
      )}
    >
      <div className="grid gap-10 lg:grid-cols-3 lg:gap-8 xl:gap-12">
        <Link
          href={`/${featured.slug}`}
          className="group relative flex min-h-[420px] overflow-hidden rounded-3xl lg:col-span-2 lg:min-h-[480px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featured.image}
            alt=""
            className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
          <div className="relative mt-auto p-6 sm:p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-2 text-sm text-white/75">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-wider">
                Lifestyle
              </span>
              <time dateTime={featured.createdAt}>{featured.createdAt}</time>
            </div>
            <h2 className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl lg:max-w-2xl">
              {featured.title}
            </h2>
          </div>
        </Link>

        <aside className="flex flex-col gap-8 lg:col-span-1">
          <div className="rounded-3xl border border-border bg-elevated p-6 sm:p-8">
            <AuthorAvatar
              name={featured.author}
              avatar={featured.authorAvatar}
              size="lg"
            />
            <h3 className="mt-4 text-lg font-semibold">{featured.author}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Writer at Weird & Wealthy covering design, wealth, and the weird
              edge of building products people love.
            </p>
            <div className="mt-5 flex gap-3">
              {["X", "IG", "in", "fb"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="flex size-9 items-center justify-center rounded-full border border-border text-xs font-medium text-muted-foreground transition-colors hover:bg-elevated-hover hover:text-foreground"
                  aria-label={`${label} social`}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Popular articles
            </h3>
            <ul className="mt-4 space-y-5">
              {popular.slice(0, 4).map((post) => (
                <li key={post.slug}>
                  <Link href={`/${post.slug}`} className="group block space-y-1">
                    <p className="font-medium leading-snug transition-colors group-hover:text-foreground/90">
                      {post.title}
                    </p>
                    <time
                      className="text-xs text-muted-foreground"
                      dateTime={post.createdAt}
                    >
                      {post.createdAt}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
