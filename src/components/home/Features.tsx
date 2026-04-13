// components/home/Features.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Calendar, Sparkles } from "lucide-react";

const features = [
  {
    icon: <Heart className="w-10 h-10 text-[#D4AF97]" />,
    title: "Desain Elegan",
    description: "Template modern dan klasik yang dirancang khusus untuk pernikahan Indonesia. Mudah dikustomisasi sesuai keinginan.",
  },
  {
    icon: <Users className="w-10 h-10 text-[#D4AF97]" />,
    title: "RSVP Real-time",
    description: "Tamu dapat mengkonfirmasi kehadiran langsung. Anda melihat daftar tamu dan jumlah yang hadir secara instan.",
  },
  {
    icon: <Calendar className="w-10 h-10 text-[#D4AF97]" />,
    title: "Pembayaran Mudah",
    description: "Bayar via QRIS dan konfirmasi bukti transfer melalui WhatsApp. Proses cepat dan transparan.",
  },
  {
    icon: <Sparkles className="w-10 h-10 text-[#D4AF97]" />,
    title: "Link Unik & Aman",
    description: "Setiap undangan memiliki link pribadi yang aman. Bisa dibagikan melalui WhatsApp, Instagram, atau media lain.",
  },
];

export default function Features() {
  return (
    <section id="fitur" className="py-24 bg-white border-t border-[#E5E0D8]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#D4AF97] text-sm font-medium tracking-widest">KENAPA MEMILIH KAMI</span>
          <h2 className="text-4xl md:text-5xl font-semibold text-[#2C2C2C] mt-4 tracking-tight">
            Semua yang Anda butuhkan<br className="hidden md:block" /> dalam satu platform
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="card-premium p-8 hover:shadow-md transition-all duration-300 group"
            >
              <div className="mb-8">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-[#2C2C2C] mb-4 group-hover:text-[#D4AF97] transition-colors">
                {feature.title}
              </h3>
              <p className="text-[#6B6B6B] leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}