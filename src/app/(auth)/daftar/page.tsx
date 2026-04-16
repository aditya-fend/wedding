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
  Crown
} from "lucide-react";
import { PaymentModal } from "@/components/user/pay/modal-pembayaran";
import { cn } from "@/lib/utils";

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
    e.stopPropagation();
    setShowPaymentModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const toggleExpand = (name: string) => {
    setExpandedPackage(expandedPackage === name ? null : name);
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-120 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-[#2C2C2C]">Undang Dong</h1>
          <p className="text-muted-foreground text-sm">Wujudkan undangan pernikahan impian Anda</p>
        </div>

        <Card className="border-border shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-white border-b border-border/50 pb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF97]">
                Langkah {step} dari 2
              </span>
              {step === 2 && (
                <button onClick={prevStep} className="text-xs flex items-center text-muted-foreground hover:text-[#2C2C2C]">
                  <ChevronLeft className="size-3 mr-1" /> Kembali
                </button>
              )}
            </div>
            <CardTitle className="text-2xl font-semibold text-[#2C2C2C]">
              {step === 1 ? "Pilih Paket Anda" : "Data Akun"}
            </CardTitle>
            <CardDescription className="text-[#6B6B6B]">
              {step === 1 ? "Pilih layanan yang paling sesuai dengan kebutuhan pernikahan Anda." : "Lengkapi detail untuk pembuatan akun otomatis."}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            {step === 1 ? (
              /* STEP 1: PILIH PAKET */
              <div className="space-y-3">
                {packages.map((pkg) => (
                  <div 
                    key={pkg.name}
                    className={cn(
                      "group border rounded-xl transition-all duration-200 cursor-pointer overflow-hidden",
                      selectedPackage === pkg.name 
                        ? "border-[#D4AF97] bg-[#F8F5F0]/50 ring-1 ring-[#D4AF97]" 
                        : "border-[#E5E0D8] bg-white hover:border-[#D4AF97]/50"
                    )}
                    onClick={(e) => {setSelectedPackage(pkg.name); e.stopPropagation(); toggleExpand(pkg.name);}}
                  >
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "size-5 rounded-full border flex items-center justify-center transition-colors",
                          selectedPackage === pkg.name ? "border-[#D4AF97] bg-[#D4AF97]" : "border-[#E5E0D8]"
                        )}>
                          {selectedPackage === pkg.name && <div className="size-2 bg-white rounded-full" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-[#2C2C2C]">{pkg.name}</p>
                            {pkg.popular && (
                              <span className="bg-[#D4AF97] text-white text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Crown className="size-2" /> Populer
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#6B6B6B]">{pkg.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#2C2C2C]">Rp {pkg.price}</p>
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleExpand(pkg.name); }}
                          className="text-[#D4AF97] hover:bg-[#D4AF97]/10 rounded-full p-1 transition-colors"
                        >
                          {expandedPackage === pkg.name ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                        </button>
                      </div>
                    </div>

                    {expandedPackage === pkg.name && (
                      <div className="px-4 pb-4 pt-0 space-y-2 border-t border-[#E5E0D8]/30 mt-1">
                        <p className="text-[10px] font-bold text-[#6B6B6B] uppercase pt-3">Fitur yang didapat:</p>
                        {pkg.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-2 text-xs text-[#6B6B6B]">
                            <CheckCircle2 className="size-3 text-[#D4AF97]" />
                            {feat}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Button onClick={nextStep} className="w-full h-12 mt-4 btn-primary" size="lg">
                  Lanjut ke Data Diri <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            ) : (
              /* STEP 2: FORM DATA DIRI */
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input id="nama" placeholder="Contoh: Aditya Tri Susanto" value={formData.nama} onChange={handleInputChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="nama@email.com" value={formData.email} onChange={handleInputChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">Nomor WhatsApp</Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#6B6B6B] font-medium border-r border-[#E5E0D8] pr-3">+62</span>
                    <Input id="whatsapp" type="tel" placeholder="81234567890" className="pl-16" value={formData.whatsapp} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="bg-[#F0EDE6]/50 border border-[#D4AF97]/30 p-4 rounded-xl flex gap-3">
                  <InfoIcon className="w-5 h-5 text-[#D4AF97] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-[#2C2C2C]">Informasi Akun</p>
                    <p className="text-xs leading-relaxed text-[#6B6B6B]">
                      Kata sandi Anda akan dibuatkan secara otomatis oleh sistem setelah pembayaran paket <strong>{selectedPackage}</strong> terverifikasi.
                    </p>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 text-base mt-2 btn-primary" size="lg">
                  Selesaikan Pendaftaran <ArrowRight className="ml-2 size-4" />
                </Button>
              </form>
            )}

            <div className="pt-4 text-center border-t border-[#E5E0D8]/50">
              <p className="text-sm text-[#6B6B6B]">
                Sudah punya akun?{" "}
                <Link href="/masuk" className="text-[#D4AF97] font-semibold hover:underline">Masuk di sini</Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-[#6B6B6B]">
          &copy; {new Date().getFullYear()} UndangDong. Semua hak cipta
          dilindungi.
        </p>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={setShowPaymentModal}
        userData={{
          nama: formData.nama,
          email: formData.email,
          package: selectedPackage // Kita kirim data paket ke modal
        }}
      />
    </div>
  );
}