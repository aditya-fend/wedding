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
import { MessageCircle, ArrowLeft, CheckCircle2, QrCode, ShieldCheck } from "lucide-react"
import qrisImage from "@/assets/qris.jpeg"
import { cn } from "@/lib/utils"

interface PaymentModalProps {
  isOpen: boolean
  onClose: (open: boolean) => void
  userData: {
    nama: string
    email: string
    package: string
  }
}

export function PaymentModal({ isOpen, onClose, userData }: PaymentModalProps) {
  const router = useRouter()

  const handleWhatsAppChat = () => {
    const adminNumber = "6288290483433" 
    const message = `Halo Admin Undang Dong, saya telah melakukan pembayaran.\n\n` +
                    `*Detail Akun*:\n` +
                    `- Nama: ${userData.nama}\n` +
                    `- Email: ${userData.email}\n` +
                    `- Paket: *${userData.package}*\n\n` +
                    `Mohon verifikasi pembayaran saya untuk aktivasi akun. Terima kasih.`
    
    const url = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "max-w-[92vw] sm:max-w-[440px] p-0 overflow-hidden border-none shadow-2xl",
          "max-h-[95vh] sm:max-h-fit" // Fleksibel di mobile agar tidak terpotong
        )}
      >
        {/* Scrollable Container untuk Mobile UX */}
        <div className="flex flex-col overflow-y-auto max-h-[95vh] bg-white no-scrollbar">
          
          {/* Progress Header */}
          <div className="bg-[#FDFCFB] border-b border-[#F0EDE6] p-6 text-center">
            <div className="inline-flex items-center justify-center size-12 rounded-full bg-[#D4AF97]/10 mb-4 animate-in zoom-in duration-500">
              <CheckCircle2 className="size-6 text-[#D4AF97]" />
            </div>
            <DialogHeader className="p-0 space-y-2">
              <DialogTitle className="text-xl md:text-2xl font-bold text-[#2C2C2C] tracking-tight">
                Hampir Selesai!
              </DialogTitle>
              <DialogDescription className="text-xs md:text-sm text-[#6B6B6B] leading-relaxed">
                Akun anda telah terdaftar. Silakan selesaikan pembayaran paket <span className="font-bold text-[#2C2C2C]">{userData.package}</span> untuk aktivasi fitur.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-6 md:p-8 flex flex-col items-center">
            {/* QRIS Display Section */}
            <div className="w-full max-w-[240px] md:max-w-[260px] relative">
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#D4AF97]/20 to-transparent rounded-[2.5rem] blur-sm" />
              <div className="relative bg-white border-[6px] border-[#F0EDE6] rounded-[2rem] p-3 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between mb-2 px-1">
                  <div className="flex items-center gap-1.5">
                    <QrCode className="size-3 text-[#D4AF97]" />
                    <span className="text-[9px] font-black tracking-widest text-[#2C2C2C]">QRIS PROCESSED</span>
                  </div>
                  <div className="size-1.5 rounded-full bg-[#25D366] animate-pulse" />
                </div>
                
                <div className="aspect-square relative rounded-xl overflow-hidden bg-[#F8F5F0]">
                  <Image 
                    src={qrisImage} 
                    alt="QRIS Undang Dong" 
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                <div className="mt-3 py-1.5 bg-[#F8F5F0] rounded-lg text-center">
                  <p className="text-[10px] font-bold text-[#2C2C2C]">UNDANG DONG INDONESIA</p>
                </div>
              </div>
            </div>

            {/* Instruction List */}
            <div className="mt-8 w-full space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FDFCFB] border border-[#F0EDE6]">
                <div className="size-5 rounded-full bg-[#D4AF97] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</div>
                <p className="text-[11px] md:text-xs text-[#6B6B6B] leading-relaxed">
                  Scan QRIS menggunakan aplikasi Mobile Banking atau E-Wallet (Gopay/OVO/Dana/ShopeePay).
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FDFCFB] border border-[#F0EDE6]">
                <div className="size-5 rounded-full bg-[#D4AF97] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</div>
                <p className="text-[11px] md:text-xs text-[#6B6B6B] leading-relaxed">
                  Klik tombol <strong>Kirim Bukti</strong> di bawah. Lampirkan screenshot transaksi dan admin akan mengaktivasi akun Anda.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-[#9B9B9B]">
              <ShieldCheck className="size-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Secure Payment Guaranteed</span>
            </div>
          </div>

          {/* Action Area */}
          <DialogFooter className="p-6 pt-2 flex flex-col gap-3 sm:flex-col border-t border-[#F0EDE6] bg-[#FDFCFB]">
            <Button 
              onClick={handleWhatsAppChat}
              className={cn(
                "w-full bg-[#25D366] hover:bg-[#1DA851] text-white h-12 rounded-xl font-bold text-sm shadow-lg shadow-[#25D366]/20 transition-all",
                "flex items-center justify-center gap-2 group"
              )}
            >
              <MessageCircle className="size-5 fill-current group-hover:scale-110 transition-transform" />
              Kirim Bukti via WhatsApp
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full text-[#9B9B9B] hover:text-[#2C2C2C] hover:bg-transparent text-[11px] font-bold uppercase tracking-widest h-10"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="mr-2 size-3" />
              Kembali ke Beranda
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}