import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { AppSplash } from "@/components/pwa/app-splash";
import { RegisterServiceWorker } from "@/components/pwa/register-service-worker";
import { StandaloneInit } from "@/components/pwa/standalone-init";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const logoFont = Outfit({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-logo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteConfig.shortName,
  },
  applicationName: siteConfig.name,
  formatDetection: {
    telephone: false,
  },
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
      className={`h-full ${logoFont.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        <StandaloneInit />
        <ThemeProvider>
          <RegisterServiceWorker />
          <AppSplash />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
