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
    ],
  },
  async redirects() {
    return [
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:slug", destination: "/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
