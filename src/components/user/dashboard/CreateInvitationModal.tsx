"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Ticket, Sparkles, Loader2, Globe } from "lucide-react"
import { createInitialInvitation } from "@/lib/actions/invitation"
import { cn } from "@/lib/utils"

interface CreateInvitationModalProps {
  totalTokens: number
}

export function CreateInvitationModal({ totalTokens }: CreateInvitationModalProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [title, setTitle] = React.useState("")
  const [slug, setSlug] = React.useState("")
  const router = useRouter()

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (totalTokens < 10) return
    
    setIsLoading(true)
    
    try {
      const result = await createInitialInvitation({ title, slug })
      
      if (result.success) {
        toast.success("Berhasil! Token dikurangi 10.")
        setIsOpen(false)
        router.push(`/create?id=${result.invitationId}`)
      }
    } catch (error: unknown) {
      toast.error((error as Error).message || "Terjadi kesalahan")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="h-12 px-6 rounded-2xl bg-[#D4AF97] hover:bg-[#B99575] text-white font-bold shadow-lg shadow-[#D4AF97]/20 transition-all active:scale-[0.98] flex gap-2">
          <Plus className="size-4" /> 
          <span className="tracking-tight">Buat Undangan Baru</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[440px] rounded-[2.5rem] border-[#F0EDE6] bg-white p-8 overflow-hidden">
        {/* Subtle Decorative Background Element */}
        <div className="absolute -top-16 -right-16 size-40 bg-[#FDFCFB] border border-[#F0EDE6] rounded-full opacity-50 z-0" />
        
        <DialogHeader className="relative z-10 space-y-3">
          <div className="bg-[#FDFCFB] w-fit p-3 rounded-2xl border border-[#F0EDE6] mb-2 shadow-sm">
            <Sparkles className="size-5 text-[#D4AF97]" />
          </div>
          <DialogTitle className="text-2xl font-black text-[#2C2C2C] tracking-tighter">
            Mulai Cerita Baru
          </DialogTitle>
          <DialogDescription className="text-xs font-medium text-[#6B6B6B] leading-relaxed">
            Siapkan identitas unik untuk hari bahagia Anda. Pembuatan ini memerlukan <span className="text-[#D4AF97] font-bold">10 Credits</span>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreate} className="relative z-10 space-y-6 mt-6">
          <div className="space-y-5">
            {/* Input Judul */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9B9B9B] ml-1">
                Judul Undangan
              </Label>
              <Input 
                id="title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Pernikahan Robi & Siti" 
                className="h-12 border-[#F0EDE6] rounded-2xl focus:border-[#D4AF97] focus:ring-[#D4AF97]/10 bg-[#FDFCFB]/30 pl-5 font-bold transition-all"
                required
              />
            </div>
            
            {/* Input Slug/URL */}
            <div className="space-y-2">
              <Label htmlFor="slug" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9B9B9B] ml-1 flex items-center gap-1.5">
                <Globe className="size-3 text-[#D4AF97]" /> Custom URL
              </Label>
              <div className="relative flex items-center group">
                <div className="absolute left-4 text-[13px] text-[#9B9B9B] font-bold tracking-tight border-r border-[#F0EDE6] pr-3 h-5 flex items-center">
                  diundang.in/
                </div>
                <Input 
                  id="slug" 
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                  placeholder="robi-siti" 
                  className="h-12 pl-[105px] border-[#F0EDE6] rounded-2xl focus:border-[#D4AF97] focus:ring-[#D4AF97]/10 bg-[#FDFCFB]/30 font-bold transition-all"
                  required
                />
              </div>
              <p className="text-[10px] text-[#9B9B9B] italic ml-1 mt-1">URL ini akan menjadi alamat permanen undangan digital Anda.</p>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-col gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={isLoading || totalTokens < 10}
              className={cn(
                "w-full h-13 py-6 bg-[#2C2C2C] hover:bg-black text-white rounded-[1.25rem] font-bold transition-all shadow-xl shadow-black/10 flex flex-col items-center justify-center gap-0.5 group",
                totalTokens < 10 && "opacity-50 grayscale cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-sm tracking-tight">Konfirmasi & Buat Undangan</span>
                  </div>
                  <div className="flex items-center text-[#9B9B9B] group-hover:text-white transition-colors">
                    <Ticket className="size-3 mr-1 text-[#D4AF97]" />
                    <span className="text-[10px] uppercase tracking-widest font-black">10 Credits Required</span>
                  </div>
                </>
              )}
            </Button>
            
            {totalTokens < 10 && (
              <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-3 text-center animate-in fade-in zoom-in-95">
                <p className="text-[11px] text-rose-500 font-bold uppercase tracking-tight">
                  Saldo Tidak Mencukupi (Saldo: {totalTokens})
                </p>
                <p className="text-[10px] text-rose-400 font-medium">Silakan lakukan pengisian token terlebih dahulu.</p>
              </div>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}