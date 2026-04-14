// components/home/Hero.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-[100dvh] pt-28 pb-16 md:pt-32 md:pb-24 flex items-center bg-[#F8F5F0] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF9722_1px,transparent_1px)] bg-[length:40px_40px]" />

      <div className="max-w-6xl mx-auto px-5 md:px-6 relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge - Responsive padding & font */}
          <div className="inline-flex items-center gap-2 bg-white border border-[#E5E0D8] px-4 md:px-5 py-2 rounded-full mb-6 md:mb-8 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 md:w-4 h-4 text-[#D4AF97]" />
            <span className="font-medium text-[#2C2C2C] text-xs md:text-sm whitespace-nowrap">
              Undangan Pernikahan Digital
            </span>
          </div>

          {/* Headline - Ukuran lebih adaptif */}
          <h1 className="text-[2.5rem] leading-[1.1] md:text-6xl lg:text-7xl font-semibold tracking-tighter text-[#2C2C2C] mb-6 md:mb-8">
            Buat undangan pernikahan<br className="hidden md:block" />
            yang <span className="text-[#D4AF97]">elegan</span><br className="hidden md:block" />
            dalam hitungan menit
          </h1>

          {/* Subheadline - Line height & size tweak */}
          <p className="text-base md:text-xl text-[#6B6B6B] max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed px-2 md:px-0">
            Desain modern yang cantik, sistem RSVP real-time, 
            dan pembayaran mudah via QRIS. Semua dalam satu platform.
          </p>

          {/* CTA Buttons - Optimasi tap area & mobile padding */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <Link href="/register" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="btn-primary text-base md:text-lg px-8 md:px-10 py-6 md:py-7 rounded-2xl font-medium w-full flex items-center justify-center gap-3 group"
              >
                Buat Undangan Gratis
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="#harga" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base md:text-lg px-8 md:px-10 py-6 md:py-7 rounded-2xl border-[#D4AF97] text-[#2C2C2C] hover:bg-white w-full bg-white/50 backdrop-blur-sm"
              >
                Lihat Paket Harga
              </Button>
            </Link>
          </div>

          {/* Trust Signals - Menggunakan Flex Wrap agar tidak bertumpuk di layar medium */}
          <div className="mt-12 md:mt-16 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-xs md:text-sm text-[#6B6B6B]">
            <div className="flex items-center gap-2">
              <span className="text-[#D4AF97] font-bold text-lg">✓</span> 
              Gratis untuk dicoba
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#D4AF97] font-bold text-lg">✓</span> 
              Ribuan pasangan Indonesia
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#D4AF97] font-bold text-lg">✓</span> 
              Pembayaran QRIS + WA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}