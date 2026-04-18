import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co", // ← Tambahkan ini untuk QRIS
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // cadangan kalau nanti butuh
      },
      {
        protocol: "https",
        hostname: "imgs.search.brave.com", // untuk gambar gallery
      },
      {
        protocol: "https",
        hostname: "kdilqeoxwrcndmiivujr.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
