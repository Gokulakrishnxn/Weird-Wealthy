"use client";

import { Footer } from "@/components/footer";
import { useStandaloneApp } from "@/hooks/use-standalone-app";

export function ConditionalFooter() {
  const isApp = useStandaloneApp();
  if (isApp) return null;
  return <Footer />;
}
