// components/home/FinalCTA.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-28 bg-white border-t border-[#E5E0D8]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-[#F8F5F0] px-6 py-2 rounded-full mb-6">
          <span className="text-[#D4AF97] text-sm font-medium">✦ Siap untuk hari spesialmu?</span>
        </div>

        <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter text-[#2C2C2C] leading-none mb-8">
          Buat undangan pernikahan<br /> 
          yang tak terlupakan hari ini
        </h2>

        <p className="text-xl text-[#6B6B6B] max-w-lg mx-auto mb-12">
          Mulai gratis. Tidak ada kartu kredit. 
          Ribuan pasangan Indonesia sudah mempercayai kami.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button 
              size="lg" 
              className="btn-primary text-lg px-12 py-7 rounded-2xl font-medium flex items-center gap-3 group w-full sm:w-auto"
            >
              Buat Undangan Gratis Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link href="/login">
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-12 py-7 rounded-2xl border-[#D4AF97] text-[#2C2C2C] hover:bg-[#F8F5F0] w-full sm:w-auto"
            >
              Sudah Punya Akun? Masuk
            </Button>
          </Link>
        </div>

        <p className="text-sm text-[#6B6B6B] mt-10">
          Tidak ada biaya tersembunyi • Pembayaran sekali bayar • Support via WhatsApp
        </p>
      </div>
    </section>
  );
}