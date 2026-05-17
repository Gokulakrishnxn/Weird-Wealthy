import Link from "next/link";
import { getAuthorHref } from "@/lib/blog/authors";
import { textLinkAuthor } from "@/lib/link-styles";
import { cn } from "@/lib/utils";

type AuthorLinkProps = {
  name: string;
  className?: string;
};

export function AuthorLink({ name, className }: AuthorLinkProps) {
  return (
    <Link href={getAuthorHref(name)} className={cn(textLinkAuthor, className)}>
      {name}
    </Link>
  );
}
