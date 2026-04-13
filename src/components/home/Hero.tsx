// components/home/Hero.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-[100dvh] pt-24 pb-16 md:pb-24 flex items-center bg-[#F8F5F0] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF9722_1px,transparent_1px)] bg-[length:40px_40px]" />

      <div className="max-w-5xl mx-auto px-5 md:px-6 relative z-10 w-full">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-[#E5E0D8] px-5 py-2 rounded-full mb-8 text-sm">
            <Sparkles className="w-4 h-4 text-[#D4AF97]" />
            <span className="font-medium text-[#2C2C2C]">Undangan Pernikahan Digital</span>
          </div>

          {/* Headline - Mobile friendly */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl leading-none font-semibold tracking-tighter text-[#2C2C2C] mb-8">
            Buat undangan pernikahan<br className="hidden md:block" />
            yang <span className="text-[#D4AF97]">elegan</span><br className="hidden md:block" />
            dalam hitungan menit
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-[#6B6B6B] max-w-2xl mx-auto mb-12 leading-relaxed px-4">
            Desain modern yang cantik, sistem RSVP real-time, 
            dan pembayaran mudah via QRIS. Semua dalam satu platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <Link href="/register" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="btn-primary text-base md:text-lg px-10 py-7 rounded-2xl font-medium w-full flex items-center justify-center gap-3 group"
              >
                Buat Undangan Gratis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="#harga" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base md:text-lg px-10 py-7 rounded-2xl border-[#D4AF97] text-[#2C2C2C] hover:bg-white w-full"
              >
                Lihat Paket Harga
              </Button>
            </Link>
          </div>

          {/* Trust Signals - Mobile friendly */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-[#6B6B6B] px-4">
            <div className="flex items-center justify-center gap-2">
              <span className="text-[#D4AF97]">✓</span> 
              Gratis untuk dicoba
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-[#D4AF97]">✓</span> 
              Ribuan pasangan Indonesia
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-[#D4AF97]">✓</span> 
              Pembayaran QRIS + WA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}