// components/home/Testimonials.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

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
    <section id="testimoni" className="py-24 bg-[#F8F5F0] border-t border-[#E5E0D8]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#D4AF97] text-sm font-medium tracking-widest">APA KATA MEREKA</span>
          <h2 className="text-4xl md:text-5xl font-semibold text-[#2C2C2C] mt-4 tracking-tight">
            Cerita dari pasangan yang<br className="hidden md:block" /> sudah menggunakan UndanganKu
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-premium p-8 flex flex-col h-full">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D4AF97] text-[#D4AF97]" />
                ))}
              </div>

              <CardContent className="flex-1 p-0">
                <p className="text-[#2C2C2C] leading-relaxed italic mb-8">
                  “{testimonial.message}”
                </p>
              </CardContent>

              <div className="flex items-center gap-4 pt-6 border-t border-[#E5E0D8]">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#E5E0D8]"
                />
                <div>
                  <p className="font-medium text-[#2C2C2C]">{testimonial.name}</p>
                  <p className="text-sm text-[#6B6B6B]">{testimonial.date}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 text-sm text-[#6B6B6B]">
          Bergabunglah dengan ribuan pasangan Indonesia yang telah mempercayai kami
        </div>
      </div>
    </section>
  );
}