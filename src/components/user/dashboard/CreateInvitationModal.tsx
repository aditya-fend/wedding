"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner" // Asumsi menggunakan sonner untuk notifikasi
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
import { Plus, Ticket, Sparkles, Loader2 } from "lucide-react"
import { createInitialInvitation } from "@/lib/actions/invitation"

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
        // Arahkan ke halaman editor dengan ID undangan yang baru dibuat
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
        <Button className="btn-primary h-11 rounded-xl shadow-lg shadow-[#D4AF97]/20">
          <Plus className="mr-2 size-4" /> Buat Undangan Baru
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px] rounded-3xl border-[#E5E0D8] bg-white p-8 overflow-hidden">
        <div className="absolute -top-12 -right-12 size-32 bg-[#F8F5F0] rounded-full blur-3xl opacity-50" />
        
        <DialogHeader className="relative z-10 space-y-3 text-left">
          <div className="bg-[#F8F5F0] w-fit p-3 rounded-2xl">
            <Sparkles className="size-6 text-[#D4AF97]" />
          </div>
          <DialogTitle className="text-2xl font-bold text-[#2C2C2C] tracking-tight">
            Mulai Cerita Baru
          </DialogTitle>
          <DialogDescription className="text-[#6B6B6B]">
            Siapkan identitas unik untuk hari bahagia Anda. Pembuatan ini akan menggunakan 10 token.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreate} className="relative z-10 space-y-6 mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
                Judul Undangan
              </Label>
              <Input 
                id="title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Pernikahan Robi & Siti" 
                className="h-12 border-[#E5E0D8] rounded-xl focus:ring-[#D4AF97] focus:border-[#D4AF97]"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug" className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
                Custom URL
              </Label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-sm text-[#6B6B6B] font-medium border-r border-[#E5E0D8] pr-3 h-5 flex items-center">
                  diundang.in/
                </span>
                <Input 
                  id="slug" 
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                  placeholder="robi-siti" 
                  className="h-12 pl-28 border-[#E5E0D8] rounded-xl focus:ring-[#D4AF97] focus:border-[#D4AF97]"
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-col gap-3 pt-2">
            <Button 
              type="submit" 
              disabled={isLoading || totalTokens < 10}
              className="w-full h-12 bg-[#2C2C2C] hover:bg-black text-white rounded-xl font-bold transition-all shadow-xl shadow-black/10"
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin mr-2" />
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Konfirmasi & Buat</span>
                  <div className="flex items-center bg-white/10 px-2 py-0.5 rounded-lg">
                    <Ticket className="size-3 mr-1 text-[#D4AF97]" />
                    <span className="text-[11px] text-white">10 Token</span>
                  </div>
                </div>
              )}
            </Button>
            
            {totalTokens < 10 && (
              <p className="text-[11px] text-center text-red-500 font-medium italic">
                Token tidak mencukupi (Saldo: {totalTokens}). Silakan top-up.
              </p>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}