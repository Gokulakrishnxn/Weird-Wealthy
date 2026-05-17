import Link from "next/link";
import type { PostBlock, PostContent } from "@/lib/blog/post-content-types";
import { textLinkInternal } from "@/lib/link-styles";
import { cn } from "@/lib/utils";

type PostBodyProps = {
  content: PostContent;
  className?: string;
};

const bodyProse =
  "w-full text-base leading-[1.75] text-muted-foreground sm:text-lg sm:leading-[1.8]";

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className="mb-6 last:mb-0">{block.text}</p>;
    case "heading":
      if (block.level === 2) {
        return (
          <h2 className="mb-4 mt-10 text-xl font-semibold tracking-tight text-foreground first:mt-0 sm:mb-5 sm:mt-12 sm:text-2xl md:text-3xl">
            {block.text}
          </h2>
        );
      }
      return (
        <h3 className="mb-3 mt-8 text-lg font-semibold tracking-tight text-foreground sm:mb-4 sm:text-xl">
          {block.text}
        </h3>
      );
    case "list":
      if (block.ordered) {
        return (
          <ol className="mb-6 list-decimal space-y-2 pl-6 marker:text-foreground/70">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="mb-6 list-disc space-y-2 pl-6 marker:text-foreground/70">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="mb-6 border-l-2 border-border py-1 pl-5 text-foreground/90 italic sm:pl-6">
          <p>&ldquo;{block.text}&rdquo;</p>
          {block.attribution && (
            <footer className="mt-3 text-sm not-italic text-muted-foreground">
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      );
    case "callout":
      return (
        <aside className="mb-6 rounded-2xl border border-border bg-elevated px-5 py-4 sm:px-6 sm:py-5">
          {block.title && (
            <p className="mb-2 text-sm font-semibold text-foreground">
              {block.title}
            </p>
          )}
          <p className="text-sm leading-relaxed sm:text-base">{block.text}</p>
        </aside>
      );
    default:
      return null;
  }
}

export function PostBody({ content, className }: PostBodyProps) {
  return (
    <div className={cn(bodyProse, className)}>
      {content.map((block, i) => (
        <Block key={`${block.type}-${i}`} block={block} />
      ))}
      <p className="mt-10 text-sm sm:text-base">
        Enjoyed this story? Browse more on the{" "}
        <Link href="/blog" className={textLinkInternal}>
          blog overview
        </Link>{" "}
        or{" "}
        <Link href="/newsletter" className={textLinkInternal}>
          subscribe
        </Link>{" "}
        for weekly notes.
      </p>
    </div>
  );
}
