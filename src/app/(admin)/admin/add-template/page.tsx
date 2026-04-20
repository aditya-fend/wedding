"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { LayoutTemplate, Loader2, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const defaultCategories = [
  "Populer",
  "Minimalis",
  "Romantis",
  "Pantai",
  "Klasik",
  "Modern",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AddTemplatePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Populer");
  const [description, setDescription] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [thumbnailDragOver, setThumbnailDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [configPath, setConfigPath] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      toast.error("Judul template wajib diisi");
      return;
    }

    const normalizedConfigPath =
      configPath.trim() || `templates/${slugify(title)}.json`;

    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/templates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          category: category.trim() || "Populer",
          description: description.trim() || null,
          thumbnailUrl: thumbnailUrl.trim() || null,
          previewUrl: previewUrl.trim() || null,
          configPath: normalizedConfigPath,
          isActive,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Gagal menambahkan template");
      }

      toast.success("Template berhasil ditambahkan");
      setTitle("");
      setCategory("Populer");
      setDescription("");
      setThumbnailUrl("");
      setPreviewUrl("");
      setConfigPath("");
      setIsActive(true);
      router.refresh();
    } catch (error) {
      console.error("Create template error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat menyimpan template",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const uploadThumbnail = async (file: File) => {
    setThumbnailUploading(true);

    try {
      const fileName = `templates/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("templates")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from("templates")
        .getPublicUrl(fileName);

      if (!data?.publicUrl) {
        throw new Error("Gagal mendapatkan URL publik thumbnail");
      }

      return data.publicUrl;
    } finally {
      setThumbnailUploading(false);
    }
  };

  const handleThumbnailFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Hanya file gambar yang didukung");
      return;
    }

    setThumbnailPreview(URL.createObjectURL(file));

    try {
      const url = await uploadThumbnail(file);
      setThumbnailUrl(url);
      toast.success("Thumbnail berhasil diupload");
    } catch (error) {
      console.error("Thumbnail upload error:", error);
      toast.error("Gagal upload thumbnail");
      setThumbnailPreview("");
    }
  };

  const handleThumbnailDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setThumbnailDragOver(true);
    },
    [],
  );

  const handleThumbnailDragLeave = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setThumbnailDragOver(false);
    },
    [],
  );

  const handleThumbnailDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setThumbnailDragOver(false);

    if (!event.dataTransfer.files.length) {
      return;
    }

    handleThumbnailFile(event.dataTransfer.files[0]);
  };

  const handleThumbnailSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    handleThumbnailFile(file);
  };

  return (
    <div className="space-y-10 py-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-border bg-white p-8 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-[#F0EDE6] text-[#D4AF97] shadow-sm">
            <LayoutTemplate className="size-6" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-[#2C2C2C]">
              Tambah Template
            </h1>
            <p className="text-sm text-muted-foreground">
              Tambahkan data template baru untuk koleksi undangan admin.
            </p>
          </div>
        </div>
        <div className="rounded-3xl bg-[#F8F5F0] px-4 py-3 text-sm text-muted-foreground">
          loginkan informasi dasar, lalu simpan untuk menambahkan template baru.
        </div>
      </div>

      <Card className="border-border bg-white">
        <CardHeader>
          <CardTitle className="text-2xl text-[#2C2C2C]">
            Form Tambah Template
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Judul Template</Label>
                <Input
                  id="title"
                  placeholder="Contoh: Aura Dark"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Input
                  id="category"
                  placeholder="Contoh: Populer"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                placeholder="Deskripsi singkat tentang template"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="thumbnailInput">Thumbnail</Label>
                <div
                  className={`relative cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed px-4 py-8 text-center transition ${
                    thumbnailDragOver
                      ? "border-[#D4AF97] bg-[#FEF8E8]"
                      : "border-border bg-[#FCFBF8] hover:border-[#D4AF97]/60"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleThumbnailDragOver}
                  onDragLeave={handleThumbnailDragLeave}
                  onDrop={handleThumbnailDrop}
                >
                  <input
                    ref={fileInputRef}
                    id="thumbnailInput"
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    onChange={handleThumbnailSelect}
                  />

                  {thumbnailUploading ? (
                    <div className="flex flex-col items-center justify-center gap-3 text-sm text-[#2C2C2C]">
                      <Loader2 className="animate-spin size-6 text-[#D4AF97]" />
                      <p>Mengunggah thumbnail...</p>
                    </div>
                  ) : thumbnailPreview || thumbnailUrl ? (
                    <div className="space-y-3">
                      <div className="relative mx-auto h-44 w-full overflow-hidden rounded-2xl bg-[#F8F5F0]">
                        <Image
                          src={thumbnailPreview || thumbnailUrl}
                          alt="Thumbnail preview"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Klik atau seret gambar ke sini untuk mengganti
                        thumbnail.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0EDE6] text-[#D4AF97]">
                        <Upload className="size-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#2C2C2C]">
                          Seret & lepaskan gambar di sini
                        </p>
                        <p className="text-sm text-muted-foreground">
                          atau klik untuk memilih file thumbnail.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <Input
                  id="thumbnailUrl"
                  readOnly
                  value={thumbnailUrl}
                  placeholder="URL thumbnail akan otomatis terisi"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="previewUrl">Preview URL</Label>
                <Input
                  id="previewUrl"
                  placeholder="https://... atau /preview/aura-dark"
                  value={previewUrl}
                  onChange={(event) => setPreviewUrl(event.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="configPath">Config Path</Label>
                <Input
                  id="configPath"
                  placeholder="templates/aura-dark.json"
                  value={configPath}
                  onChange={(event) => setConfigPath(event.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Biarkan kosong untuk membuat otomatis dari judul.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="isActive">Status Aktif</Label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className={`rounded-xl px-4 py-3 text-sm transition ${isActive ? "bg-[#D4AF97] text-[#2C2C2C]" : "bg-[#F0EDE6] text-muted-foreground"}`}
                    onClick={() => setIsActive(true)}
                  >
                    Aktif
                  </button>
                  <button
                    type="button"
                    className={`rounded-xl px-4 py-3 text-sm transition ${!isActive ? "bg-destructive/10 text-destructive" : "bg-[#F0EDE6] text-muted-foreground"}`}
                    onClick={() => setIsActive(false)}
                  >
                    Nonaktif
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-[#2C2C2C]">
                  Kategori Terpopuler
                </p>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  {defaultCategories.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-[#F0EDE6] px-3 py-1"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" /> Menyimpan...
                  </>
                ) : (
                  "Simpan Template"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
