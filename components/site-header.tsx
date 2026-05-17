"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";

/** Remount nav on route change so mobile menu state resets without effects. */
export function SiteHeader() {
  const pathname = usePathname();
  return <Navbar key={pathname} />;
}
