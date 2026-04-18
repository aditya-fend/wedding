import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { getTemplates } from "@/lib/services/template";
import { Template } from "@/types/invitation";
import { TemplateDialog } from "./TemplateDialog";

type TemplateItem = Template & {
  thumbnailLabel?: string;
};

function TemplateCard({ template }: { template: TemplateItem }) {
  return (
    <Card className="group overflow-hidden rounded-[1.75rem] border-border bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
      <div className="relative h-44 overflow-hidden rounded-t-3xl">
        {template.thumbnailUrl ? (
          <Image
            src={template.thumbnailUrl}
            alt={template.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-linear-to-br from-[#F6EEE6] via-[#F8F3EE] to-[#FDF8F4] px-4 text-center">
            <div>
              <div className="mb-3 inline-flex items-center justify-center rounded-full bg-[#D4AF97]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#2C2C2C]">
                {template.category}
              </div>
              <p className="text-sm font-semibold text-[#2C2C2C]">
                {template.title}
              </p>
            </div>
          </div>
        )}
        {/* Overlay kategori untuk thumbnail */}
        {template.thumbnailUrl && (
          <div className="absolute top-3 left-3">
            <div className="inline-flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#2C2C2C]">
              {template.category}
            </div>
          </div>
        )}
      </div>
      <CardContent className="space-y-4 px-5 pb-0 pt-5">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-[#2C2C2C] tracking-tight transition-colors group-hover:text-[#D4AF97]">
            {template.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {template.description ||
              "Template undangan digital eksklusif untuk momen spesial Anda."}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-3 flex-col items-stretch sm:flex-row sm:justify-between sm:items-center px-5 pt-4 pb-5">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="w-full sm:w-auto rounded-xl"
        >
          <Link
            href={template.previewUrl || "#"}
            className="inline-flex items-center gap-2"
          >
            <Eye className="size-4" /> Preview
          </Link>
        </Button>
        <Button size="sm" className="w-full sm:w-auto rounded-xl">
          <Link href="/masuk" className="inline-flex items-center gap-2">
            Pilih Template
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default async function TemplateSection() {
  const templates = await getTemplates();

  const popularTemplates = templates
    .filter((template) => template.category === "Populer")
    .slice(0, 3);

  return (
    <section className="w-full bg-white py-14 lg:py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF97]">
              Populer
            </p>
            <h2 className="text-3xl font-semibold text-[#2C2C2C] md:text-4xl">
              Temukan template favorit yang paling banyak dipilih.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              Jelajahi koleksi template kami yang dirancang khusus untuk momen
              pernikahan Anda.
            </p>
          </div>

          <TemplateDialog templates={templates} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {popularTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>
    </section>
  );
}
