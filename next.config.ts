import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2400],
    imageSizes: [256, 384, 512],
    qualities: [75, 90, 92, 95, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.efferd.com",
        pathname: "/**",
      },
      // Supabase Storage (replace <project-ref> with your project reference)
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/blog/:slug", destination: "/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
