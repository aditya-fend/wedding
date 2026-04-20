import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// Optimasi Font: Menggunakan font-display: swap untuk mencegah FOIT
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Konfigurasi Viewport untuk responsivitas dan tema browser
export const viewport: Viewport = {
  themeColor: "#F8F5F0",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://saji-janji.vercel.app"),
  title: {
    default: "Saji Janji - Buat Undangan Pernikahan Digital Elegan",
    template: "%s | Saji Janji",
  },
  description:
    "Platform pembuatan undangan pernikahan digital no. 1 di Indonesia. Cepat, elegan, dan tersedia berbagai tema menarik. Buat undanganmu dalam hitungan menit!",
  keywords: [
    "undangan digital",
    "undangan pernikahan online",
    "wedding invitation",
    "undangan pernikahan digital",
    "buat undangan online",
    "undangan website",
  ],
  authors: [{ name: "Saji Janji Team" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Saji Janji - Undangan Pernikahan Digital",
    description:
      "Buat undangan pernikahan digital elegan dalam hitungan menit.",
    url: "https://saji-janji.vercel.app",
    siteName: "Saji Janji",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Saji Janji Preview",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saji Janji - Undangan Pernikahan Digital",
    description: "Solusi undangan pernikahan digital modern dan elegan.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased font-sans bg-[#F8F5F0] text-slate-900`}
      >
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
