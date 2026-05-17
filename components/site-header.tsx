"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { headerSpacer } from "@/lib/layout";
import { cn } from "@/lib/utils";

/** Remount nav on route change so mobile menu state resets without effects. */
export function SiteHeader() {
  const pathname = usePathname();
  return (
    <>
      <Navbar key={pathname} />
      <div className={cn(headerSpacer)} aria-hidden />
    </>
  );
}
