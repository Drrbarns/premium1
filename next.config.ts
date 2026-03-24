import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Avoid Vercel image optimizer limits causing broken production images.
    unoptimized: true,
    qualities: [75, 80],
  },
};

export default nextConfig;
