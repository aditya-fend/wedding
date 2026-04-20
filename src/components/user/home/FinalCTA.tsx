// FinalCTA.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FinalCTA() {
  return (
    <section className="py-16 md:py-20 bg-white border-t border-[#F0EDE6]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        {/* Badge - Ramping dengan teks mikro */}
        <div className="inline-flex items-center bg-[#FDFCFB] border border-[#F0EDE6] px-4 py-1.5 rounded-full mb-6">
          <span className="text-[#D4AF97] text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap">
            ✦ Mulai Perjalanan Anda
          </span>
        </div>

        {/* Heading - Downscaled dari 6xl ke 3xl/4xl agar lebih rapi */}
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#2C2C2C] leading-tight mb-4">
          Wujudkan Undangan Digital <br className="hidden md:block" />
          Impian Anda Sekarang
        </h2>

        {/* Paragraph - Ukuran teks disesuaikan ke standar base/sm */}
        <p className="text-sm md:text-base text-[#6B6B6B] max-w-md mx-auto mb-10 leading-relaxed">
          Ribuan pasangan telah memulai momen bahagia mereka di sini. Cepat,
          mudah, dan selamanya berkesan.
        </p>

        {/* Button Group - Tinggi tombol dirampingkan ke h-12 */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link href="/register" className="w-full sm:w-auto">
            <Button className="h-12 px-8 rounded-xl bg-[#D4AF97] text-white hover:bg-[#B99575] text-sm font-bold shadow-lg shadow-[#D4AF97]/20 flex items-center justify-center gap-2 group w-full">
              Buat Undangan Gratis
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link href="/login" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="h-12 px-8 rounded-xl border-[#E5E0D8] text-[#2C2C2C] hover:bg-[#FDFCFB] text-sm font-bold w-full"
            >
              login ke Akun
            </Button>
          </Link>
        </div>

        {/* Micro Footer - Ukuran teks lebih kecil & elegan */}
        <p className="text-[10px] font-medium text-[#9B9B9B] mt-10 uppercase tracking-[0.15em]">
          No Credit Card Required • Lifetime Access • WhatsApp Support
        </p>
      </div>
    </section>
  );
}
