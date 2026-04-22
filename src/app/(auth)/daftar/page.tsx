"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InfoIcon,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  Crown,
} from "lucide-react";
import { PaymentModal } from "@/components/user/pay/modal-pembayaran";
import { cn } from "@/lib/utils";

const packages = [
  {
    name: "Basic",
    price: "49.900",
    description: "Esensial untuk awal yang indah",
    features: ["1 Template pilihan", "Custom nama & tanggal", "Link unik", "RSVP dasar"],
    popular: false,
  },
  {
    name: "Standard",
    price: "99.900",
    description: "Paling populer untuk pasangan",
    features: ["Semua fitur Basic", "Galeri 15 foto", "Musik latar", "Pesan tamu"],
    popular: true,
  },
  {
    name: "Premium",
    price: "199.000",
    description: "Pengalaman mewah tanpa batas",
    features: ["Semua fitur Standard", "Video background", "Cerita pengantin", "Support 24 jam"],
    popular: false,
  },
];

export default function DaftarPage() {
  const [step, setStep] = React.useState(1);
  const [selectedPackage, setSelectedPackage] = React.useState("Basic");
  const [expandedPackage, setExpandedPackage] = React.useState<string | null>("Basic");
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [formData, setFormData] = React.useState({
    nama: "",
    email: "",
    whatsapp: "",
  });

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPaymentModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block font-bold text-2xl tracking-tighter text-[#2C2C2C]">
            Undang<span className="text-[#D4AF97]">Dong</span>
          </Link>
          <p className="text-[#9B9B9B] text-[10px] font-bold uppercase tracking-[0.2em]">
            Step {step} of 2 • Registration
          </p>
        </div>

        <Card className="border-[#F0EDE6] shadow-xl shadow-[#D4AF97]/5 rounded-[2rem] overflow-hidden bg-white">
          <CardHeader className="bg-[#FDFCFB] border-b border-[#F0EDE6] p-6 md:p-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-1">
                {[1, 2].map((i) => (
                  <div key={i} className={cn("h-1 rounded-full transition-all duration-300", step === i ? "w-8 bg-[#D4AF97]" : "w-4 bg-[#E5E0D8]")} />
                ))}
              </div>
              {step === 2 && (
                <button onClick={prevStep} className="text-[10px] font-bold uppercase tracking-widest text-[#9B9B9B] hover:text-[#D4AF97] flex items-center transition-colors">
                  <ChevronLeft className="size-3 mr-1" /> Back
                </button>
              )}
            </div>
            <CardTitle className="text-xl md:text-2xl font-bold text-[#2C2C2C] tracking-tight">
              {step === 1 ? "Pilih Paket" : "Detail Akun"}
            </CardTitle>
            <CardDescription className="text-xs md:text-sm text-[#6B6B6B]">
              {step === 1 ? "Tentukan layanan yang paling sesuai dengan kebutuhan Anda." : "Lengkapi informasi di bawah untuk aktivasi instan."}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 md:p-8 space-y-6">
            {step === 1 ? (
              <div className="space-y-3">
                {packages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className={cn(
                      "group border rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden relative",
                      selectedPackage === pkg.name ? "border-[#D4AF97] bg-[#FDFCFB] shadow-md shadow-[#D4AF97]/10" : "border-[#F0EDE6] hover:border-[#D4AF97]/40"
                    )}
                    onClick={() => {
                      setSelectedPackage(pkg.name);
                      setExpandedPackage(expandedPackage === pkg.name ? null : pkg.name);
                    }}
                  >
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={cn("size-5 rounded-full border-2 flex items-center justify-center transition-all", selectedPackage === pkg.name ? "border-[#D4AF97] bg-[#D4AF97]" : "border-[#E5E0D8]")}>
                          {selectedPackage === pkg.name && <div className="size-1.5 bg-white rounded-full animate-in zoom-in duration-300" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-[#2C2C2C]">{pkg.name}</p>
                            {pkg.popular && <span className="bg-[#D4AF97] text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter italic">Most Popular</span>}
                          </div>
                          <p className="text-[11px] text-[#9B9B9B] font-medium">{pkg.description}</p>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-[#2C2C2C]">Rp {pkg.price}</p>
                    </div>

                    <div className={cn("px-4 overflow-hidden transition-all duration-500 ease-in-out", expandedPackage === pkg.name ? "max-h-40 pb-4 opacity-100" : "max-h-0 opacity-0")}>
                      <div className="pt-2 border-t border-[#F0EDE6] grid grid-cols-2 gap-2">
                        {pkg.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-1.5 text-[10px] text-[#6B6B6B] font-medium">
                            <CheckCircle2 className="size-2.5 text-[#D4AF97]" /> {feat}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <Button onClick={nextStep} className="w-full h-12 mt-4 bg-[#D4AF97] hover:bg-[#B99575] text-white font-bold rounded-xl text-sm transition-all" size="lg">
                  Lanjutkan <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="nama" className="text-[11px] font-bold uppercase tracking-widest text-[#2C2C2C]">Nama Lengkap</Label>
                    <Input id="nama" placeholder="Aditya Tri Susanto" value={formData.nama} onChange={handleInputChange} required className="h-11 rounded-xl border-[#F0EDE6] focus:border-[#D4AF97] focus:ring-[#D4AF97]/10" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-[11px] font-bold uppercase tracking-widest text-[#2C2C2C]">Alamat Email</Label>
                    <Input id="email" type="email" placeholder="hello@email.com" value={formData.email} onChange={handleInputChange} required className="h-11 rounded-xl border-[#F0EDE6] focus:border-[#D4AF97] focus:ring-[#D4AF97]/10" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="whatsapp" className="text-[11px] font-bold uppercase tracking-widest text-[#2C2C2C]">WhatsApp</Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#9B9B9B]">+62</span>
                      <Input id="whatsapp" type="tel" placeholder="812-3456-7890" className="pl-12 h-11 rounded-xl border-[#F0EDE6]" value={formData.whatsapp} onChange={handleInputChange} required />
                    </div>
                  </div>
                </div>

                <div className="bg-[#FDFCFB] border border-[#F0EDE6] p-4 rounded-2xl flex gap-3">
                  <InfoIcon className="size-4 text-[#D4AF97] shrink-0" />
                  <p className="text-[11px] leading-relaxed text-[#6B6B6B] font-medium">
                    Sistem akan membuatkan password otomatis untuk paket <span className="font-bold text-[#D4AF97]">{selectedPackage}</span> setelah verifikasi.
                  </p>
                </div>

                <Button type="submit" className="w-full h-12 bg-[#D4AF97] hover:bg-[#B99575] text-white font-bold rounded-xl text-sm transition-all" size="lg">
                  Selesaikan Pendaftaran <ArrowRight className="ml-2 size-4" />
                </Button>
              </form>
            )}

            <div className="pt-6 text-center border-t border-[#F0EDE6]">
              <p className="text-xs text-[#9B9B9B] font-medium">
                Sudah punya akun?{" "}
                <Link href="/masuk" className="text-[#D4AF97] font-bold hover:underline">Masuk</Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-[10px] font-bold text-[#9B9B9B] uppercase tracking-widest">
          © 2026 SajiJanji • Secure Registration
        </p>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={setShowPaymentModal}
        userData={{ nama: formData.nama, email: formData.email, package: selectedPackage }}
      />
    </div>
  );
}