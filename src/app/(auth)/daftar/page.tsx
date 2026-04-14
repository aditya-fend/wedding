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
import { InfoIcon, ArrowRight, CheckCircle2 } from "lucide-react";
// Import modal yang telah kita buat
import { PaymentModal } from "@/components/modal-pembayaran";

export default function DaftarPage() {
  // State untuk mengontrol modal
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);

  // State untuk menyimpan data input user guna dikirim ke WhatsApp
  const [formData, setFormData] = React.useState({
    nama: "",
    email: "",
    whatsapp: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Tambahkan ini untuk mencegah bubbling di mobile
    setShowPaymentModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center p-6">
      <div className="w-full max-w-[450px] space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-[#2C2C2C]">
            Undang Dong
          </h1>
          <p className="text-[#6B6B6B]">
            Wujudkan undangan pernikahan impian Anda
          </p>
        </div>

        <Card className="border-[#E5E0D8] shadow-xl rounded-2xl">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-[#2C2C2C]">
              Mulai Perjalanan Anda
            </CardTitle>
            <CardDescription className="text-[#6B6B6B]">
              Lengkapi data di bawah untuk membuat akun baru.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Lengkap</Label>
                <Input
                  id="nama"
                  placeholder="Contoh: Aditya Tri Susanto"
                  value={formData.nama}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp">Nomor WhatsApp</Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#6B6B6B] font-medium border-r border-[#E5E0D8] pr-3">
                    +62
                  </span>
                  <Input
                    id="whatsapp"
                    type="tel"
                    placeholder="81234567890"
                    className="pl-16"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="bg-[#F0EDE6]/50 border border-[#D4AF97]/30 p-4 rounded-xl flex gap-3">
                <InfoIcon className="w-5 h-5 text-[#D4AF97] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-[#2C2C2C]">
                    Informasi Akun
                  </p>
                  <p className="text-xs leading-relaxed text-[#6B6B6B]">
                    Kata sandi Anda akan dibuatkan secara otomatis oleh sistem
                    setelah pembayaran terverifikasi. [cite: 12] Detail login
                    akan dikirimkan ke Email dan WhatsApp Anda.
                  </p>
                </div>
              </div>

              <Button
                type="submit" // Pastikan ini submit agar fungsi handleSubmit terpanggil
                className="w-full h-12 text-base mt-2 btn-primary"
                size="lg"
              >
                Daftar Sekarang
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>

            <div className="relative pt-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#E5E0D8]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-[#6B6B6B]">Atau</span>
              </div>
            </div>

            <div className="pt-4 text-center">
              <p className="text-sm text-[#6B6B6B]">
                Sudah punya akun?{" "}
                <Link
                  href="/masuk"
                  className="text-[#D4AF97] font-semibold hover:underline"
                >
                  Masuk di sini
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-6">
          <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF97]" />
            Akses Selamanya [cite: 87]
          </div>
          <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF97]" />
            Template Premium [cite: 2, 87]
          </div>
        </div>
      </div>

      {/* Modal Pembayaran */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={setShowPaymentModal}
        userData={{
          nama: formData.nama,
          email: formData.email,
        }}
      />
    </div>
  );
}
