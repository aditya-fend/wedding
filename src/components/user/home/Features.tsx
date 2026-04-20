// components/home/Features.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Calendar, Sparkles } from "lucide-react";

const features = [
  {
    icon: <Heart className="size-6 text-[#D4AF97]" />,
    title: "Desain Elegan",
    description: "Template modern dan klasik yang dirancang khusus untuk estetika pernikahan Indonesia.",
  },
  {
    icon: <Users className="size-6 text-[#D4AF97]" />,
    title: "RSVP Real-time",
    description: "Pantau daftar tamu dan konfirmasi kehadiran secara instan melalui dashboard pribadi.",
  },
  {
    icon: <Calendar className="size-6 text-[#D4AF97]" />,
    title: "Pembayaran Mudah",
    description: "Proses cepat via QRIS dengan konfirmasi otomatis untuk efisiensi persiapan Anda.",
  },
  {
    icon: <Sparkles className="size-6 text-[#D4AF97]" />,
    title: "Link Unik & Aman",
    description: "Setiap undangan memiliki link eksklusif yang aman untuk dibagikan ke seluruh sosial media.",
  },
];

export default function Features() {
  return (
    <section id="fitur" className="py-16 md:py-20 bg-white border-t border-[#F0EDE6]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[#D4AF97] text-[10px] font-bold tracking-[0.3em] uppercase">
            Keunggulan Platform
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mt-3 tracking-tight">
            Fitur Cerdas & Modern
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-[#E5E0D8] bg-[#FDFCFB]/50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="mb-5 inline-flex items-center justify-center size-12 rounded-xl bg-white border border-[#F0EDE6] shadow-sm group-hover:border-[#D4AF97]/30 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-sm font-bold text-[#2C2C2C] mb-2 group-hover:text-[#D4AF97] transition-colors">
                {feature.title}
              </h3>
              <p className="text-[12px] text-[#6B6B6B] leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}