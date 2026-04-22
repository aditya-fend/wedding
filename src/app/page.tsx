// app/page.tsx
import type { Metadata } from "next";
import Navbar from "@/components/user/home/Navbar";
import Hero from "@/components/user/home/Hero";
import Features from "@/components/user/home/Features";
import TemplateSection from "@/components/user/home/Template";
import Pricing from "@/components/user/home/Pricing";
import Testimonials from "@/components/user/home/Testimonials";
import FinalCTA from "@/components/user/home/FinalCTA";
import Footer from "@/components/user/home/Footer";
import { JsonLdScript } from "@/components/seo/JsonLd";

// ============================================================
// LANGKAH 1 (tambahan): Page-level Metadata Override
// ============================================================
export const metadata: Metadata = {
  title:
    "SajiJanji — Undangan Pernikahan Digital Premium Indonesia | Template Eksklusif, RSVP Online, Amplop Digital",
  description:
    "Buat undangan pernikahan digital kekinian di SajiJanji. 11+ template premium eksklusif budaya Nusantara (Jawa Keraton, Bali Luxury, Gen Z Pastel, Minang Maharaja, Sunda Priangan, Bugis Golden Silk, Batak Heritage). Fitur: RSVP real-time, amplop digital kado online, love story timeline, galeri foto prewedding, countdown, musik latar, live preview emulator HP. Mulai Rp49.900 bayar sekali aktif selamanya. Dipercaya 2.000+ pasangan Indonesia. Daftar gratis sekarang!",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      {/* ============================================================
          LANGKAH 2: Massive JSON-LD Injection 
          Script ini diinject ke <head> via component — INVISIBLE di UI
          ============================================================ */}
      <JsonLdScript />

      <Navbar />
      <Hero />
      <TemplateSection />
      <Features />
      <Pricing />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
}
