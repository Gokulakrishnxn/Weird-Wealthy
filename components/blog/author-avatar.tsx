"use client";

import { useState } from "react";
import {
  getAuthorInitials,
  resolveAuthorAvatar,
} from "@/lib/blog/authors";
import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "size-7 text-[10px]",
  md: "size-9 text-xs",
  lg: "size-12 text-sm",
  xl: "size-16 text-base",
} as const;

type AuthorAvatarProps = {
  name: string;
  avatar?: string;
  size?: keyof typeof sizeClasses;
  className?: string;
};

export function AuthorAvatar({
  name,
  avatar,
  size = "md",
  className,
}: AuthorAvatarProps) {
  const [failed, setFailed] = useState(false);
  const src = resolveAuthorAvatar(name, avatar);
  const initials = getAuthorInitials(name);

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full border border-border bg-elevated ring-1 ring-foreground/5",
        sizeClasses[size],
        className
      )}
      title={name}
    >
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt=""
          src={src}
          className="size-full object-cover"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className="flex size-full items-center justify-center bg-elevated font-semibold text-foreground/90"
          aria-hidden
        >
          {initials}
        </span>
      )}
    </span>
  );
}
