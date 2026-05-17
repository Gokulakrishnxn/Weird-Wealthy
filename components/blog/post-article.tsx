import Link from "next/link";
import Image from "next/image";
import { AuthorMeta } from "@/components/blog/author-meta";
import { PostBody } from "@/components/blog/post-body";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getCategory } from "@/lib/blog/categories";
import { getPostContent } from "@/lib/blog/get-post-content";
import type { BlogPost } from "@/lib/blog/types";
import { textLinkInternal, textLinkMuted } from "@/lib/link-styles";
import { articleColumn, pageContainer, scrollMtHeader } from "@/lib/layout";
import { cn } from "@/lib/utils";

type PostArticleProps = {
  post: BlogPost;
  /** Pre-rendered HTML from Tiptap (CMS posts). Falls back to static content. */
  contentHtml?: string;
};

export function PostArticle({ post, contentHtml }: PostArticleProps) {
  const category = getCategory(post.category);
  const content = getPostContent(post.slug);

  return (
    <article
      className={cn(
        "min-w-0 grow py-8 sm:py-12 md:py-16 lg:py-20",
        pageContainer,
        scrollMtHeader
      )}
    >
      <div className={articleColumn}>
        <ScrollReveal>
          <Link
            href="/blog"
            className={cn(
              textLinkMuted,
              "inline-flex min-h-11 items-center text-sm sm:text-base"
            )}
          >
            ← Back to blog
          </Link>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <header className="mt-6 space-y-5 text-center sm:mt-8 sm:space-y-6 md:mt-12">
          <Link
            href={category.path}
            className={cn(
              textLinkMuted,
              "mx-auto inline-flex w-fit rounded-full border border-border px-4 py-1.5 text-xs font-medium uppercase tracking-wider sm:text-sm"
            )}
          >
            {category.label}
          </Link>
          <AuthorMeta
            author={post.author}
            authorAvatar={post.authorAvatar}
            createdAt={post.createdAt}
            readTime={post.readTime}
            avatarSize="lg"
            stackedOnMobile
            className="mx-auto items-center text-sm sm:text-base md:text-lg"
          />
          <h1 className="text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-foreground sm:text-4xl md:text-5xl md:leading-[1.08] lg:text-6xl">
            {post.title}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl md:text-2xl">
            {post.description}
          </p>
        </header>
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-elevated md:mt-10 md:rounded-3xl">
          <Image
            src={post.image}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>
      </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-8 sm:mt-10 md:mt-12">
          {contentHtml ? (
            <div
              className="prose-article w-full text-base leading-[1.75] text-muted-foreground sm:text-lg sm:leading-[1.8]"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          ) : content ? (
            <PostBody content={content} />
          ) : (
            <p className="text-center text-muted-foreground">
              Article content is unavailable.
            </p>
          )}
        </ScrollReveal>
      </div>
    </article>
  );
}
