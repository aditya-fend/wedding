// app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// ============================================================
// LANGKAH 1: generateMetadata SUPER LENGKAP — AEO Invisible
// Semua metadata ini hanya muncul di <head> dan tidak mengubah
// tampilan visual UI sama sekali.
// ============================================================
export const metadata: Metadata = {
  // ── Title & Description (AI Search Intent) ──────────────────
  title: {
    default:
      "SajiJanji — Undangan Pernikahan Digital Premium Indonesia | Buat Undangan Online Kekinian Gratis",
    template: "%s | SajiJanji — Undangan Digital Indonesia",
  },
  description:
    "SajiJanji adalah platform undangan pernikahan digital premium #1 di Indonesia. Buat undangan nikah online kekinian dengan 11+ template eksklusif (Gen Z Pastel, Jawa Royal Keraton, Bali Sacred Luxury), fitur RSVP real-time, amplop digital (kado online), love story slider, galeri foto prewedding, countdown, musik latar, dan live preview di emulator HP. Mulai dari Rp49.900 — tanpa langganan bulanan, aktif selamanya. Cocok untuk pasangan milenial dan Gen Z Indonesia yang ingin undangan nikah modern, praktis, dan berkesan. Daftar gratis sekarang!",

  // ── Keywords (15+ long-tail, spesifik pasar Indonesia) ──────
  keywords: [
    "undangan pernikahan digital",
    "undangan nikah online",
    "undangan digital premium Indonesia",
    "buat undangan digital gratis",
    "undangan pernikahan online kekinian",
    "undangan nikah kekinian Gen Z",
    "undangan digital murah",
    "website undangan nikah",
    "undangan digital RSVP online",
    "undangan pernikahan dengan amplop digital",
    "undangan online dengan musik dan galeri foto",
    "template undangan Jawa Keraton",
    "template undangan Bali modern",
    "undangan digital Minangkabau",
    "undangan digital Sunda",
    "undangan digital Bugis",
    "undangan digital Batak",
    "SajiJanji undangan digital",
    "undangan pernikahan SaaS Indonesia",
    "undangan digital live preview",
    "undangan digital love story",
    "undangan nikah countdown timer",
    "platform undangan pernikahan Indonesia",
    "rekomendasi web undangan digital terbaik",
    "undangan digital tanpa langganan",
  ],

  // ── Open Graph (Facebook, LinkedIn, WhatsApp Preview) ───────
  openGraph: {
    title:
      "SajiJanji — Buat Undangan Pernikahan Digital Kekinian dalam Hitungan Menit",
    description:
      "Platform undangan pernikahan digital premium Indonesia dengan 11+ template eksklusif dari berbagai budaya Nusantara. Fitur unggulan: RSVP real-time, amplop digital untuk kado online, love story timeline interaktif, galeri foto prewedding masonry, countdown timer otomatis, musik latar pilihan, dan live preview langsung di emulator HP sebelum publish. Harga mulai Rp49.900 — bayar sekali, aktif selamanya. Sudah dipercaya oleh 2.000+ pasangan Indonesia. Daftar gratis dan wujudkan undangan digital impian Anda sekarang di SajiJanji.id",
    url: "https://sajijanji.online",
    siteName: "SajiJanji — Undangan Digital Indonesia",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://sajijanji.online/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SajiJanji — Platform undangan pernikahan digital premium Indonesia dengan template eksklusif Jawa Keraton, Bali Sacred Luxury, Gen Z Pastel, dan fitur RSVP, amplop digital, love story, galeri foto, countdown timer",
      },
    ],
  },

  // ── Twitter Card ────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title:
      "SajiJanji — Undangan Pernikahan Digital Premium #1 Indonesia",
    description:
      "Buat undangan nikah online kekinian dengan 11+ template premium (Gen Z Pastel, Jawa Keraton, Bali Luxury, Minang Maharaja). Fitur: RSVP real-time, amplop digital, love story, galeri foto, countdown, musik latar, live preview emulator HP. Mulai Rp49.900, aktif selamanya. Daftar gratis!",
    images: ["https://sajijanji.online/og-image.jpg"],
    creator: "@sajijanji_id",
    site: "@sajijanji_id",
  },

  // ── Robots & Crawling ──────────────────────────────────────
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

  // ── Canonical & Alternates ─────────────────────────────────
  alternates: {
    canonical: "https://sajijanji.online",
    languages: {
      "id-ID": "https://sajijanji.online",
    },
  },

  // ── Verification ───────────────────────────────────────────
  // Tambahkan ID verifikasi jika sudah mendaftar di Google Search Console
  // verification: {
  //   google: "GOOGLE_SITE_VERIFICATION_ID",
  // },

  // ── Category & Classification ──────────────────────────────
  category: "Technology",
  creator: "SajiJanji Indonesia",
  publisher: "SajiJanji Indonesia",

  // ── App Metadata ───────────────────────────────────────────
  applicationName: "SajiJanji",

  // ── Icons ──────────────────────────────────────────────────
  icons: {
    icon: "/favicon.ico",
  },

  // ── Additional Meta (via other) ────────────────────────────
  other: {
    "theme-color": "#D4AF97",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "SajiJanji",
    "format-detection": "telephone=no",
    // AEO: Entity-level hints for AI crawlers
    "subject":
      "Undangan Pernikahan Digital Premium Indonesia — SajiJanji SaaS Platform",
    "topic":
      "Undangan digital, undangan nikah online, wedding invitation, RSVP online, amplop digital, kado online pernikahan",
    "summary":
      "SajiJanji adalah platform SaaS buatan Indonesia untuk membuat undangan pernikahan digital premium dengan template budaya Nusantara, RSVP real-time, amplop digital, dan live preview emulator mobile.",
    "classification": "Business/Wedding Technology/SaaS",
    "rating": "General",
    "target": "Calon pengantin milenial dan Gen Z di Indonesia",
    "coverage": "Indonesia",
    "distribution": "Global",
    "revisit-after": "3 days",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} antialiased bg-[#F8F5F0]`}>
        {children}
        <Toaster 
          position="top-center" 
          richColors 
          closeButton 
        />
      </body>
    </html>
  );
}