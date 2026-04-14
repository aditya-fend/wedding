"use client"

import Image from "next/image"
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
    // Note: Untuk WA Me, pastikan angka dimulai dengan kode negara tanpa 0 (62882...)
    const adminNumber = "6288290483433" 
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
      <DialogContent 
        className="max-w-[95vw] sm:max-w-[450px] max-h-[90vh] flex flex-col p-0 overflow-hidden"
      >
        {/* Kontainer Scrollable agar DialogTitle & Footer tetap terlihat jika memungkinkan */}
        <div className="flex flex-col h-full overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-[#D4AF97]">
          
          <DialogHeader className="items-center text-center pb-4">
            <div className="bg-[#D4AF97]/10 p-3 rounded-full mb-2">
              <CheckCircle2 className="size-6 text-[#D4AF97]" />
            </div>
            <DialogTitle className="text-2xl">Satu Langkah Lagi!</DialogTitle>
            <DialogDescription className="text-center text-[#6B6B6B]">
              Pendaftaran berhasil. Silakan bayar via QRIS untuk aktivasi akun.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center gap-6 py-2">
            {/* QRIS Container - Ukuran responsif */}
            <div className="relative group overflow-hidden rounded-2xl border-4 border-[#F0EDE6] shadow-inner p-2 bg-white w-full max-w-[280px]">
              <Image 
                src={qrisImage} 
                alt="QRIS Undang Dong" 
                layout="responsive"
                width={250} 
                height={250}
                className="rounded-lg transition-all duration-300"
              />
            </div>

            <div className="text-center space-y-2 pb-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF97]">Instruksi Aktivasi</p>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">
                Klik tombol WhatsApp di bawah untuk kirim bukti. Akun aktif maksimal dalam **1x24 jam**.
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
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="mr-2 size-4" />
              Kembali ke Beranda
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}