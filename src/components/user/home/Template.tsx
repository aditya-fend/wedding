import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { getTemplates } from "@/lib/services/template";
import { Template } from "@/types/invitation";
import { TemplateCard, TemplateDialog } from "./TemplateDialog";

export default async function TemplateSection() {
  const templates = await getTemplates();
  const popularTemplates = templates
    .filter((t) => t.category === "Populer")
    .slice(0, 3);

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10">
          <div className="max-w-xl space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF97]">
              Koleksi Pilihan
            </p>
            <h2 className="text-2xl font-bold text-[#2C2C2C] md:text-3xl tracking-tight">
              Template Terfavorit
            </h2>
            <p className="text-sm leading-relaxed text-[#6B6B6B]">
              Desain modern yang dirancang khusus untuk mewujudkan undangan impian Anda.
            </p>
          </div>

          <TemplateDialog templates={templates} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popularTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>
    </section>
  );
}