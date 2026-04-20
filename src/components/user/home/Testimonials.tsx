// components/home/Testimonials.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Rina & Andi",
    date: "Maret 2026",
    message: "UndanganKu sangat membantu! Desainnya cantik, tamu kami senang bisa RSVP langsung. Prosesnya cepat dan mudah.",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Sinta & Reza",
    date: "Februari 2026",
    message: "Kami sangat puas. Pembayaran via QRIS lancar, dan link undangannya elegan. Banyak tamu yang memuji desainnya.",
    avatar: "https://i.pravatar.cc/150?img=44",
  },
  {
    name: "Dewi & Fahmi",
    date: "Januari 2026",
    message: "RSVP real-time sangat berguna. Kami bisa tahu siapa yang datang tanpa repot menghubungi satu per satu. Sangat recommended!",
    avatar: "https://i.pravatar.cc/150?img=67",
  },
];

export default function Testimonials() {
  return (
    <section id="testimoni" className="py-16 md:py-20 bg-[#FDFCFB] border-t border-[#F0EDE6]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[#D4AF97] text-[10px] font-bold tracking-[0.3em] uppercase">
            Testimoni Pasangan
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mt-3 tracking-tight">
            Cerita Bahagia Mereka
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, index) => (
            <Card key={index} className="border-[#E5E0D8] bg-white p-6 rounded-2xl shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-3 fill-[#D4AF97] text-[#D4AF97]" />
                ))}
              </div>

              <CardContent className="flex-1 p-0">
                <p className="text-[#2C2C2C] text-[13px] leading-relaxed italic mb-6">
                  “{t.message}”
                </p>
              </CardContent>

              <div className="flex items-center gap-3 pt-5 border-t border-[#F0EDE6]">
                <div className="relative size-10 rounded-full overflow-hidden border border-[#E5E0D8]">
                  <img 
                    src={t.avatar} 
                    alt={t.name}
                    className="object-cover size-full"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#2C2C2C]">{t.name}</p>
                  <p className="text-[10px] text-[#9B9B9B] font-medium">{t.date}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-[10px] text-[#9B9B9B] font-bold uppercase tracking-[0.2em] opacity-70">
            Trusted by 2,000+ Happy Couples
          </p>
        </div>
      </div>
    </section>
  );
}