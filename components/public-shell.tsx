"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { ConditionalFooter } from "@/components/pwa/conditional-footer";
import { NewsletterPopup } from "@/components/newsletter-popup";
import { ChatWidget } from "@/components/chatbot/chat-widget";
import { SmoothScroll } from "@/components/smooth-scroll";

const CMS_PREFIXES = ["/admin", "/author", "/auth", "/preview"];

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCms = CMS_PREFIXES.some((p) => pathname.startsWith(p));

  if (isCms) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <SiteHeader />
      <main className="flex min-w-0 flex-1 flex-col overflow-x-hidden">
        {children}
      </main>
      <ConditionalFooter />
      <NewsletterPopup />
      <ChatWidget />
    </SmoothScroll>
  );
}
