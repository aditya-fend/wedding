// components/home/Pricing.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const packages = [
  {
    name: "Basic",
    price: "49.900",
    description: "Untuk pernikahan sederhana",
    features: [
      "1 Template pilihan",
      "Custom nama & tanggal",
      "Link undangan unik",
      "RSVP dasar",
      "Support via chat",
    ],
    popular: false,
  },
  {
    name: "Standard",
    price: "99.900",
    description: "Paling populer untuk pasangan",
    features: [
      "Semua fitur Basic",
      "Galeri foto hingga 15 gambar",
      "Musik latar belakang",
      "RSVP lengkap + pesan tamu",
      "Prioritas support",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "199.000",
    description: "Pengalaman undangan mewah",
    features: [
      "Semua fitur Standard",
      "Video background",
      "Cerita pengantin (Story)",
      "Galeri foto tanpa batas",
      "Desain custom khusus",
      "Support prioritas 24 jam",
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="harga" className="py-24 bg-white border-t border-[#E5E0D8]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#D4AF97] text-sm font-medium tracking-widest">PAKET HARGA</span>
          <h2 className="text-4xl md:text-5xl font-semibold text-[#2C2C2C] mt-4 tracking-tight">
            Pilih paket yang sesuai<br className="hidden md:block" /> dengan kebutuhanmu
          </h2>
          <p className="text-[#6B6B6B] mt-4 max-w-md mx-auto">
            Semua paket sudah termasuk link unik, sistem RSVP, dan dukungan teknis.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <Card 
              key={index}
              className={`card-premium relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${pkg.popular ? 'border-[#D4AF97] shadow-lg' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF97] text-[#2C2C2C] text-xs font-semibold px-6 py-1 rounded-full">
                  PALING POPULER
                </div>
              )}

              <CardHeader className="text-center pt-10 pb-8">
                <CardTitle className="text-3xl font-semibold text-[#2C2C2C]">{pkg.name}</CardTitle>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-[#2C2C2C]">Rp {pkg.price}</span>
                  <span className="text-sm text-[#6B6B6B]"> / sekali bayar</span>
                </div>
                <p className="text-[#6B6B6B] mt-2 text-sm">{pkg.description}</p>
              </CardHeader>

              <CardContent className="px-8 pb-10">
                <ul className="space-y-4 mb-10">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#2C2C2C]">
                      <Check className="w-5 h-5 text-[#D4AF97] mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/register" className="block">
                  <Button 
                    className={`w-full py-7 text-base font-medium rounded-2xl ${pkg.popular ? 'bg-[#D4AF97] text-[#2C2C2C] hover:bg-[#E8C8A0]' : 'bg-white border border-[#D4AF97] text-[#2C2C2C] hover:bg-[#F8F5F0]'}`}
                  >
                    Pilih Paket {pkg.name}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 text-sm text-[#6B6B6B]">
          Semua harga sudah termasuk PPN • Pembayaran via QRIS • Konfirmasi manual via WhatsApp
        </div>
      </div>
    </section>
  );
}