// app/(dashboard)/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createInvitation } from "@/app/actions/invitation";

const packages = [
  { 
    id: "basic", 
    name: "Basic", 
    price: 49900, 
    description: "Template + Custom nama, tanggal, lokasi" 
  },
  { 
    id: "standard", 
    name: "Standard", 
    price: 99900, 
    description: "Galeri foto + Musik latar + RSVP lengkap" 
  },
  { 
    id: "premium", 
    name: "Premium", 
    price: 199000, 
    description: "Video background + Story + Full custom" 
  },
];

export default function CreateInvitationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("basic");

  const defaultTemplate = searchParams.get("template") || "elegant-minimal";

  const [formData, setFormData] = useState({
    groomName: "",
    brideName: "",
    weddingDate: "",
    venue: "",
    address: "",
    message: "",
    templateSlug: defaultTemplate,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.append("groomName", formData.groomName);
    data.append("brideName", formData.brideName);
    data.append("weddingDate", formData.weddingDate);
    data.append("venue", formData.venue);
    data.append("address", formData.address);
    data.append("message", formData.message);
    data.append("templateSlug", formData.templateSlug);
    data.append("packageType", selectedPackage);

    try {
      const result = await createInvitation(data);

      // Redirect ke halaman success dengan data
      const successUrl = `/dashboard/create/success?slug=${result.slug}&groom=${encodeURIComponent(result.groomName)}&bride=${encodeURIComponent(result.brideName)}&package=${result.packageType}`;

      toast.success("Undangan berhasil dibuat!", {
        description: "Silakan lakukan pembayaran via QRIS",
      });

      router.push(successUrl);
    } catch (error: unknown) {
      toast.error((error as Error).message || "Gagal membuat undangan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Buat Undangan Baru</h1>
        <p className="text-zinc-400 mt-2">Isi detail pernikahan kamu dan pilih paket</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form Detail Pernikahan */}
        <div className="lg:col-span-3">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Detail Pernikahan</CardTitle>
              <CardDescription>Mohon isi dengan lengkap dan benar</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nama Pengantin Pria</Label>
                    <Input 
                      value={formData.groomName}
                      onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                      placeholder="Ahmad Rizki" 
                      required 
                    />
                  </div>
                  <div>
                    <Label>Nama Pengantin Wanita</Label>
                    <Input 
                      value={formData.brideName}
                      onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                      placeholder="Sinta Dewi" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <Label>Tanggal Pernikahan</Label>
                  <Input 
                    type="date" 
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                    required 
                  />
                </div>

                <div>
                  <Label>Tempat Pernikahan</Label>
                  <Input 
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    placeholder="Gedung Serbaguna XYZ" 
                    required 
                  />
                </div>

                <div>
                  <Label>Alamat Lengkap (Opsional)</Label>
                  <Textarea 
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Jl. Sudirman No.45, Jakarta Selatan"
                  />
                </div>

                <div>
                  <Label>Pesan untuk Tamu (Opsional)</Label>
                  <Textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Dengan segala hormat kami mengundang..."
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg" 
                  disabled={isLoading}
                >
                  {isLoading ? "Membuat Undangan..." : "Buat Undangan Sekarang"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Paket Selection */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-6">Pilih Paket</h2>
          
          <div className="space-y-4">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`cursor-pointer p-6 transition-all border-2 ${
                  selectedPackage === pkg.id 
                    ? 'border-white bg-zinc-900' 
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{pkg.name}</h3>
                    <p className="text-sm text-zinc-400 mt-1">{pkg.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      Rp {pkg.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl text-center text-sm text-zinc-400">
            Pembayaran via QRIS<br />
            Konfirmasi manual via WhatsApp setelah undangan dibuat
          </div>
        </div>
      </div>
    </div>
  );
}