import { SiteHeader } from "@/components/site-header";
import { ConditionalFooter } from "@/components/pwa/conditional-footer";
import { NewsletterPopup } from "@/components/newsletter-popup";
import { ChatWidget } from "@/components/chatbot/chat-widget";
import { SmoothScroll } from "@/components/smooth-scroll";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
