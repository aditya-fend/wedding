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
import {
  MessageCircle,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  QrCode,
} from "lucide-react";
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
      <DialogContent className="max-w-[95vw] sm:max-w-[460px] rounded-[2.5rem] p-0 overflow-hidden border-[#F0EDE6] shadow-2xl">
        <div className="flex flex-col h-full max-h-[90vh] overflow-y-auto p-8 no-scrollbar">
          <DialogHeader className="items-center text-center pb-6 space-y-2">
            <div className="bg-[#D4AF97]/10 p-3 rounded-2xl border border-[#D4AF97]/20 mb-2">
              <ShieldCheck className="size-6 text-[#D4AF97]" />
            </div>
            <DialogTitle className="text-2xl font-black text-[#2C2C2C] tracking-tighter">
              Konfirmasi Pembayaran
            </DialogTitle>
            <DialogDescription className="text-sm font-medium text-[#6B6B6B] leading-relaxed px-4">
              Silakan selesaikan pembayaran sebesar{" "}
              <span className="font-bold text-[#D4AF97] bg-[#D4AF97]/5 px-2 py-0.5 rounded-lg">
                Rp {totalPrice.toLocaleString("id-ID")}
              </span>{" "}
              untuk aktivasi token instan.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center gap-8 py-2">
            {/* Token Summary Card */}
            <div className="w-full bg-[#FDFCFB] border border-[#F0EDE6] rounded-[2rem] p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <QrCode className="size-20" />
              </div>

              <div className="flex flex-col items-center relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9B9B9B] mb-2">
                  Paket Token Terpilih
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-[#2C2C2C] tracking-tighter">
                    {tokenAmount}
                  </span>
                  <span className="text-xs font-black text-[#D4AF97] uppercase tracking-widest">
                    Tokens
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-[#F0EDE6] w-full text-center">
                  <p className="text-[10px] font-bold text-[#9B9B9B] uppercase tracking-widest italic">
                    Final Amount: Rp {totalPrice.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>

            {/* QRIS Display */}
            <div className="space-y-4 w-full flex flex-col items-center">
              <div className="relative p-3 bg-white rounded-[2rem] border-4 border-[#FDFCFB] shadow-xl shadow-[#D4AF97]/10 w-full max-w-[260px]">
                <div className="absolute inset-0 border border-[#F0EDE6] rounded-[1.8rem] pointer-events-none" />
                <Image
                  src={qrisImage}
                  alt="QRIS Undang Dong"
                  width={250}
                  height={250}
                  className="rounded-[1.2rem] grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-[#FDFCFB] border border-[#F0EDE6] rounded-full">
                <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[9px] font-black uppercase tracking-widest text-[#9B9B9B]">
                  Metode: QRIS Real-Time Payment
                </p>
              </div>
            </div>

            {/* Instructions */}
            <div className="text-center space-y-3 px-2">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF97]">
                Langkah Verifikasi
              </h4>
              <p className="text-xs text-[#6B6B6B] leading-relaxed font-medium">
                1. Scan QRIS di atas melalui aplikasi Mobile Banking/E-Wallet.
                <br />
                2. Simpan bukti transfer Anda.
                <br />
                3. Klik tombol hijau di bawah untuk konfirmasi ke Admin.
                <br />
                <span className="text-[10px] mt-2 block italic opacity-70">
                  *Token akan login secara otomatis setelah divalidasi.
                </span>
              </p>
            </div>
          </div>

          <DialogFooter className="flex flex-col gap-3 mt-8 p-6 border-t border-[#F0EDE6]">
            <Button
              onClick={handleWhatsAppChat}
              className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-black text-xs uppercase tracking-widest h-14 rounded-2xl shadow-lg shadow-[#25D366]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <MessageCircle className="size-5 fill-current" />
              Kirim Bukti Bayar
            </Button>

            <Button
              variant="ghost"
              className="w-full text-[10px] font-black uppercase tracking-[0.2em] text-[#9B9B9B] hover:text-[#D4AF97] hover:bg-transparent transition-colors"
              onClick={() => onClose(false)}
            >
              <ArrowLeft className="mr-2 size-3" />
              Batalkan Transaksi
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
