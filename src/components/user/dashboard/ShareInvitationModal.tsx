"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Copy, Check, MessageCircle, Share2 } from "lucide-react"
import { toast } from "sonner"

interface ShareInvitationModalProps {
  slug: string
  title: string
}

export function ShareInvitationModal({ slug, title }: ShareInvitationModalProps) {
  const [isCopied, setIsCopied] = React.useState(false)
  const [fullUrl, setFullUrl] = React.useState("")

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(`${window.location.origin}/undangan/${slug}`)
    }
  }, [slug])

  const handleCopyLink = async () => {
    try {
      if (!fullUrl) return
      await navigator.clipboard.writeText(fullUrl)
      setIsCopied(true)
      toast.success("Link berhasil disalin!")
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      toast.error("Gagal menyalin link")
    }
  }

  const handleWhatsAppShare = () => {
    if (!fullUrl) return
    const message = `Halo! Silakan buka undangan pernikahan kami di: ${fullUrl}`
    const waUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(waUrl, "_blank")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex-1 rounded-xl h-10 text-xs gap-2"
        >
          <Send className="size-3.5 text-[#D4AF97]" />
          Bagikan
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] rounded-3xl border-[#E5E0D8] bg-white p-8 z-[101]">
        <DialogHeader className="space-y-3 text-left">
          <div className="bg-[#F8F5F0] w-fit p-3 rounded-2xl">
            <Share2 className="size-6 text-[#D4AF97]" />
          </div>
          <DialogTitle className="text-2xl font-bold text-[#2C2C2C] tracking-tight">
            Bagikan Undangan
          </DialogTitle>
          <DialogDescription className="text-[#6B6B6B]">
            Bagikan kebahagiaan Anda kepada keluarga dan teman-teman melalui tautan unik ini.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B6B]">
              Link Undangan
            </label>

            <div className="flex gap-2">
              <Input
                value={fullUrl}
                readOnly
                className="h-12 border-[#E5E0D8] rounded-xl bg-[#F8F5F0]/50 text-sm focus:ring-[#D4AF97]"
              />

              <Button
                variant="outline"
                size="icon"
                className="shrink-0 h-12 w-12 rounded-xl border-[#E5E0D8] hover:bg-white"
                onClick={handleCopyLink}
              >
                {isCopied ? (
                  <Check className="size-4 text-green-500" />
                ) : (
                  <Copy className="size-4 text-[#D4AF97]" />
                )}
              </Button>
            </div>
          </div>

          <Button
            onClick={handleWhatsAppShare}
            className="w-full h-12 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 border-none transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="size-5" />
            Bagikan ke WhatsApp
          </Button>
        </div>

        {/* Decorative */}
        <div className="absolute -bottom-16 -left-16 size-40 bg-[#F8F5F0] rounded-full blur-3xl opacity-50 pointer-events-none" />
      </DialogContent>
    </Dialog>
  )
}