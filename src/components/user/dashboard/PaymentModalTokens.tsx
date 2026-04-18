"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import qrisImage from "@/assets/qris.jpeg";

interface PaymentModalTokensProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  tokenAmount: number;
  totalPrice: number;
}

export function PaymentModalTokens({
  isOpen,
  onClose,
  tokenAmount,
  totalPrice,
}: PaymentModalTokensProps) {
  const router = useRouter();

  const handleWhatsAppChat = () => {
    const adminNumber = "6288290483433";

    const message =
      `Halo Admin Undang Dong, saya telah melakukan pembayaran.\n\n` +
      `*Detail Pembelian Token*:\n` +
      `- Jumlah Token: ${tokenAmount}\n` +
      `- Total Harga: Rp ${totalPrice.toLocaleString("id-ID")}\n\n` +
      `Mohon verifikasi pembayaran saya untuk penambahan token. Terima kasih.`;

    const url = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-[450px] max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <div className="flex flex-col h-full overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-[#D4AF97]">
          <DialogHeader className="items-center text-center pb-4">
            <div className="bg-[#D4AF97]/10 p-3 rounded-full mb-2">
              <CheckCircle2 className="size-6 text-[#D4AF97]" />
            </div>
            <DialogTitle className="text-2xl">
              Konfirmasi Pembayaran
            </DialogTitle>
            <DialogDescription className="text-center text-[#6B6B6B]">
              Silakan pembayaran sebesar{" "}
              <span className="font-bold text-[#D4AF97]">
                Rp {totalPrice.toLocaleString("id-ID")}
              </span>{" "}
              untuk menambah token Anda.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center gap-6 py-2">
            {/* Token Summary */}
            <div className="w-full bg-gradient-to-br from-[#F6EEE6] via-[#F8F3EE] to-[#FDF8F4] border border-[#E5E0D8] rounded-2xl p-4">
              <div className="flex justify-center mb-3">
                <div className="bg-white rounded-xl px-4 py-2 border border-[#D4AF97]/20">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#6B6B6B]">
                    Token yang Dibeli
                  </p>
                  <p className="text-3xl font-bold text-[#D4AF97] text-center mt-1">
                    {tokenAmount}
                  </p>
                </div>
              </div>
              <div className="text-center text-xs text-[#6B6B6B]">
                Harga:{" "}
                <span className="font-bold">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            {/* QRIS Container */}
            <div className="relative group overflow-hidden rounded-2xl border-4 border-[#F0EDE6] shadow-inner p-2 bg-white w-full max-w-[280px]">
              <Image
                src={qrisImage}
                alt="QRIS Undang Dong"
                layout="responsive"
                width={250}
                height={250}
                className="rounded-lg"
              />
            </div>

            <div className="text-center space-y-2 pb-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF97]">
                Instruksi Pembayaran
              </p>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">
                Scan QRIS di atas menggunakan aplikasi bank Anda. Klik tombol di
                bawah untuk kirim bukti transfer via WhatsApp. Token aktif
                maksimal dalam **1x24 jam**.
              </p>
            </div>
          </div>

          <DialogFooter className="flex-col gap-3 sm:flex-col mt-auto pt-4 border-t border-[#E5E0D8]">
            <Button
              onClick={handleWhatsAppChat}
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white border-none h-12 rounded-xl"
            >
              <MessageCircle className="mr-2 size-5 fill-current" />
              Kirim Bukti via WhatsApp
            </Button>

            <Button
              variant="ghost"
              className="w-full text-[#6B6B6B] h-10"
              onClick={() => onClose(false)}
            >
              <ArrowLeft className="mr-2 size-4" />
              Kembali
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
