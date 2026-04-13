import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',        // ← Tambahkan ini untuk QRIS
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // cadangan kalau nanti butuh
      },
    ],
  },
};

export default nextConfig;
