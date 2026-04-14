"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowLeft, CheckCircle2 } from "lucide-react"
import qrisImage from "@/assets/qris.jpeg"

interface PaymentModalProps {
  isOpen: boolean
  onClose: (open: boolean) => void
  userData: {
    nama: string
    email: string
  }
}

export function PaymentModal({ isOpen, onClose, userData }: PaymentModalProps) {
  const router = useRouter()

  const handleWhatsAppChat = () => {
    const adminNumber = "088290483433" // Ganti dengan nomor admin Anda
    const message = `Halo Admin Undang Dong, saya telah melakukan pembayaran.\n\n` +
                    `Detail Akun:\n` +
                    `- Nama: ${userData.nama}\n` +
                    `- Email: ${userData.email}\n\n` +
                    `Mohon verifikasi pembayaran saya untuk aktivasi akun. Terima kasih.`
    
    const url = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader className="items-center text-center">
          <div className="bg-[#D4AF97]/10 p-3 rounded-full mb-2">
            <CheckCircle2 className="size-6 text-[#D4AF97]" />
          </div>
          <DialogTitle className="text-2xl">Satu Langkah Lagi!</DialogTitle>
          <DialogDescription className="text-center">
            Pendaftaran Anda berhasil. Silakan lakukan pembayaran via QRIS untuk mengaktifkan akun Anda.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-4">
          {/* QRIS Container */}
          <div className="relative group overflow-hidden rounded-2xl border-4 border-[#F0EDE6] shadow-inner p-2 bg-white">
            <Image 
              src={qrisImage} 
              alt="QRIS Undang Dong" 
              width={250} 
              height={250}
              className="rounded-lg grayscale-[0.2] group-hover:grayscale-0 transition-all duration-300"
            />
          </div>

          <div className="text-center space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF97]">Instruksi</p>
            <p className="text-sm text-[#6B6B6B] leading-relaxed px-4">
              Setelah transfer, klik tombol di bawah untuk mengirim bukti pembayaran. Admin akan memverifikasi dan mengaktifkan akun Anda dalam **1x24 jam**.
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col gap-3 sm:flex-col">
          <Button 
            onClick={handleWhatsAppChat}
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white border-none h-12"
          >
            <MessageCircle className="mr-2 size-5 fill-current" />
            Kirim Bukti via WhatsApp
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full text-[#6B6B6B]"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="mr-2 size-4" />
            Kembali ke Beranda
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}