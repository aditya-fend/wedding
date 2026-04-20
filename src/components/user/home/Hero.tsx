// components/home/Hero.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="min-h-[100dvh] pt-28 pb-16 md:pt-40 md:pb-32 flex items-center bg-[#FDFCFB] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF9715_1px,transparent_1px)] bg-[length:32px_32px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[gradient-radial] from-[#F0EDE6]/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 bg-white/80 backdrop-blur-md border border-[#E5E0D8] px-4 py-2 rounded-full mb-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="w-4 h-4 text-[#D4AF97]" />
            <span className="font-semibold text-[#2C2C2C] text-[11px] md:text-xs uppercase tracking-widest">
              Undangan Pernikahan Digital Premium
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[2.75rem] leading-[1.1] md:text-7xl lg:text-8xl font-bold tracking-tight text-[#2C2C2C] mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
            Abadikan momen <br className="hidden sm:block" />
            <span className="text-[#D4AF97] italic font-serif font-medium">
              bahagia
            </span>{" "}
            Anda dengan elegan
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-xl text-[#6B6B6B] max-w-2xl mx-auto mb-12 leading-relaxed px-2 md:px-0 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Solusi undangan digital modern dengan sistem RSVP otomatis,
            integrasi kado digital, dan manajemen tamu dalam satu genggaman.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            <Link href="/register" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-[#D4AF97] hover:bg-[#B99575] text-white text-base md:text-lg px-10 py-7 rounded-2xl font-bold w-full flex items-center justify-center gap-3 group shadow-xl shadow-[#D4AF97]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Mulai Buat Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="#template" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="text-base md:text-lg px-10 py-7 rounded-2xl border-[#E5E0D8] text-[#2C2C2C] hover:bg-[#F0EDE6]/30 w-full bg-white/50 backdrop-blur-sm transition-all hover:border-[#D4AF97]/50"
              >
                Lihat Template
              </Button>
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="mt-16 pt-8 border-t border-[#E5E0D8]/50 flex flex-wrap justify-center items-center gap-x-10 gap-y-4 animate-in fade-in duration-1000 delay-700">
            {["Coba Gratis", "RSVP & Angpao Digital", "Aktif Selamanya"].map(
              (text) => (
                <div key={text} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF97]" />
                  <span className="text-sm font-semibold text-[#2C2C2C]/80 tracking-tight">
                    {text}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
