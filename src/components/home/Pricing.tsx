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
    <section id="harga" className="py-20 md:py-28 bg-white border-t border-[#E5E0D8]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[#D4AF97] text-xs md:text-sm font-medium tracking-[0.2em] uppercase">PAKET HARGA</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-[#2C2C2C] mt-4 tracking-tight leading-tight">
            Pilih paket yang sesuai<br className="hidden md:block" /> dengan kebutuhanmu
          </h2>
          <p className="text-[#6B6B6B] mt-4 max-w-md mx-auto text-sm md:text-base px-4">
            Semua paket sudah termasuk link unik, sistem RSVP, dan dukungan teknis.
          </p>
        </div>

        {/* Perbaikan Grid: ganti md:grid-cols-3 menjadi lg:grid-cols-3 agar di tablet tidak sesak */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {packages.map((pkg, index) => (
            <Card 
              key={index}
              className={`relative flex flex-col h-full border-[#E5E0D8] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 
                ${pkg.popular ? 'border-[#D4AF97] shadow-lg ring-1 ring-[#D4AF97]' : 'shadow-sm'}
                ${index === 2 ? 'md:col-span-2 lg:col-span-1' : '' /* Premium di tablet jadi lebar penuh */}
              `}
            >
              {/* PERBAIKAN BADGE: Gunakan top-0 dan hilangkan overflow-hidden jika perlu, atau ubah struktur */}
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 whitespace-nowrap">
                  <span className="bg-[#D4AF97] text-[#2C2C2C] text-[10px] md:text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                    PALING POPULER
                  </span>
                </div>
              )}

              <CardHeader className="text-center pt-12 pb-8">
                <CardTitle className="text-2xl md:text-3xl font-semibold text-[#2C2C2C]">{pkg.name}</CardTitle>
                <div className="mt-4 flex flex-col items-center">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-medium text-[#2C2C2C]">Rp</span>
                    {/* text-4xl di mobile agar tidak pecah */}
                    <span className="text-4xl md:text-5xl font-bold text-[#2C2C2C] tracking-tighter">
                      {pkg.price}
                    </span>
                  </div>
                  <span className="text-xs md:text-sm text-[#6B6B6B] mt-1 italic">/ sekali bayar</span>
                </div>
                <p className="text-[#6B6B6B] mt-3 text-sm px-4">{pkg.description}</p>
              </CardHeader>

              <CardContent className="px-6 md:px-8 pb-10 flex-grow flex flex-col">
                <ul className="space-y-4 mb-10 flex-grow">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-[13px] md:text-sm text-[#2C2C2C] leading-tight">
                      <Check className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF97] mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/register" className="block mt-auto">
                  <Button 
                    className={`w-full py-6 md:py-7 text-base font-medium rounded-xl md:rounded-2xl transition-all 
                      ${pkg.popular 
                        ? 'bg-[#D4AF97] text-white hover:bg-[#c49b7d] shadow-md' 
                        : 'bg-transparent border border-[#D4AF97] text-[#D4AF97] hover:bg-[#F8F5F0]'}`}
                  >
                    Pilih Paket {pkg.name}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 text-[10px] md:text-xs text-[#9B9B9B] leading-relaxed px-6">
          Semua harga sudah termasuk PPN • Pembayaran via QRIS • Konfirmasi otomatis via WhatsApp
        </div>
      </div>
    </section>
  );
}