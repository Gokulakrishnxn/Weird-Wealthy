import { AuthorAvatar } from "@/components/blog/author-avatar";
import { cn } from "@/lib/utils";

type AuthorMetaProps = {
  author: string;
  authorAvatar?: string;
  createdAt: string;
  readTime: string;
  avatarSize?: "sm" | "md" | "lg" | "xl";
  className?: string;
  stackedOnMobile?: boolean;
};

export function AuthorMeta({
  author,
  authorAvatar,
  createdAt,
  readTime,
  avatarSize = "sm",
  className,
  stackedOnMobile = false,
}: AuthorMetaProps) {
  return (
    <div
      className={cn(
        "gap-2.5 text-muted-foreground transition-colors duration-500 group-hover:text-foreground/90 sm:gap-3",
        stackedOnMobile
          ? "flex flex-col items-start sm:flex-row sm:items-center"
          : "flex items-center",
        className
      )}
    >
      <AuthorAvatar name={author} avatar={authorAvatar} size={avatarSize} />
      <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] sm:text-xs md:text-sm">
        <span className="max-w-full truncate font-medium text-foreground/90">
          {author}
        </span>
        <span className="hidden size-1 shrink-0 rounded-full bg-muted-foreground sm:block" />
        <time className="shrink-0" dateTime={createdAt}>
          {createdAt}
        </time>
        <span className="size-1 shrink-0 rounded-full bg-muted-foreground" />
        <span className="shrink-0">{readTime}</span>
      </div>
    </div>
  );
}
