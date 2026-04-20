// components/home/Pricing.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const packages = [
  {
    name: "Basic",
    price: "49.900",
    description: "Esensial untuk undangan digital.",
    features: [
      "10 Token / 1 Template",
      "Galeri 10 foto",
      "Custom nama & tanggal",
      "Link unik & Musik latar",
      "RSVP standar",
    ],
    popular: false,
  },
  {
    name: "Standard",
    price: "99.900",
    description: "Pilihan favorit para pasangan.",
    features: [
      "Semua fitur Basic",
      "Galeri hingga 20 foto",
      "RSVP + Pesan tamu",
      "Masa aktif selamanya",
      "Prioritas dukungan",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "199.000",
    description: "Fitur terlengkap tanpa batas.",
    features: [
      "Semua fitur Standard",
      "Video & Wedding Story",
      "Galeri foto tanpa batas",
      "Desain custom khusus",
      "Dukungan prioritas 24/7",
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section
      id="harga"
      className="py-12 md:py-16 bg-white border-t border-[#F0EDE6]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-[#D4AF97] text-[10px] font-bold tracking-[0.25em] uppercase">
            Pricing Plans
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mt-2 tracking-tight">
            Pilih Paket Terbaik
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={cn(
                "relative overflow-visible flex flex-col border-[#E5E0D8] rounded-2xl transition-all duration-300",
                pkg.popular
                  ? "border-[#D4AF97] shadow-lg shadow-[#D4AF97]/5 scale-[1.01] z-20"
                  : "shadow-sm border-opacity-60",
              )}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
                  <span className="bg-[#D4AF97] text-white text-[8px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-tighter shadow-sm">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center pt-7 pb-3">
                <CardTitle className="text-sm font-black text-[#2C2C2C] uppercase tracking-widest opacity-80">
                  {pkg.name}
                </CardTitle>
                <div className="mt-3 flex flex-col items-center">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-[10px] font-bold text-[#2C2C2C]">
                      Rp
                    </span>
                    <span className="text-2xl md:text-3xl font-black text-[#2C2C2C] tracking-tighter">
                      {pkg.price}
                    </span>
                  </div>
                  <span className="text-[9px] text-[#9B9B9B] mt-0.5 font-semibold italic">
                    / once
                  </span>
                </div>
              </CardHeader>

              <CardContent className="px-5 pb-6 flex-grow flex flex-col">
                <p className="text-[#6B6B6B] text-[11px] text-center mb-5 min-h-[32px] leading-snug">
                  {pkg.description}
                </p>

                <ul className="space-y-2.5 mb-6 flex-grow border-t border-[#F0EDE6] pt-5">
                  {pkg.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[11px] text-[#2C2C2C] leading-tight font-medium"
                    >
                      <Check className="w-3 h-3 text-[#D4AF97] mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "w-full h-9 text-[10px] font-bold rounded-lg transition-all",
                    pkg.popular
                      ? "bg-[#D4AF97] text-white hover:bg-[#B99575]"
                      : "bg-[#FDFCFB] border border-[#E5E0D8] text-[#2C2C2C] hover:bg-[#F0EDE6]",
                  )}
                >
                  Pilih {pkg.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center mt-8 text-[9px] text-[#9B9B9B] font-bold uppercase tracking-[0.2em] opacity-60">
          QRIS • WHATSAPP • AUTO-CONFIRM
        </p>
      </div>
    </section>
  );
}
