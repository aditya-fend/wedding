import Image from "next/image";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Template } from "@/types";
import { Eye, LayoutDashboard, MousePointerClick } from "lucide-react";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import Link from "next/link";

const TemplateCard = ({
  template,
  isSelected,
  used,
}: {
  template: Template;
  isSelected: boolean;
  used: () => void;
}) => {
  return (
    <Card
      key={template.id}
      className={
        "group overflow-hidden rounded-[28px] border transition duration-300 " +
        (isSelected
          ? "border-[#D4AF97] shadow-lg"
          : "border-border hover:border-[#D4AF97] hover:shadow-xl")
      }
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        {template.thumbnailUrl ? (
          <Image
            src={template.thumbnailUrl}
            alt={template.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#FDFCFB] px-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF97] opacity-60">
              No Preview
            </p>
          </div>
        )}
        <div className="absolute top-2.5 left-2.5">
          <div className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#2C2C2C] shadow-sm">
            {template.category}
          </div>
        </div>
      </div>

      <CardContent className="p-4 pb-0">
        <h3 className="text-sm font-bold text-[#2C2C2C] truncate group-hover:text-[#D4AF97] transition-colors">
          {template.title}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-[#6B6B6B] line-clamp-2">
          {template.description || "Template undangan digital eksklusif."}
        </p>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="w-full sm:w-auto"
        >
          <Link href={template.previewUrl ?? "#"} target="_blank" rel="noreferrer">
            <Eye className="size-4 mr-2" /> Preview
          </Link>
        </Button>

        <DialogClose asChild>
          <Button size="sm" className="w-full sm:w-auto" onClick={used}>
            <MousePointerClick className="size-4 mr-2" /> Gunakan
          </Button>
        </DialogClose>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
