import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { createServerSupabase } from "@/lib/supabase/server"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Heart, 
  Eye, 
  Pencil, 
  Trash2, 
  Calendar, 
  Plus,
  MapPin
} from "lucide-react"

export default async function UndanganPage() {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  // Mengambil daftar undangan milik user yang login
  const invitations = await prisma.invitation.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      template: true, // Untuk mengambil thumbnail dari template yang digunakan
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="w-full pt-18 lg:pt-10 space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#2C2C2C] tracking-tight">Undangan Saya</h1>
          <p className="text-[#6B6B6B]">Kelola semua undangan digital yang telah Anda buat.</p>
        </div>
        <Button asChild className="btn-primary h-11 rounded-xl shadow-lg shadow-[#D4AF97]/20">
          <Link href="/dashboard/templates">
            <Plus className="mr-2 size-4" /> Buat Undangan
          </Link>
        </Button>
      </div>

      {invitations.length === 0 ? (
        <Card className="border-dashed border-2 border-[#E5E0D8] bg-white/50 w-full">
          <CardContent className="p-16 flex flex-col items-center justify-center text-center space-y-4">
            <div className="bg-white p-4 rounded-full shadow-sm border border-[#E5E0D8]">
              <Heart className="size-8 text-[#D4AF97]" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-[#2C2C2C] text-lg">Belum ada undangan</p>
              <p className="text-sm text-[#6B6B6B] max-w-sm mx-auto">
                Sepertinya Anda belum membuat undangan apa pun. Mulai buat sekarang!
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {invitations.map((invitation) => (
            <Card key={invitation.id} className="group border-[#E5E0D8] bg-white overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Thumbnail Undangan */}
              <div className="relative aspect-video overflow-hidden bg-[#F8F5F0]">
                {invitation.template?.thumbnailUrl ? (
                  <Image
                    src={invitation.template.thumbnailUrl}
                    alt={invitation.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-[#D4AF97]/20">
                    <Heart className="size-12 fill-current" />
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 backdrop-blur-sm text-[#2C2C2C] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    /{invitation.title}
                  </span>
                </div>
              </div>

              {/* Info Undangan */}
              <CardContent className="p-5 space-y-4">
                <div>
                  <h3 className="font-bold text-[#2C2C2C] text-lg leading-tight">
                    Undangan {invitation.title}
                  </h3>
                  <p className="text-xs text-[#6B6B6B] mt-1 italic">
                    Template: {invitation.template?.title || "Custom"}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-xs text-[#6B6B6B] gap-2">
                    <Calendar className="size-3.5" />
                    <span>Dibuat pada {new Date(invitation.createdAt).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
              </CardContent>

              {/* Actions */}
              <CardFooter className="p-5 pt-0 flex gap-2">
                <Button variant="outline" size="icon" asChild title="Lihat" className="border-[#E5E0D8] hover:bg-[#F8F5F0] hover:text-[#D4AF97] rounded-lg">
                  <Link href={`/${invitation.title}`} target="_blank">
                    <Eye className="size-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild title="Edit" className="border-[#E5E0D8] hover:bg-[#F8F5F0] hover:text-blue-500 rounded-lg">
                  <Link href={`/dashboard/undangan/edit/${invitation.id}`}>
                    <Pencil className="size-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" title="Hapus" className="border-[#E5E0D8] hover:bg-red-50 hover:text-red-500 rounded-lg ml-auto">
                  <Trash2 className="size-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}