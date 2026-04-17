// FinalCTA.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-[#E5E0D8]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Badge - Ditambahkan whitespace-nowrap agar teks tidak turun di layar kecil */}
        <div className="inline-flex items-center gap-2 bg-[#F8F5F0] px-4 md:px-6 py-2 rounded-full mb-6">
          <span className="text-[#D4AF97] text-xs md:text-sm font-medium whitespace-nowrap">
            ✦ Siap untuk hari spesialmu?
          </span>
        </div>

        {/* Heading - Penyesuaian ukuran teks agar tidak 'makan tempat' di mobile */}
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-[#2C2C2C] leading-[1.1] mb-6 md:mb-8">
          Buat undangan pernikahan<br className="hidden md:block" /> 
          yang tak terlupakan hari ini
        </h2>

        <p className="text-lg md:text-xl text-[#6B6B6B] max-w-lg mx-auto mb-10 md:mb-12">
          Mulai gratis. Tanpa kartu kredit. 
          Ribuan pasangan Indonesia sudah mempercayai kami.
        </p>

        {/* Button Group - Optimasi padding agar pas di layar kecil */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/daftar" className="w-full sm:w-auto">
            <Button 
              size="lg" 
              className="btn-primary text-base md:text-lg px-8 md:px-12 py-6 md:py-7 rounded-2xl font-medium flex items-center justify-center gap-3 group w-full"
            >
              Buat Undangan Gratis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link href="/masuk" className="w-full sm:w-auto">
            <Button 
              size="lg" 
              variant="outline" 
              className="text-base md:text-lg px-8 md:px-12 py-6 md:py-7 rounded-2xl border-[#D4AF97] text-[#2C2C2C] hover:bg-[#F8F5F0] w-full"
            >
              Sudah Punya Akun? Masuk
            </Button>
          </Link>
        </div>

        {/* Footer Text */}
        <p className="text-xs md:text-sm text-[#6B6B6B] mt-10 opacity-80">
          Tidak ada biaya tersembunyi • Pembayaran sekali bayar • Support via WhatsApp
        </p>
      </div>
    </section>
  );
}