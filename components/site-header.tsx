"use client";

import { usePathname } from "next/navigation";
import { AppNavbar, AppNavbarSpacers } from "@/components/navbar-app";
import { Navbar } from "@/components/navbar";
import { headerSpacer } from "@/lib/layout";
import { cn } from "@/lib/utils";
import { useStandaloneApp } from "@/hooks/use-standalone-app";

/** Remount nav on route change so mobile menu state resets without effects. */
export function SiteHeader() {
  const pathname = usePathname();
  const isApp = useStandaloneApp();

  if (isApp) {
    return (
      <>
        <AppNavbar key={pathname} />
        <AppNavbarSpacers />
      </>
    );
  }

  return (
    <>
      <Navbar key={pathname} />
      <div className={cn(headerSpacer)} aria-hidden />
    </>
  );
}
