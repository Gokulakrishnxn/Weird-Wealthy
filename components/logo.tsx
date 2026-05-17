import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-block font-semibold tracking-tight text-foreground",
        className
      )}
    >
      Weird & Wealthy
    </Link>
  );
}
