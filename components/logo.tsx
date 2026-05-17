import type { CSSProperties } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** Transparent mark (black shape); tinted via CSS mask + background */
export const LOGO_MARK_SRC = "/logo.png";

const logoIconSizes = cva(
  [
    "shrink-0",
    "bg-current",
    "[mask-image:var(--logo-mask)] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]",
    "[-webkit-mask-image:var(--logo-mask)] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]",
  ],
  {
    variants: {
      size: {
        sm: "size-5",
        md: "size-5 sm:size-6",
        lg: "size-6 sm:size-7 md:size-8",
      },
      tone: {
        default: "text-foreground",
        inverse: "text-[var(--newsletter-fg)]",
        muted: "text-foreground",
      },
    },
    defaultVariants: {
      size: "md",
      tone: "default",
    },
  }
);

const logoVariants = cva("inline-flex min-w-0 max-w-full text-foreground", {
  variants: {
    size: {
      sm: "[--logo-text:0.8125rem]",
      md: "[--logo-text:0.875rem] sm:[--logo-text:0.9375rem]",
      lg: "[--logo-text:1rem] sm:[--logo-text:1.0625rem] md:[--logo-text:1.125rem]",
    },
    tone: {
      default: "text-foreground",
      inverse: "text-[var(--newsletter-fg)]",
      muted: "text-foreground",
    },
  },
  defaultVariants: {
    size: "md",
    tone: "default",
  },
});

const ampVariants = cva("font-normal", {
  variants: {
    tone: {
      default: "text-muted-foreground",
      inverse: "text-[color-mix(in_srgb,var(--newsletter-fg)_50%,transparent)]",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: { tone: "default" },
});

type LogoProps = VariantProps<typeof logoVariants> & {
  className?: string;
  asLink?: boolean;
  /** Show “the journal” under the wordmark (footer) */
  showTagline?: boolean;
};

function LogoIcon({
  size,
  tone,
}: Pick<VariantProps<typeof logoVariants>, "size" | "tone">) {
  return (
    <span
      aria-hidden
      className={logoIconSizes({ size, tone })}
      style={
        {
          "--logo-mask": `url(${LOGO_MARK_SRC})`,
        } as CSSProperties
      }
    />
  );
}

function LogoMark({
  size,
  tone,
  showTagline,
}: VariantProps<typeof logoVariants> & { showTagline?: boolean }) {
  return (
    <span className={cn(logoVariants({ size, tone }), "flex flex-col leading-none")}>
      <span className="flex min-w-0 items-center gap-1.5 sm:gap-2">
        <LogoIcon size={size} tone={tone} />
        <span
          className={cn(
            "flex min-w-0 items-baseline gap-[0.35em] font-[family-name:var(--font-logo)] font-bold tracking-[-0.045em]",
            "text-[length:var(--logo-text)]"
          )}
        >
          <span>weird</span>
          <span className={ampVariants({ tone })} aria-hidden>
            &
          </span>
          <span>wealthy</span>
        </span>
      </span>
      {showTagline && (
        <span
          className={cn(
            "mt-1.5 text-[0.55em] font-medium uppercase tracking-[0.28em]",
            tone === "inverse"
              ? "text-[color-mix(in_srgb,var(--newsletter-fg)_55%,transparent)]"
              : "text-muted-foreground"
          )}
        >
          the journal
        </span>
      )}
    </span>
  );
}

export function Logo({
  className,
  asLink = true,
  size,
  tone,
  showTagline,
}: LogoProps) {
  const mark = <LogoMark size={size} tone={tone} showTagline={showTagline} />;

  if (!asLink) {
    return (
      <span
        className={cn("inline-block min-w-0", className)}
        aria-label="Weird & Wealthy"
      >
        {mark}
      </span>
    );
  }

  return (
    <Link
      href="/"
      className={cn(
        "inline-block min-w-0 max-w-full transition-opacity hover:opacity-75",
        className
      )}
      aria-label="Weird & Wealthy — home"
    >
      {mark}
    </Link>
  );
}
