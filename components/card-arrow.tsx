import { ArrowUpRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardArrowVariants = cva(
  [
    "shrink-0 will-change-transform",
    "transition-[transform,color,opacity] duration-300 ease-[cubic-bezier(0.34,1.2,0.64,1)]",
    "motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1",
    "motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0",
  ],
  {
    variants: {
      variant: {
        inline: "text-foreground/50 group-hover:text-foreground",
        muted: "text-muted-foreground group-hover:text-foreground",
        onDark: "text-white/90 group-hover:text-black",
        emphasis: "text-foreground/70 group-hover:text-foreground",
      },
      size: {
        sm: "size-4",
        md: "size-5",
      },
    },
    defaultVariants: {
      variant: "inline",
      size: "md",
    },
  }
);

type CardArrowProps = VariantProps<typeof cardArrowVariants> & {
  className?: string;
};

export function CardArrow({ variant, size, className }: CardArrowProps) {
  return (
    <ArrowUpRight
      aria-hidden
      className={cn(cardArrowVariants({ variant, size }), className)}
    />
  );
}
