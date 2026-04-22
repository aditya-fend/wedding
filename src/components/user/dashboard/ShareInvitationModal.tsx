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
import { Textarea } from "@/components/ui/textarea"
import { Send, Copy, Check, MessageCircle, Share2, Users, FileText } from "lucide-react"
import { toast } from "sonner"

interface ShareInvitationModalProps {
  slug: string
  title: string
}

export function ShareInvitationModal({ slug, title }: ShareInvitationModalProps) {
  const [fullUrl, setFullUrl] = React.useState("")
  const [guestNamesText, setGuestNamesText] = React.useState("")
  const [messageTemplate, setMessageTemplate] = React.useState(
    `Kepada Yth. Bapak/Ibu/Saudara/i [NAMA],\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Anda untuk hadir di acara pernikahan kami.\n\nBerikut link undangan kami untuk info lengkap acara:\n[LINK]\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu.\n\nTerima kasih.`
  )
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null)

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(`${window.location.origin}/undangan/${slug}`)
    }
  }, [slug])

  // Split teks menjadi array per baris dan hapus yang kosong
  const guestList = React.useMemo(() => {
    return guestNamesText
      .split("\n")
      .map(name => name.trim())
      .filter(name => name.length > 0)
  }, [guestNamesText])

  const generateMessage = (name: string) => {
    const link = name ? `${fullUrl}?to=${encodeURIComponent(name)}` : fullUrl;
    const finalName = name || "Tamu Undangan";
    return messageTemplate.replace(/\[NAMA\]/g, finalName).replace(/\[LINK\]/g, link);
  }

  const handleCopyText = async (name: string, index: number) => {
    try {
      const msg = generateMessage(name);
      await navigator.clipboard.writeText(msg);
      setCopiedIndex(index);
      toast.success(`Pesan untuk ${name} disalin!`);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast.error("Gagal menyalin pesan");
    }
  }

  const handleWhatsAppShare = (name: string) => {
    const msg = generateMessage(name);
    const waUrl = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
  }

  // Handle undangan umum tanpa nama spesifik
  const handleCopyGeneralLink = async () => {
    try {
      const msg = generateMessage("");
      await navigator.clipboard.writeText(msg);
      toast.success("Pesan umum disalin!");
    } catch (err) {
      toast.error("Gagal menyalin pesan");
    }
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

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col rounded-3xl border-[#E5E0D8] bg-white p-6 md:p-8 z-[101]">
        <DialogHeader className="space-y-3 text-left flex-shrink-0">
          <div className="bg-[#F8F5F0] w-fit p-3 rounded-2xl">
            <Share2 className="size-6 text-[#D4AF97]" />
          </div>
          <DialogTitle className="text-2xl font-bold text-[#2C2C2C] tracking-tight">
            Distribusi Undangan Massal
          </DialogTitle>
          <DialogDescription className="text-[#6B6B6B]">
            Masukkan daftar nama tamu (1 nama per baris). Sistem akan otomatis membuatkan tautan dan teks WhatsApp unik untuk masing-masing tamu.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2 mt-4 space-y-6">
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B6B]">
              Daftar Nama Tamu
            </label>
            <div className="relative">
              <Textarea
                placeholder="Contoh:&#10;Budi Santoso&#10;Keluarga Wijaya&#10;Agus"
                value={guestNamesText}
                onChange={(e) => setGuestNamesText(e.target.value)}
                className="min-h-[100px] border-[#E5E0D8] rounded-xl focus:border-[#D4AF97] focus:ring-[#D4AF97] bg-[#F8F5F0]/50 text-sm placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B6B]">
              Template Pesan
            </label>
            <p className="text-[11px] text-[#9B9B9B]">Gunakan <span className="font-bold text-[#D4AF97]">[NAMA]</span> untuk otomatisasi letak nama tamu dan <span className="font-bold text-[#D4AF97]">[LINK]</span> untuk tautan unik.</p>
            <Textarea
              value={messageTemplate}
              onChange={(e) => setMessageTemplate(e.target.value)}
              className="min-h-[160px] border-[#E5E0D8] rounded-xl focus:border-[#D4AF97] focus:ring-[#D4AF97] bg-[#F8F5F0]/50 text-xs"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B6B]">
              Daftar Siap Kirim ({guestList.length})
            </label>
            
            {guestList.length === 0 ? (
              <div className="p-4 border border-dashed border-[#E5E0D8] rounded-xl flex items-center justify-between bg-[#F8F5F0]/30">
                <div className="flex items-center gap-3">
                  <FileText className="size-5 text-[#9B9B9B]" />
                  <span className="text-sm font-medium text-[#6B6B6B]">Pesan Umum (Tanpa Nama Tamu)</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopyGeneralLink} className="h-8 rounded-lg text-xs bg-white">
                    <Copy className="size-3 mr-1.5" /> Salin Teks
                  </Button>
                  <Button variant="default" size="sm" onClick={() => handleWhatsAppShare("")} className="h-8 rounded-lg text-xs bg-[#25D366] hover:bg-[#20ba5a] text-white">
                    <MessageCircle className="size-3 mr-1.5" /> Kirim
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {guestList.map((name, idx) => (
                  <div key={idx} className="p-3 border border-[#E5E0D8] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white shadow-sm hover:border-[#D4AF97]/50 transition-colors">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="size-8 rounded-full bg-[#F8F5F0] flex items-center justify-center shrink-0">
                        <Users className="size-3.5 text-[#D4AF97]" />
                      </div>
                      <span className="text-sm font-bold text-[#2C2C2C] truncate" title={name}>{name}</span>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleCopyText(name, idx)} 
                        className="h-8 rounded-lg text-xs border-[#E5E0D8] bg-white hover:bg-slate-50"
                      >
                        {copiedIndex === idx ? <Check className="size-3 mr-1.5 text-green-500" /> : <Copy className="size-3 mr-1.5 text-[#D4AF97]" />}
                        Salin
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        onClick={() => handleWhatsAppShare(name)} 
                        className="h-8 rounded-lg text-xs bg-[#25D366] hover:bg-[#20ba5a] text-white border-none shadow-md shadow-[#25D366]/20"
                      >
                        <MessageCircle className="size-3 mr-1.5" /> Kirim WA
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}