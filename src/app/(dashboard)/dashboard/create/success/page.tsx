// app/(dashboard)/create/success/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Image from "next/image";
import { CheckCircle, Copy, MessageCircle } from "lucide-react";

export default function CreateSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const slug = searchParams.get("slug");
  const groomName = searchParams.get("groom") || "";
  const brideName = searchParams.get("bride") || "";
  const packageType = searchParams.get("package") || "basic";

  const qrisUrl = "https://i.ibb.co/0jZfX8k/qris-placeholder.jpg"; // Ganti dengan QRIS asli kamu
  const waNumber = "6281234567890"; // Ganti dengan nomor WA kamu

  const waMessage = encodeURIComponent(
    `Halo Admin,\n\nSaya telah membuat undangan untuk:\n${groomName} & ${brideName}\nPaket: ${packageType.toUpperCase()}\n\nMohon verifikasi pembayaran saya.\nTerima kasih.`
  );

  const copyLink = () => {
    navigator.clipboard.writeText(`https://yourdomain.com/invitation/${slug}`);
    toast.success("Link undangan berhasil disalin!");
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <Card className="max-w-lg w-full bg-zinc-900 border-zinc-800">
        <CardHeader className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-3xl">Undangan Berhasil Dibuat!</CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          <div>
            <p className="text-center text-zinc-400 mb-4">Scan QRIS berikut untuk pembayaran:</p>
            <div className="bg-white p-4 rounded-xl mx-auto w-fit">
              <Image 
                src={qrisUrl} 
                alt="QRIS" 
                width={280} 
                height={280} 
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="text-center">
            <Button 
              onClick={() => {
                window.open(`https://wa.me/${waNumber}?text=${waMessage}`, "_blank");
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg flex items-center gap-3"
            >
              <MessageCircle className="w-6 h-6" />
              Kirim Bukti Pembayaran via WhatsApp
            </Button>
            <p className="text-xs text-zinc-500 mt-3">
              Klik tombol di atas untuk mengirim bukti transfer otomatis
            </p>
          </div>

          <div className="pt-6 border-t border-zinc-800">
            <Button 
              onClick={copyLink}
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Salin Link Undangan
            </Button>
            <p className="text-center text-xs text-zinc-500 mt-4">
              Link: https://yourdomain.com/invitation/{slug}
            </p>
          </div>

          <Button 
            onClick={() => router.push("/dashboard")}
            variant="ghost"
            className="w-full"
          >
            Kembali ke Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}