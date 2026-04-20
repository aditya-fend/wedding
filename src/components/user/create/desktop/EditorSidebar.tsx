"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useEditorStore } from "@/store/useEditorStore";
import { InvitationContent } from "@/types/invitation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Palette,
  Music,
  User2,
  Heart,
  CalendarDays,
  ImageIcon,
  LayoutDashboard,
  Plus,
  Trash2,
  BookHeart,
  Wallet,
  MailCheck,
  MessageCircle,
  Sparkles,
  Flag,
  Eye,
  MousePointerClick,
  Play,
  Pause,
  Search,
  MapPin,
  Map as MapIconUI,
} from "lucide-react";
import dynamic from 'next/dynamic';
import { SectionCard } from "./SectionCard";
import { Music as MusicType, Template } from "@/types";

const MapPicker = dynamic(() => import('./MapPicker'), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-100 animate-pulse flex items-center justify-center">Memuat Peta...</div>
});

interface SidebarProps {
  templates: Template[];
  musics: MusicType[];
}

export function EditorSidebar({ templates, musics }: SidebarProps) {
  const {
    activeTemplate,
    setActiveTemplate,
    activeSection,
    setActiveSection,
    formData,
    setFormData,
  } = useEditorStore();

  const [musicSearchQuery, setMusicSearchQuery] = useState("");
  const [playingMusicId, setPlayingMusicId] = useState<string | null>(null);
  const [galleryDragActive, setGalleryDragActive] = useState(false);
  const [heroDragActive, setHeroDragActive] = useState(false);
  const [priaDragActive, setPriaDragActive] = useState(false);
  const [wanitaDragActive, setWanitaDragActive] = useState(false);
  const [storyDragActive, setStoryDragActive] = useState<number | null>(null);
  const [envelopeDragActive, setEnvelopeDragActive] = useState<number | null>(
    null,
  );
  const [isMapPickerOpen, setIsMapPickerOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Handle music playback
  useEffect(() => {
    if (!audioRef.current) return;

    const playingMusic = musics.find((m) => m.id === playingMusicId);

    if (playingMusic && playingMusic.url) {
      audioRef.current.src = playingMusic.url;
      audioRef.current.play().catch(() => {
        // Handle autoplay restrictions
        setPlayingMusicId(null);
      });
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [playingMusicId, musics]);

  const handleGalleryDrag = (
    event: React.DragEvent<HTMLDivElement>,
    active: boolean,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setGalleryDragActive(active);
  };

  const handleGalleryDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setGalleryDragActive(false);

    const files = Array.from(event.dataTransfer.files || []);
    const imageUrls = files
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => URL.createObjectURL(file));

    if (imageUrls.length > 0) {
      setFormData({ gallery: [...(formData.gallery || []), ...imageUrls] });
      return;
    }

    const textUrl = event.dataTransfer.getData("text/plain").trim();
    if (textUrl) {
      setFormData({ gallery: [...(formData.gallery || []), textUrl] });
    }
  };

  // Compute selected objects
  const selectedTemplate = templates.find(
    (template) => template.title === activeTemplate,
  );

  const selectedMusic = musics.find((m) => m.url === formData.music_url);

  // Filter music by search query
  const filteredMusics = musics.filter((m) =>
    m.title.toLowerCase().includes(musicSearchQuery.toLowerCase()),
  );

  // ── Helper: Update nested object field (mempelai_pria, mempelai_wanita) ──
  const updateField = (parent: string, field: string, value: string) => {
    const parentData =
      (formData as unknown as Record<string, unknown>)[parent] ?? {};
    setFormData({
      [parent]: { ...(parentData as Record<string, unknown>), [field]: value },
    });
  };

  // ── Helper: Update an item inside an array field ──
  const updateArrayField = (
    parent: keyof InvitationContent,
    index: number,
    field: string,
    value: string,
  ) => {
    const currentArray = [...((formData[parent] as unknown[]) || [])];
    currentArray[index] = {
      ...(currentArray[index] as Record<string, unknown>),
      [field]: value,
    };
    setFormData({ [parent]: currentArray });
  };

  // ── Helper: Add a new item to an array field ──
  const addArrayItem = (
    parent: keyof InvitationContent,
    template: Record<string, string>,
  ) => {
    const currentArray = [...((formData[parent] as unknown[]) || [])];
    currentArray.push(template);
    setFormData({ [parent]: currentArray });
  };

  // ── Helper: Remove an item from an array field ──
  const removeArrayItem = (parent: keyof InvitationContent, index: number) => {
    const currentArray = [...((formData[parent] as unknown[]) || [])];
    currentArray.splice(index, 1);
    setFormData({ [parent]: currentArray });
  };

  return (
    <aside
      className="flex flex-col h-full w-full shrink-0 border-r border-[#E5E0D8]"
      style={{ backgroundColor: "var(--color-background, #F8F5F0)" }}
    >
      {/* ── HEADER & GLOBAL SETTINGS ── */}

      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar no-scrollbar">
        <div className="space-y-2">
          <Label className="text-[9px] font-black uppercase text-slate-500 flex items-center gap-2">
            <Palette className="size-3 text-[#D4AF97]" /> Template
          </Label>

          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="group flex w-full items-center justify-between rounded-3xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-[#D4AF97] hover:bg-[#F8F5F0]"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400 font-bold">
                    Template Aktif
                  </p>
                  <h3 className="mt-2 text-sm font-semibold text-[#2C2C2C]">
                    {selectedTemplate?.title ?? "Pilih Template"}
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">
                    {selectedTemplate?.description ??
                      "Klik untuk memilih layout undangan."}
                  </p>
                </div>
                <span className="rounded-full border border-[#D4AF97] bg-[#F8F5F0] px-3 py-2 text-[11px] font-bold text-[#2C2C2C]">
                  Ubah
                </span>
              </button>
            </DialogTrigger>

            <DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] overflow-y-auto rounded-[32px] p-6 sm:p-8 no-scrollbar">
              <DialogHeader>
                <DialogTitle>Pilih Template</DialogTitle>
                <DialogDescription>
                  Pilih template undangan yang ingin digunakan. Klik tombol
                  &quot;Gunakan&quot; pada card yang sesuai untuk menyimpan
                  pilihan.
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 mt-6">
                {templates.map((template) => {
                  const isSelected = template.id === activeTemplate;

                  return (
                    <Card
                      key={template.id}
                      className={
                        "group overflow-hidden rounded-[28px] border transition duration-300 " +
                        (isSelected
                          ? "border-[#D4AF97] shadow-lg"
                          : "border-[#E5E0D8] hover:border-[#D4AF97] hover:shadow-xl")
                      }
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                        {template.thumbnailUrl ? (
                          <Image
                            src={template.thumbnailUrl}
                            alt={template.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[#D4AF97]/40">
                            <LayoutDashboard className="size-12" />
                          </div>
                        )}
                      </div>

                      <CardContent className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-base font-semibold text-[#2C2C2C]">
                              {template.title}
                            </h3>
                            <p className="mt-1 text-sm text-[#6B6B6B] line-clamp-2">
                              {template.description ??
                                "Template undangan digital eksklusif."}
                            </p>
                          </div>
                          {isSelected ? (
                            <span className="rounded-full bg-[#D4AF97]/20 px-2.5 py-1 text-[11px] font-semibold text-[#2C2C2C]">
                              Dipilih
                            </span>
                          ) : null}
                        </div>
                      </CardContent>

                      <CardFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="w-full sm:w-auto"
                        >
                          <a
                            href={template.previewUrl ?? "#"}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Eye className="size-4 mr-2" /> Preview
                          </a>
                        </Button>

                        <DialogClose asChild>
                          <Button
                            size="sm"
                            className="w-full sm:w-auto"
                            onClick={() => {
                              setActiveTemplate(template.title);
                            }}
                          >
                            <MousePointerClick className="size-4 mr-2" />{" "}
                            Gunakan
                          </Button>
                        </DialogClose>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>

              <DialogFooter className="justify-end">
                <DialogClose asChild>
                  <Button variant="ghost" size="sm">
                    Tutup
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-2">
          <Label className="text-[9px] font-black uppercase text-slate-500 flex items-center gap-2">
            <Music className="size-3 text-[#D4AF97]" /> Musik Latar
          </Label>

          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="group flex w-full items-center justify-between rounded-3xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-[#D4AF97] hover:bg-[#F8F5F0]"
              >
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400 font-bold">
                    Musik Aktif
                  </p>
                  <h3 className="mt-2 text-sm font-semibold text-[#2C2C2C]">
                    {selectedMusic?.title ?? "Pilih Musik"}
                  </h3>
                  <p className="mt-1 text-[11px] text-slate-500 line-clamp-1">
                    {selectedMusic?.artist || "Klik untuk memilih musik latar"}
                  </p>
                </div>
                <span className="rounded-full border border-[#D4AF97] bg-[#F8F5F0] px-3 py-2 text-[11px] font-bold text-[#2C2C2C] ml-3">
                  Ubah
                </span>
              </button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto rounded-[32px] p-6 sm:p-8 no-scrollbar">
              <DialogHeader>
                <DialogTitle>Pilih Musik Latar</DialogTitle>
                <DialogDescription>
                  Pilih musik yang cocok untuk undangan Anda. Tekan tombol play
                  untuk preview.
                </DialogDescription>
              </DialogHeader>

              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input
                  placeholder="Cari musik berdasarkan judul..."
                  value={musicSearchQuery}
                  onChange={(e) => setMusicSearchQuery(e.target.value)}
                  className="pl-10 rounded-xl border-slate-200 bg-white"
                />
              </div>

              {/* Music List */}
              <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto rounded-xl border border-slate-100 p-4 bg-slate-50/30">
                {filteredMusics.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                    <Music className="size-8 mb-2 opacity-30" />
                    <p className="text-sm">Musik tidak ditemukan</p>
                  </div>
                ) : (
                  filteredMusics.map((music) => {
                    const isSelected = music.url === formData.music_url;
                    const isPlaying = playingMusicId === music.id;

                    return (
                      <div
                        key={music.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 transition cursor-pointer ${
                          isSelected
                            ? "border-[#D4AF97] bg-[#D4AF97]/5"
                            : "border-slate-200 hover:border-[#D4AF97] bg-white"
                        }`}
                        onClick={() => setFormData({ music_url: music.url })}
                      >
                        {/* Play Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPlayingMusicId(isPlaying ? null : music.id);
                          }}
                          className="p-2 rounded-lg bg-[#D4AF97] text-white hover:bg-[#C39E86] transition shrink-0"
                        >
                          {isPlaying ? (
                            <Pause className="size-4" />
                          ) : (
                            <Play className="size-4" />
                          )}
                        </button>

                        {/* Music Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-[#2C2C2C] truncate">
                            {music.title}
                          </h4>
                          <p className="text-xs text-slate-500 truncate">
                            {music.artist || "Artist tidak tersedia"}
                          </p>
                        </div>

                        {/* Selected Badge */}
                        {isSelected && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF97] text-white text-[10px] font-bold uppercase tracking-wider shrink-0">
                            Dipilih
                          </span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              <DialogFooter className="justify-end">
                <DialogClose asChild>
                  <Button variant="ghost" size="sm">
                    Tutup
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        {/* ═══════════════════════════════════════════
            Section: Mempelai Pria
        ═══════════════════════════════════════════ */}
        <SectionCard
          title="Mempelai Pria"
          icon={User2}
          isActive={activeSection === "mempelai_pria"}
          onClick={() =>
            setActiveSection(
              activeSection === "mempelai_pria" ? "" : "mempelai_pria",
            )
          }
        >
          <div className="flex flex-col gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Foto Mempelai Pria
              </Label>
              <div
                className={`group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-all ${
                  priaDragActive
                    ? "border-[#D4AF97] bg-[#ECFDF5]"
                    : "border-slate-200 bg-white hover:border-[#D4AF97]"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setPriaDragActive(true);
                }}
                onDragLeave={() => setPriaDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setPriaDragActive(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file && file.type.startsWith("image/")) {
                    const url = URL.createObjectURL(file);
                    updateField("mempelai_pria", "foto", url);
                  }
                }}
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      updateField("mempelai_pria", "foto", url);
                    }
                  };
                  input.click();
                }}
              >
                {formData.mempelai_pria?.foto ? (
                  <>
                    <Image
                      src={formData.mempelai_pria.foto}
                      alt="Groom Preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="rounded-full bg-white/90 p-2 text-[#2C2C2C] shadow-lg">
                        <ImageIcon size={16} />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400">
                    <ImageIcon size={24} className="opacity-40" />
                    <p className="text-[10px] font-bold uppercase tracking-wider">
                      Drop atau Klik Foto
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Nama Lengkap & Gelar
              </Label>
              <Input
                value={formData.mempelai_pria?.nama || ""}
                onChange={(e) =>
                  updateField("mempelai_pria", "nama", e.target.value)
                }
                placeholder="Aditya Pratama, S.Kom"
                className="rounded-xl border-slate-200 bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Nama Ayah
                </Label>
                <Input
                  value={formData.mempelai_pria?.ortu_ayah || ""}
                  onChange={(e) =>
                    updateField("mempelai_pria", "ortu_ayah", e.target.value)
                  }
                  placeholder="Nama ayah"
                  className="rounded-xl bg-white text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Nama Ibu
                </Label>
                <Input
                  value={formData.mempelai_pria?.ortu_ibu || ""}
                  onChange={(e) =>
                    updateField("mempelai_pria", "ortu_ibu", e.target.value)
                  }
                  placeholder="Nama ibu"
                  className="rounded-xl bg-white text-xs"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Instagram
              </Label>
              <Input
                value={formData.mempelai_pria?.instagram || ""}
                onChange={(e) =>
                  updateField("mempelai_pria", "instagram", e.target.value)
                }
                placeholder="@username"
                className="rounded-xl bg-white"
              />
            </div>
          </div>
        </SectionCard>

        {/* ═══════════════════════════════════════════
            Section: Mempelai Wanita
        ═══════════════════════════════════════════ */}
        <SectionCard
          title="Mempelai Wanita"
          icon={Heart}
          isActive={activeSection === "mempelai_wanita"}
          onClick={() =>
            setActiveSection(
              activeSection === "mempelai_wanita" ? "" : "mempelai_wanita",
            )
          }
        >
          <div className="flex flex-col gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Foto Mempelai Wanita
              </Label>
              <div
                className={`group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-all ${
                  wanitaDragActive
                    ? "border-[#D4AF97] bg-[#ECFDF5]"
                    : "border-slate-200 bg-white hover:border-[#D4AF97]"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setWanitaDragActive(true);
                }}
                onDragLeave={() => setWanitaDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setWanitaDragActive(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file && file.type.startsWith("image/")) {
                    const url = URL.createObjectURL(file);
                    updateField("mempelai_wanita", "foto", url);
                  }
                }}
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      updateField("mempelai_wanita", "foto", url);
                    }
                  };
                  input.click();
                }}
              >
                {formData.mempelai_wanita?.foto ? (
                  <>
                    <Image
                      src={formData.mempelai_wanita.foto}
                      alt="Bride Preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="rounded-full bg-white/90 p-2 text-[#2C2C2C] shadow-lg">
                        <ImageIcon size={16} />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400">
                    <ImageIcon size={24} className="opacity-40" />
                    <p className="text-[10px] font-bold uppercase tracking-wider">
                      Drop atau Klik Foto
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Nama Lengkap & Gelar
              </Label>
              <Input
                value={formData.mempelai_wanita?.nama || ""}
                onChange={(e) =>
                  updateField("mempelai_wanita", "nama", e.target.value)
                }
                placeholder="Aura Putri Kusuma, B.A"
                className="rounded-xl border-slate-200 bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Nama Ayah
                </Label>
                <Input
                  value={formData.mempelai_wanita?.ortu_ayah || ""}
                  onChange={(e) =>
                    updateField("mempelai_wanita", "ortu_ayah", e.target.value)
                  }
                  placeholder="Nama ayah"
                  className="rounded-xl bg-white text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Nama Ibu
                </Label>
                <Input
                  value={formData.mempelai_wanita?.ortu_ibu || ""}
                  onChange={(e) =>
                    updateField("mempelai_wanita", "ortu_ibu", e.target.value)
                  }
                  placeholder="Nama ibu"
                  className="rounded-xl bg-white text-xs"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Instagram
              </Label>
              <Input
                value={formData.mempelai_wanita?.instagram || ""}
                onChange={(e) =>
                  updateField("mempelai_wanita", "instagram", e.target.value)
                }
                placeholder="@username"
                className="rounded-xl bg-white"
              />
            </div>
          </div>
        </SectionCard>

        {/* ═══════════════════════════════════════════
            Section: Cover / Pembuka
        ═══════════════════════════════════════════ */}
        <SectionCard
          title="Cover / Pembuka"
          icon={Sparkles}
          isActive={activeSection === "cover"}
          onClick={() =>
            setActiveSection(activeSection === "cover" ? "" : "cover")
          }
        >
          <div className="flex flex-col gap-4">
            <div className="space-y-3">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Hero Image / Foto Utama
              </Label>

              <div
                className={`group relative aspect-video cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-all ${
                  heroDragActive
                    ? "border-[#D4AF97] bg-[#ECFDF5]"
                    : "border-slate-200 bg-white hover:border-[#D4AF97]"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setHeroDragActive(true);
                }}
                onDragLeave={() => setHeroDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setHeroDragActive(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file && file.type.startsWith("image/")) {
                    const url = URL.createObjectURL(file);
                    setFormData({ hero_image: url });
                  }
                }}
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setFormData({ hero_image: url });
                    }
                  };
                  input.click();
                }}
              >
                {formData.hero_image ? (
                  <>
                    <Image
                      src={formData.hero_image}
                      alt="Hero Preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="rounded-full bg-white/90 p-2 text-[#2C2C2C] shadow-lg">
                        <ImageIcon size={16} />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400">
                    <ImageIcon size={24} className="opacity-40" />
                    <p className="text-[10px] font-bold uppercase tracking-wider">
                      Drop atau Klik Foto
                    </p>
                  </div>
                )}
              </div>

              <div className="relative">
                <Input
                  value={formData.hero_image || ""}
                  onChange={(e) => setFormData({ hero_image: e.target.value })}
                  placeholder="Atau masukkan URL gambar..."
                  className="rounded-xl bg-white text-xs pl-8"
                />
                <ImageIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-300" />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ═══════════════════════════════════════════
            Section: Jadwal Acara
        ═══════════════════════════════════════════ */}
        <SectionCard
          title="Jadwal Acara"
          icon={CalendarDays}
          isActive={activeSection === "acara"}
          onClick={() =>
            setActiveSection(activeSection === "acara" ? "" : "acara")
          }
        >
          <div className="flex flex-col gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Tanggal Pernikahan
              </Label>
              <Input
                type="date"
                value={formData.wedding_date || ""}
                onChange={(e) => setFormData({ wedding_date: e.target.value })}
                className="h-10 rounded-xl bg-white"
              />
              <p className="text-[10px] text-slate-500 italic">
                Pilih tanggal lewat kalender untuk mengisi otomatis.
              </p>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-50">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Nama Tempat Utama
              </Label>
              <Input
                value={formData.acara?.[0]?.lokasi || ""}
                onChange={(e) => {
                  const newAcara = [...(formData.acara || [])];
                  if (newAcara.length === 0) {
                    newAcara.push({
                      tipe: "Utama",
                      lokasi: e.target.value,
                      tanggal: formData.wedding_date || "",
                      jam: "",
                      alamat_lengkap: "",
                      link_maps: "",
                    });
                  } else {
                    newAcara[0] = { ...newAcara[0], lokasi: e.target.value };
                  }
                  setFormData({ acara: newAcara });
                }}
                placeholder="Contoh: Grand Ballroom / Kediaman"
                className="h-10 rounded-xl bg-white"
              />
              <p className="text-[9px] text-slate-500 italic">
                Saran: Isi dengan nama gedung, aula, atau nama tempat utama.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Alamat Lengkap / Detail Lokasi
              </Label>
              <Textarea
                value={formData.acara?.[0]?.alamat_lengkap || ""}
                onChange={(e) => {
                  const newAcara = [...(formData.acara || [])];
                  if (newAcara.length === 0) {
                    newAcara.push({
                      tipe: "Utama",
                      alamat_lengkap: e.target.value,
                      tanggal: formData.wedding_date || "",
                      jam: "",
                      lokasi: "",
                      link_maps: "",
                    });
                  } else {
                    newAcara[0] = {
                      ...newAcara[0],
                      alamat_lengkap: e.target.value,
                    };
                  }
                  setFormData({ acara: newAcara });
                }}
                placeholder="Jl. Raya No. 123, RT 01/02, Desa..."
                className="rounded-xl bg-white min-h-[80px] text-sm"
              />
              <p className="text-[10px] text-amber-600 font-medium bg-amber-50 p-2 rounded-lg border border-amber-100 mt-1">
                ⚠️ Mohon lengkapi alamat jika hasil dari peta belum detail
                (tambahkan RT/RW atau keterangan patokan).
              </p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Link Google Maps
              </Label>
              <div className="flex gap-2">
                <Input
                  value={formData.acara?.[0]?.link_maps || ""}
                  onChange={(e) => {
                    const newAcara = [...(formData.acara || [])];
                    if (newAcara.length === 0) {
                      newAcara.push({
                        tipe: "Utama",
                        link_maps: e.target.value,
                        tanggal: formData.wedding_date || "",
                        jam: "",
                        alamat_lengkap: "",
                        lokasi: "",
                      });
                    } else {
                      newAcara[0] = {
                        ...newAcara[0],
                        link_maps: e.target.value,
                      };
                    }
                    setFormData({ acara: newAcara });
                  }}
                  placeholder="https://maps.app.goo.gl/..."
                  className="h-10 rounded-xl bg-white flex-1"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="rounded-xl shrink-0"
                  onClick={() => setIsMapPickerOpen(true)}
                >
                  <MapIconUI className="size-4" />
                </Button>
              </div>
              <p className="text-[9px] text-slate-500 italic">
                Buka Peta untuk memilih lokasi secara interaktif di maps.
              </p>
            </div>

            <MapPicker
              isOpen={isMapPickerOpen}
              onClose={() => setIsMapPickerOpen(false)}
              onConfirm={({ address, link }) => {
                const newAcara = [...(formData.acara || [])];
                const updateData = { link_maps: link, alamat_lengkap: address };

                if (newAcara.length === 0) {
                  newAcara.push({
                    tipe: "Utama",
                    tanggal: formData.wedding_date || "",
                    jam: "",
                    lokasi: "", // Biarkan user mengisi manual
                    ...updateData,
                  });
                } else {
                  newAcara[0] = { ...newAcara[0], ...updateData };
                }

                setFormData({ acara: newAcara });
                setIsMapPickerOpen(false);
              }}
            />
          </div>
        </SectionCard>

        {/* ═══════════════════════════════════════════
            Section: Detail Acara
        ═══════════════════════════════════════════ */}
        <SectionCard
          title="Detail Acara"
          icon={CalendarDays}
          isActive={activeSection === "event_details"}
          onClick={() =>
            setActiveSection(
              activeSection === "event_details" ? "" : "event_details",
            )
          }
        >
          <div className="flex flex-col gap-6">
            {formData.acara?.map((event, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50/50 relative group"
              >
                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => removeArrayItem("acara", idx)}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600"
                >
                  <Trash2 className="size-3.5" />
                </button>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Nama Acara
                  </Label>
                  <Input
                    value={event.tipe}
                    onChange={(e) =>
                      updateArrayField("acara", idx, "tipe", e.target.value)
                    }
                    placeholder="Contoh: Akad Nikah / Resepsi"
                    className="h-8 rounded-lg bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Jam Acara
                  </Label>
                  <Input
                    value={event.jam}
                    onChange={(e) =>
                      updateArrayField("acara", idx, "jam", e.target.value)
                    }
                    placeholder="Contoh: 08:00 - 10:00 WIB"
                    className="h-8 rounded-lg bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Nama Tempat
                  </Label>
                  <Input
                    value={event.lokasi}
                    onChange={(e) =>
                      updateArrayField("acara", idx, "lokasi", e.target.value)
                    }
                    placeholder="Contoh: Gedung Serbaguna"
                    className="h-8 rounded-lg bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Alamat Lengkap
                  </Label>
                  <Textarea
                    value={event.alamat_lengkap}
                    onChange={(e) =>
                      updateArrayField(
                        "acara",
                        idx,
                        "alamat_lengkap",
                        e.target.value,
                      )
                    }
                    placeholder="Jl. Raya No. 123..."
                    className="min-h-[60px] rounded-lg bg-white resize-none text-xs"
                  />
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-xl border-dashed border-[#D4AF97] text-[#D4AF97] hover:bg-[#F8F5F0]"
              onClick={() =>
                addArrayItem("acara", {
                  tipe: "",
                  jam: "",
                  lokasi: "",
                  alamat_lengkap: "",
                  tanggal: formData.wedding_date || "",
                  link_maps: "",
                })
              }
            >
              <Plus className="size-4 mr-2" /> Tambah Sesi Acara
            </Button>
          </div>
        </SectionCard>

        {/* ═══════════════════════════════════════════
            Section: Cerita Cinta (Love Story)
        ═══════════════════════════════════════════ */}
        <SectionCard
          title="Cerita Cinta"
          icon={BookHeart}
          isActive={activeSection === "love_story"}
          onClick={() =>
            setActiveSection(activeSection === "love_story" ? "" : "love_story")
          }
        >
          <div className="flex flex-col gap-6">
            {formData.love_story?.map((story, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50/50 relative group"
              >
                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => removeArrayItem("love_story", idx)}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600"
                >
                  <Trash2 className="size-3.5" />
                </button>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Tahun
                  </Label>
                  <Input
                    value={story.tahun}
                    onChange={(e) =>
                      updateArrayField(
                        "love_story",
                        idx,
                        "tahun",
                        e.target.value,
                      )
                    }
                    placeholder="2020"
                    className="h-8 rounded-lg bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Cerita
                  </Label>
                  <Textarea
                    value={story.cerita}
                    onChange={(e) =>
                      updateArrayField(
                        "love_story",
                        idx,
                        "cerita",
                        e.target.value,
                      )
                    }
                    placeholder="Ceritakan momen spesial kalian..."
                    className="min-h-[80px] rounded-lg bg-white resize-none text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Foto Cerita
                  </Label>
                  <div
                    className={`group relative aspect-video cursor-pointer overflow-hidden rounded-xl border-2 border-dashed transition-all ${
                      storyDragActive === idx
                        ? "border-[#D4AF97] bg-[#ECFDF5]"
                        : "border-slate-200 bg-white hover:border-[#D4AF97]"
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setStoryDragActive(idx);
                    }}
                    onDragLeave={() => setStoryDragActive(null)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setStoryDragActive(null);
                      const file = e.dataTransfer.files?.[0];
                      if (file && file.type.startsWith("image/")) {
                        const url = URL.createObjectURL(file);
                        updateArrayField("love_story", idx, "foto", url);
                      }
                    }}
                    onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "image/*";
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          updateArrayField("love_story", idx, "foto", url);
                        }
                      };
                      input.click();
                    }}
                  >
                    {story.foto ? (
                      <>
                        <Image
                          src={story.foto}
                          alt="Story Preview"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="rounded-full bg-white/90 p-2 text-[#2C2C2C] shadow-lg">
                            <ImageIcon size={14} />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-1 text-slate-400">
                        <ImageIcon size={20} className="opacity-40" />
                        <p className="text-[9px] font-bold uppercase tracking-wider">
                          Drop atau Klik Foto
                        </p>
                      </div>
                    )}
                  </div>
                  <Input
                    value={story.foto || ""}
                    onChange={(e) =>
                      updateArrayField(
                        "love_story",
                        idx,
                        "foto",
                        e.target.value,
                      )
                    }
                    placeholder="Atau URL gambar..."
                    className="h-8 rounded-lg bg-white text-[10px]"
                  />
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-xl border-dashed border-[#D4AF97] text-[#D4AF97] hover:bg-[#F8F5F0]"
              onClick={() =>
                addArrayItem("love_story", {
                  tahun: "",
                  cerita: "",
                  foto: "",
                })
              }
            >
              <Plus className="size-4 mr-2" /> Tambah Cerita
            </Button>
          </div>
        </SectionCard>

        {/* ═══════════════════════════════════════════
            Section: Galeri Foto
        ═══════════════════════════════════════════ */}
        <SectionCard
          title="Galeri Foto"
          icon={ImageIcon}
          isActive={activeSection === "gallery"}
          onClick={() =>
            setActiveSection(activeSection === "gallery" ? "" : "gallery")
          }
        >
          <div className="flex flex-col gap-4">
            <div
              className={`rounded-3xl border border-dashed p-4 text-center transition ${
                galleryDragActive
                  ? "border-[#D4AF97] bg-[#ECFDF5]"
                  : "border-slate-200 bg-white/90"
              }`}
              onDragOver={(e) => handleGalleryDrag(e, true)}
              onDragLeave={(e) => handleGalleryDrag(e, false)}
              onDrop={handleGalleryDrop}
            >
              <p className="text-sm font-semibold text-slate-600">
                Tarik dan lepas gambar di sini untuk menambah foto.
              </p>
              <p className="text-[10px] text-slate-400">
                Gambar akan muncul otomatis di galeri undangan.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {formData.gallery?.map((url, idx) => (
                <div
                  key={idx}
                  className="aspect-square rounded-lg bg-slate-200 overflow-hidden relative group"
                >
                  <Image
                    src={url}
                    alt="Gallery"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newGallery = [...(formData.gallery || [])];
                      newGallery.splice(idx, 1);
                      setFormData({ gallery: newGallery });
                    }}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  >
                    <Trash2 className="size-4 text-white" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="aspect-square rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:border-[#D4AF97] hover:text-[#D4AF97] transition-colors"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.multiple = true;
                  input.onchange = (e) => {
                    const files = Array.from(
                      (e.target as HTMLInputElement).files || [],
                    );
                    const urls = files.map((file) => URL.createObjectURL(file));
                    if (urls.length > 0) {
                      setFormData({
                        gallery: [...(formData.gallery || []), ...urls],
                      });
                    }
                  };
                  input.click();
                }}
              >
                <Plus size={20} />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold">
              Maksimal 12 Foto
            </p>
          </div>
        </SectionCard>

        {/* ═══════════════════════════════════════════
            Section: Amplop Digital (Digital Envelope)
        ═══════════════════════════════════════════ */}
        <SectionCard
          title="Amplop Digital"
          icon={Wallet}
          isActive={activeSection === "digital_envelope"}
          onClick={() =>
            setActiveSection(
              activeSection === "digital_envelope" ? "" : "digital_envelope",
            )
          }
        >
          <div className="flex flex-col gap-6">
            {formData.digital_envelope?.map((envelope, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50/50 relative group"
              >
                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => removeArrayItem("digital_envelope", idx)}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600"
                >
                  <Trash2 className="size-3.5" />
                </button>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Nama Bank
                  </Label>
                  <Input
                    value={envelope.bank_name}
                    onChange={(e) =>
                      updateArrayField(
                        "digital_envelope",
                        idx,
                        "bank_name",
                        e.target.value,
                      )
                    }
                    placeholder="BCA / Mandiri / BNI / dll"
                    className="h-8 rounded-lg bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Nomor Rekening
                  </Label>
                  <Input
                    value={envelope.account_number}
                    onChange={(e) =>
                      updateArrayField(
                        "digital_envelope",
                        idx,
                        "account_number",
                        e.target.value,
                      )
                    }
                    placeholder="1234567890"
                    className="h-8 rounded-lg bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Atas Nama
                  </Label>
                  <Input
                    value={envelope.account_holder}
                    onChange={(e) =>
                      updateArrayField(
                        "digital_envelope",
                        idx,
                        "account_holder",
                        e.target.value,
                      )
                    }
                    placeholder="Nama pemilik rekening"
                    className="h-8 rounded-lg bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    QRIS (Opsional)
                  </Label>
                  <div
                    className={`group relative aspect-square w-full max-w-[120px] mx-auto cursor-pointer overflow-hidden rounded-xl border-2 border-dashed transition-all ${
                      envelopeDragActive === idx
                        ? "border-[#D4AF97] bg-[#ECFDF5]"
                        : "border-slate-200 bg-white hover:border-[#D4AF97]"
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setEnvelopeDragActive(idx);
                    }}
                    onDragLeave={() => setEnvelopeDragActive(null)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setEnvelopeDragActive(null);
                      const file = e.dataTransfer.files?.[0];
                      if (file && file.type.startsWith("image/")) {
                        const url = URL.createObjectURL(file);
                        updateArrayField(
                          "digital_envelope",
                          idx,
                          "qris_url",
                          url,
                        );
                      }
                    }}
                    onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "image/*";
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          updateArrayField(
                            "digital_envelope",
                            idx,
                            "qris_url",
                            url,
                          );
                        }
                      };
                      input.click();
                    }}
                  >
                    {envelope.qris_url ? (
                      <>
                        <Image
                          src={envelope.qris_url}
                          alt="QRIS Preview"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="rounded-full bg-white/90 p-2 text-[#2C2C2C] shadow-lg">
                            <ImageIcon size={14} />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-1 text-slate-400">
                        <ImageIcon size={20} className="opacity-40" />
                        <p className="text-[8px] font-bold uppercase tracking-wider text-center px-2">
                          Drop atau Klik QRIS
                        </p>
                      </div>
                    )}
                  </div>
                  <Input
                    value={envelope.qris_url || ""}
                    onChange={(e) =>
                      updateArrayField(
                        "digital_envelope",
                        idx,
                        "qris_url",
                        e.target.value,
                      )
                    }
                    placeholder="Atau URL QRIS..."
                    className="h-8 rounded-lg bg-white text-[10px]"
                  />
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-xl border-dashed border-[#D4AF97] text-[#D4AF97] hover:bg-[#F8F5F0]"
              onClick={() =>
                addArrayItem("digital_envelope", {
                  bank_name: "",
                  account_number: "",
                  account_holder: "",
                  qris_url: "",
                })
              }
            >
              <Plus className="size-4 mr-2" /> Tambah Rekening
            </Button>
          </div>
        </SectionCard>

        {/* ═══════════════════════════════════════════
            Section: Dress Code / Informasi Tambahan
        ═══════════════════════════════════════════ */}
        <SectionCard
          title="Dress Code / Tambahan"
          icon={Flag}
          isActive={activeSection === "dress_code"}
          onClick={() =>
            setActiveSection(activeSection === "dress_code" ? "" : "dress_code")
          }
        >
          <div className="flex flex-col gap-4">
            {/* Dress Code Preset */}
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Preset Dress Code
              </Label>
              <select
                value={formData.dress_code || "Formal"}
                onChange={(e) => setFormData({ dress_code: e.target.value })}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-700 outline-none focus:border-[#D4AF97] transition-all appearance-none"
              >
                <option value="Formal">Formal</option>
                <option value="Semi Formal">Semi Formal</option>
                <option value="Batik">Batik</option>
                <option value="Casual">Casual</option>
                <option value="Traditional">Traditional</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            {/* Color Palette (Max 3) */}
            <div className="space-y-2">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Warna Dress Code (Maks 3)
              </Label>
              <div className="flex flex-wrap gap-3">
                {formData.dress_code_colors?.map((color, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-1.5 flex-1 min-w-[100px]"
                  >
                    <div className="flex items-center gap-2">
                      <Input
                        type="color"
                        value={color}
                        onChange={(e) => {
                          const newColors = [
                            ...(formData.dress_code_colors || []),
                          ];
                          newColors[idx] = e.target.value;
                          setFormData({ dress_code_colors: newColors });
                        }}
                        className="w-10 h-10 p-1 rounded-xl cursor-pointer border-slate-200"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newColors = [
                            ...(formData.dress_code_colors || []),
                          ];
                          newColors.splice(idx, 1);
                          setFormData({ dress_code_colors: newColors });
                        }}
                        className="p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-100"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <Input
                      value={color}
                      onChange={(e) => {
                        const newColors = [
                          ...(formData.dress_code_colors || []),
                        ];
                        newColors[idx] = e.target.value;
                        setFormData({ dress_code_colors: newColors });
                      }}
                      className="h-8 text-[10px] uppercase font-mono rounded-lg bg-white"
                    />
                  </div>
                ))}
                {(formData.dress_code_colors?.length || 0) < 3 && (
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        dress_code_colors: [
                          ...(formData.dress_code_colors || []),
                          "#FFFFFF",
                        ],
                      });
                    }}
                    className="w-10 h-10 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:border-[#D4AF97] hover:text-[#D4AF97]"
                  >
                    <Plus size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Catatan Dress Code
              </Label>
              <Textarea
                value={formData.dress_code_description || ""}
                onChange={(e) =>
                  setFormData({ dress_code_description: e.target.value })
                }
                placeholder="Misal: Tamu pria menggunakan batik lengan panjang..."
                className="min-h-[80px] rounded-xl bg-white resize-none text-xs"
              />
            </div>

            {/* Additional Info List */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Informasi Tambahan (List)
              </Label>
              <div className="flex flex-col gap-2">
                {formData.additional_info_list?.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => {
                        const newList = [
                          ...(formData.additional_info_list || []),
                        ];
                        newList[idx] = e.target.value;
                        setFormData({ additional_info_list: newList });
                      }}
                      placeholder={`Info item #${idx + 1}`}
                      className="h-8 text-xs rounded-lg bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newList = [
                          ...(formData.additional_info_list || []),
                        ];
                        newList.splice(idx, 1);
                        setFormData({ additional_info_list: newList });
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFormData({
                      additional_info_list: [
                        ...(formData.additional_info_list || []),
                        "",
                      ],
                    });
                  }}
                  className="text-[10px] text-[#D4AF97] self-start h-7 hover:bg-transparent"
                >
                  <Plus size={12} className="mr-1" /> Tambah Item Info
                </Button>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Penutup"
          icon={Heart}
          isActive={activeSection === "closing"}
          onClick={() =>
            setActiveSection(activeSection === "closing" ? "" : "closing")
          }
        >
          <div className="flex flex-col gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Ucapan Terima Kasih
              </Label>
              <Textarea
                value={formData.closing_message || ""}
                onChange={(e) =>
                  setFormData({ closing_message: e.target.value })
                }
                placeholder="Terima kasih atas doa dan kehadiranmu..."
                className="min-h-[100px] rounded-xl bg-white resize-none text-xs"
              />
            </div>
          </div>
        </SectionCard>
      </div>

      {/* AudioPlayer for music preview */}
      <audio
        ref={audioRef}
        crossOrigin="anonymous"
        onEnded={() => setPlayingMusicId(null)}
      />
    </aside>
  );
}
