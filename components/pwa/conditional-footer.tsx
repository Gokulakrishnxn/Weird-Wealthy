"use client";

import { Footer } from "@/components/footer";
import { useAppMobileShell } from "@/hooks/use-app-mobile-shell";

export function ConditionalFooter() {
  const isAppMobile = useAppMobileShell();
  if (isAppMobile) return null;
  return <Footer />;
}
