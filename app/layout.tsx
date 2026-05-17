import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { NewsletterPopup } from "@/components/newsletter-popup";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const logoFont = Outfit({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-logo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Weird & Wealthy",
  description: "Design, technology, and building wealth.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0eee9" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full overflow-x-hidden ${logoFont.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col overflow-x-hidden pb-[env(safe-area-inset-bottom)]">
        <ThemeProvider>
          <SmoothScroll>
            <SiteHeader />
            <main className="flex min-w-0 flex-1 flex-col">{children}</main>
            <Footer />
            <NewsletterPopup />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
