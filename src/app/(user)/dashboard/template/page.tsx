import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutTemplate, Eye, MousePointerClick } from "lucide-react";
import { getTemplates } from "@/lib/services/template";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function TemplatesPage() {
  const templates = await getTemplates();

  return (
    <div className="w-full pt-18 lg:pt-10 space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-[#2C2C2C] tracking-tight">
          Pilih Template
        </h1>
        <p className="text-[#6B6B6B]">
          Temukan desain yang paling sesuai dengan tema pernikahan impian Anda.
        </p>
      </div>

      {/* Logic Tampilan Data */}
      {templates.length === 0 ? (
        <Card className="border-dashed border-2 border-[#E5E0D8] bg-white/50 w-full">
          <CardContent className="p-16 flex flex-col items-center justify-center text-center space-y-4">
            <div className="bg-white p-4 rounded-full shadow-sm border border-[#E5E0D8]">
              <LayoutTemplate className="size-8 text-[#D4AF97]" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-[#2C2C2C] text-lg">
                Belum ada template
              </p>
              <p className="text-sm text-[#6B6B6B] max-w-sm mx-auto">
                Admin sedang menyiapkan koleksi template terbaik. Silakan
                kembali lagi nanti.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="group border-[#E5E0D8] bg-white overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Thumbnail Section */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F8F5F0]">
                {template.thumbnailUrl ? (
                  <Image
                    src={template.thumbnailUrl}
                    alt={template.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-[#D4AF97]/20">
                    <LayoutTemplate className="size-16" />
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-[#2C2C2C]/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {template.category}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <CardContent className="p-5 space-y-2">
                <h3 className="font-bold text-[#2C2C2C] text-lg leading-tight group-hover:text-[#D4AF97] transition-colors">
                  {template.title}
                </h3>
                <p className="text-sm text-[#6B6B6B] line-clamp-2 leading-relaxed">
                  {template.description ||
                    "Template undangan digital eksklusif untuk momen spesial Anda."}
                </p>
              </CardContent>

              {/* Action Buttons */}
              <CardFooter className="p-5 pt-0 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  asChild
                  className="border-[#E5E0D8] text-[#6B6B6B] hover:bg-[#F8F5F0] hover:text-[#2C2C2C] rounded-xl h-10"
                >
                  <Link href={template.previewUrl || "#"} target="_blank">
                    <Eye className="size-4 mr-2" /> Preview
                  </Link>
                </Button>
                <Button className="bg-[#D4AF97] hover:bg-[#C39E86] text-white border-none rounded-xl h-10 shadow-sm">
                  <MousePointerClick className="size-4 mr-2" /> Pilih
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
