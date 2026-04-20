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
import MapPicker from "./MapPicker";
import { SectionCard } from "./SectionCard";
import { Music as MusicType, Template } from "@/types";

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
  const [dragStates, setDragStates] = useState({
    gallery: false,
    hero: false,
    pria: false,
    wanita: false,
    story: null as number | null,
    envelope: null as number | null,
  });
  
  const [isMapPickerOpen, setIsMapPickerOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Music Playback Logic
  useEffect(() => {
    if (!audioRef.current) return;
    const playingMusic = musics.find((m) => m.id === playingMusicId);

    if (playingMusic?.url) {
      audioRef.current.src = playingMusic.url;
      audioRef.current.play().catch(() => setPlayingMusicId(null));
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [playingMusicId, musics]);

  // Generic Image Upload Handler
  const handleFileUpload = (
    file: File | undefined,
    callback: (url: string) => void
  ) => {
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      callback(url);
    }
  };

  // Helper: Update Nested Fields
  const updateField = (parent: keyof InvitationContent, field: string, value: any) => {
    const parentData = (formData[parent] as Record<string, any>) || {};
    setFormData({
      [parent]: { ...parentData, [field]: value },
    });
  };

  // Helper: Update Array Items
  const updateArrayField = (
    parent: keyof InvitationContent,
    index: number,
    field: string,
    value: any
  ) => {
    const currentArray = [...((formData[parent] as any[]) || [])];
    if (currentArray[index]) {
      currentArray[index] = { ...currentArray[index], [field]: value };
      setFormData({ [parent]: currentArray });
    }
  };

  const addArrayItem = (parent: keyof InvitationContent, initialValue: any) => {
    const currentArray = [...((formData[parent] as any[]) || [])];
    currentArray.push(initialValue);
    setFormData({ [parent]: currentArray });
  };

  const removeArrayItem = (parent: keyof InvitationContent, index: number) => {
    const currentArray = [...((formData[parent] as any[]) || [])];
    currentArray.splice(index, 1);
    setFormData({ [parent]: currentArray });
  };

  const selectedTemplate = templates.find((t) => t.title === activeTemplate);
  const selectedMusic = musics.find((m) => m.url === formData.music_url);
  const filteredMusics = musics.filter((m) =>
    m.title.toLowerCase().includes(musicSearchQuery.toLowerCase())
  );

  return (
    <aside
      className="flex flex-col h-full w-full shrink-0 border-r border-[#E5E0D8]"
      style={{ backgroundColor: "#F8F5F0" }}
    >
      {/* ── HEADER ── */}
      <div className="p-6 space-y-6 shrink-0 border-b border-[#E5E0D8]/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#D4AF97] rounded-lg text-white shadow-sm">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tighter text-[#2C2C2C] uppercase leading-none">
              Editor
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">
              Undang Dong Engine
            </p>
          </div>
        </div>

        {/* Template Selector */}
        <div className="space-y-2">
          <Label className="text-[9px] font-black uppercase text-slate-500 flex items-center gap-2">
            <Palette className="size-3 text-[#D4AF97]" /> Template
          </Label>
          <Dialog>
            <DialogTrigger asChild>
              <button className="group flex w-full items-center justify-between rounded-3xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-[#D4AF97] hover:bg-[#FDFCFB]">
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Aktif</p>
                  <h3 className="mt-1 text-sm font-bold text-[#2C2C2C]">{selectedTemplate?.title ?? "Pilih Template"}</h3>
                </div>
                <span className="rounded-full border border-[#D4AF97] px-3 py-1.5 text-[10px] font-bold text-[#D4AF97] group-hover:bg-[#D4AF97] group-hover:text-white transition-colors">
                  UBAH
                </span>
              </button>
            </DialogTrigger>
<DialogContent className="!max-w-5xl w-[95vw] h-[90vh] flex flex-col rounded-[32px] border-none shadow-2xl p-0 bg-[#FDFCFB] overflow-hidden">

  {/* HEADER */}
  <DialogHeader className="p-8 pb-4 bg-white/70 backdrop-blur-md border-b border-slate-100 shrink-0">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-[#D4AF97]/10 rounded-lg">
        <Palette className="size-5 text-[#D4AF97]" />
      </div>
      <DialogTitle className="text-2xl font-black text-[#2C2C2C]">
        Koleksi Template
      </DialogTitle>
    </div>
    <DialogDescription className="text-slate-500 font-medium">
      Pilih desain yang mencerminkan karakter unik hari bahagia Anda.
    </DialogDescription>
  </DialogHeader>

  {/* SCROLL AREA */}
  <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {templates.map((template) => {
        const isSelected = activeTemplate === template.title;

        return (
          <Card
            key={template.id}
            className={`group relative flex flex-col overflow-visible rounded-[24px] border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
              isSelected
                ? "border-[#D4AF97] ring-4 ring-[#D4AF97]/5 bg-white"
                : "border-slate-100 bg-white hover:border-[#D4AF97]/30"
            }`}
          >
            
            {/* BADGE */}
            {isSelected && (
              <div className="absolute top-3 left-3 z-20">
                <div className="flex items-center gap-1.5 bg-[#D4AF97] text-white px-3 py-1 rounded-full shadow-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-[10px] font-black uppercase">
                    Aktif
                  </span>
                </div>
              </div>
            )}

            {/* IMAGE */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-t-[24px] bg-slate-50">
              {template.thumbnailUrl ? (
                <Image
                  src={template.thumbnailUrl}
                  alt={template.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ImageIcon className="size-10 text-slate-200" />
                </div>
              )}
            </div>

            {/* CONTENT */}
            <CardContent className="p-5 flex-1">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-extrabold text-[#2C2C2C] text-lg group-hover:text-[#D4AF97] transition-colors">
                  {template.title}
                </h4>
                <span className="text-[9px] font-bold text-slate-400 border px-2 py-0.5 rounded uppercase">
                  {template.category || "Premium"}
                </span>
              </div>

              <p className="text-xs text-slate-500 line-clamp-2">
                {template.description || "Desain eksklusif modern."}
              </p>
            </CardContent>

            {/* FOOTER */}
            <CardFooter className="p-5 pt-0 flex gap-3">
              <Button
                variant="outline"
                className="flex-[0.4] h-10 rounded-xl text-[11px]"
                asChild
              >
                <a href={template.previewUrl} target="_blank">
                  PREVIEW
                </a>
              </Button>

              <DialogClose asChild>
                <Button
                  className={`flex-1 h-10 rounded-xl text-[11px] ${
                    isSelected
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-[#2C2C2C] text-white hover:bg-[#D4AF97]"
                  }`}
                  onClick={() =>
                    !isSelected && setActiveTemplate(template.title)
                  }
                  disabled={isSelected}
                >
                  {isSelected ? "DIGUNAKAN" : "GUNAKAN"}
                </Button>
              </DialogClose>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  </div>

  {/* FOOTER */}
  <div className="p-4 bg-slate-50 border-t text-center shrink-0">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
      Responsive • Mobile Ready
    </p>
  </div>
</DialogContent>          </Dialog>
        </div>

        {/* Music Selector */}
        <div className="space-y-2">
          <Label className="text-[9px] font-black uppercase text-slate-500 flex items-center gap-2">
            <Music className="size-3 text-[#D4AF97]" /> Musik Latar
          </Label>
          <Dialog>
            <DialogTrigger asChild>
              <button className="group flex w-full items-center justify-between rounded-3xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-[#D4AF97]">
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Musik</p>
                  <h3 className="mt-1 text-sm font-bold text-[#2C2C2C] truncate">{selectedMusic?.title ?? "Tanpa Musik"}</h3>
                </div>
                <Music className="size-4 text-[#D4AF97]" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md rounded-[32px]">
              <DialogHeader>
                <DialogTitle>Pilih Playlist</DialogTitle>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <Input 
                    placeholder="Cari lagu..." 
                    className="pl-10 rounded-xl" 
                    value={musicSearchQuery}
                    onChange={(e) => setMusicSearchQuery(e.target.value)}
                  />
                </div>
              </DialogHeader>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {filteredMusics.map((music) => (
                  <div 
                    key={music.id} 
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${formData.music_url === music.url ? 'bg-[#D4AF97]/10 border border-[#D4AF97]' : 'hover:bg-slate-50'}`}
                    onClick={() => setFormData({ music_url: music.url })}
                  >
                    <button 
                      className="p-2 bg-[#D4AF97] rounded-full text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPlayingMusicId(playingMusicId === music.id ? null : music.id);
                      }}
                    >
                      {playingMusicId === music.id ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#2C2C2C]">{music.title}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">{music.artist}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* ── SECTIONS CONTENT ── */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
        {/* Mempelai Pria */}
        <SectionCard
          title="Mempelai Pria"
          icon={User2}
          isActive={activeSection === "mempelai_pria"}
          onClick={() => setActiveSection(activeSection === "mempelai_pria" ? "" : "mempelai_pria")}
        >
          <div className="space-y-4">
            <div 
              className={`relative aspect-[3/4] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden ${dragStates.pria ? 'border-[#D4AF97] bg-[#D4AF97]/5' : 'border-slate-200'}`}
              onDragOver={(e) => { e.preventDefault(); setDragStates(prev => ({...prev, pria: true})) }}
              onDragLeave={() => setDragStates(prev => ({...prev, pria: false}))}
              onDrop={(e) => {
                e.preventDefault();
                setDragStates(prev => ({...prev, pria: false}));
                handleFileUpload(e.dataTransfer.files?.[0], (url) => updateField("mempelai_pria", "foto", url));
              }}
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = (e) => handleFileUpload((e.target as HTMLInputElement).files?.[0], (url) => updateField("mempelai_pria", "foto", url));
                input.click();
              }}
            >
              {formData.mempelai_pria?.foto ? (
                <Image src={formData.mempelai_pria.foto} alt="Pria" fill className="object-cover" unoptimized />
              ) : (
                <>
                  <ImageIcon className="size-8 text-slate-300" />
                  <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase">Unggah Foto</p>
                </>
              )}
            </div>
            <Input 
              placeholder="Nama Lengkap" 
              value={formData.mempelai_pria?.nama || ""}
              onChange={(e) => updateField("mempelai_pria", "nama", e.target.value)}
              className="rounded-xl border-slate-200"
            />
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Ayah" className="rounded-xl text-xs" value={formData.mempelai_pria?.ortu_ayah || ""} onChange={(e) => updateField("mempelai_pria", "ortu_ayah", e.target.value)} />
              <Input placeholder="Ibu" className="rounded-xl text-xs" value={formData.mempelai_pria?.ortu_ibu || ""} onChange={(e) => updateField("mempelai_pria", "ortu_ibu", e.target.value)} />
            </div>
          </div>
        </SectionCard>

        {/* Mempelai Wanita */}
        <SectionCard
          title="Mempelai Wanita"
          icon={Heart}
          isActive={activeSection === "mempelai_wanita"}
          onClick={() => setActiveSection(activeSection === "mempelai_wanita" ? "" : "mempelai_wanita")}
        >
          <div className="space-y-4">
            <div 
              className="relative aspect-[3/4] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center border-slate-200 cursor-pointer overflow-hidden"
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = (e) => handleFileUpload((e.target as HTMLInputElement).files?.[0], (url) => updateField("mempelai_wanita", "foto", url));
                input.click();
              }}
            >
              {formData.mempelai_wanita?.foto ? (
                <Image src={formData.mempelai_wanita.foto} alt="Wanita" fill className="object-cover" unoptimized />
              ) : (
                <>
                  <ImageIcon className="size-8 text-slate-300" />
                  <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase">Unggah Foto</p>
                </>
              )}
            </div>
            <Input 
              placeholder="Nama Lengkap" 
              value={formData.mempelai_wanita?.nama || ""}
              onChange={(e) => updateField("mempelai_wanita", "nama", e.target.value)}
              className="rounded-xl border-slate-200"
            />
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Ayah" className="rounded-xl text-xs" value={formData.mempelai_wanita?.ortu_ayah || ""} onChange={(e) => updateField("mempelai_wanita", "ortu_ayah", e.target.value)} />
              <Input placeholder="Ibu" className="rounded-xl text-xs" value={formData.mempelai_wanita?.ortu_ibu || ""} onChange={(e) => updateField("mempelai_wanita", "ortu_ibu", e.target.value)} />
            </div>
          </div>
        </SectionCard>

        {/* Cover Section */}
        <SectionCard
          title="Cover & Hero"
          icon={Sparkles}
          isActive={activeSection === "cover"}
          onClick={() => setActiveSection(activeSection === "cover" ? "" : "cover")}
        >
          <div className="space-y-4">
            <div 
              className="relative aspect-video rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden cursor-pointer"
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = (e) => handleFileUpload((e.target as HTMLInputElement).files?.[0], (url) => setFormData({ hero_image: url }));
                input.click();
              }}
            >
              {formData.hero_image ? (
                <Image src={formData.hero_image} alt="Hero" fill className="object-cover" unoptimized />
              ) : (
                <p className="text-[10px] font-bold text-slate-400 uppercase text-center px-4">Hero Image (Landscape disarankan)</p>
              )}
            </div>
            <Input 
              placeholder="URL Gambar (Opsional)" 
              value={formData.hero_image || ""}
              onChange={(e) => setFormData({ hero_image: e.target.value })}
              className="rounded-xl text-xs"
            />
          </div>
        </SectionCard>

        {/* Jadwal Acara */}
        <SectionCard
          title="Jadwal Acara"
          icon={CalendarDays}
          isActive={activeSection === "acara"}
          onClick={() => setActiveSection(activeSection === "acara" ? "" : "acara")}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase text-slate-400">Tanggal Utama</Label>
              <Input type="date" value={formData.wedding_date || ""} onChange={(e) => setFormData({ wedding_date: e.target.value })} className="rounded-xl" />
            </div>
            
            {formData.acara?.map((event, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-100 relative group shadow-sm">
                <button 
                  className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeArrayItem("acara", idx)}
                >
                  <Trash2 size={12} />
                </button>
                <div className="space-y-3">
                  <Input placeholder="Nama Sesi (e.g. Akad)" value={event.tipe} onChange={(e) => updateArrayField("acara", idx, "tipe", e.target.value)} className="h-8 text-xs font-bold" />
                  <Input placeholder="Waktu (e.g. 09:00 - Selesai)" value={event.jam} onChange={(e) => updateArrayField("acara", idx, "jam", e.target.value)} className="h-8 text-xs" />
                  <Input placeholder="Lokasi" value={event.lokasi} onChange={(e) => updateArrayField("acara", idx, "lokasi", e.target.value)} className="h-8 text-xs" />
                  <Textarea placeholder="Alamat Lengkap" value={event.alamat_lengkap} onChange={(e) => updateArrayField("acara", idx, "alamat_lengkap", e.target.value)} className="text-xs min-h-[60px]" />
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full border-dashed rounded-xl text-[#D4AF97]" onClick={() => addArrayItem("acara", { tipe: "", jam: "", lokasi: "", alamat_lengkap: "", tanggal: formData.wedding_date || "" })}>
              <Plus size={14} className="mr-2" /> Tambah Sesi
            </Button>
            
            <Button className="w-full bg-[#2C2C2C] text-white rounded-xl text-xs font-bold h-10" onClick={() => setIsMapPickerOpen(true)}>
              <MapIconUI size={14} className="mr-2" /> KONFIGURASI PETA
            </Button>
          </div>
        </SectionCard>

        {/* Love Story */}
        <SectionCard
          title="Cerita Cinta"
          icon={BookHeart}
          isActive={activeSection === "love_story"}
          onClick={() => setActiveSection(activeSection === "love_story" ? "" : "love_story")}
        >
          <div className="space-y-4">
            {formData.love_story?.map((story, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-100 space-y-3 relative shadow-sm">
                <Input placeholder="Tahun" value={story.tahun} onChange={(e) => updateArrayField("love_story", idx, "tahun", e.target.value)} className="h-8 text-xs font-bold" />
                <Textarea placeholder="Tulis cerita..." value={story.cerita} onChange={(e) => updateArrayField("love_story", idx, "cerita", e.target.value)} className="text-xs min-h-[80px]" />
                <div 
                   className="relative h-20 rounded-lg border border-dashed border-slate-200 flex items-center justify-center overflow-hidden cursor-pointer"
                   onClick={() => {
                     const input = document.createElement("input");
                     input.type = "file";
                     input.onchange = (e) => handleFileUpload((e.target as HTMLInputElement).files?.[0], (url) => updateArrayField("love_story", idx, "foto", url));
                     input.click();
                   }}
                >
                  {story.foto ? <Image src={story.foto} alt="Story" fill className="object-cover" unoptimized /> : <p className="text-[9px] uppercase font-bold text-slate-400">Foto Momen</p>}
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-[#D4AF97] hover:bg-[#D4AF97]/5" onClick={() => addArrayItem("love_story", { tahun: "", cerita: "", foto: "" })}>
              <Plus size={14} className="mr-2" /> Tambah Momen
            </Button>
          </div>
        </SectionCard>

        {/* Galeri */}
        <SectionCard
          title="Galeri Foto"
          icon={ImageIcon}
          isActive={activeSection === "gallery"}
          onClick={() => setActiveSection(activeSection === "gallery" ? "" : "gallery")}
        >
          <div className="grid grid-cols-3 gap-2">
            {formData.gallery?.map((url, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group">
                <Image src={url} alt="Gallery" fill className="object-cover" unoptimized />
                <button 
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                  onClick={() => {
                    const newGallery = [...(formData.gallery || [])];
                    newGallery.splice(idx, 1);
                    setFormData({ gallery: newGallery });
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button 
              className="aspect-square rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 hover:border-[#D4AF97] hover:text-[#D4AF97] transition-all"
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.multiple = true;
                input.onchange = (e) => {
                  const files = Array.from((e.target as HTMLInputElement).files || []);
                  const urls = files.map(f => URL.createObjectURL(f));
                  setFormData({ gallery: [...(formData.gallery || []), ...urls].slice(0, 12) });
                };
                input.click();
              }}
            >
              <Plus size={24} />
            </button>
          </div>
          <p className="text-[9px] text-center text-slate-400 mt-3 font-bold uppercase tracking-widest">Maksimal 12 Foto</p>
        </SectionCard>

        {/* Digital Envelope */}
        <SectionCard
          title="Amplop Digital"
          icon={Wallet}
          isActive={activeSection === "digital_envelope"}
          onClick={() => setActiveSection(activeSection === "digital_envelope" ? "" : "digital_envelope")}
        >
          <div className="space-y-4">
            {formData.digital_envelope?.map((env, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FDFCFB] border border-slate-100 space-y-2 relative shadow-sm">
                <Input placeholder="Bank (e.g. BCA)" value={env.bank_name} onChange={(e) => updateArrayField("digital_envelope", idx, "bank_name", e.target.value)} className="h-8 text-xs font-bold" />
                <Input placeholder="No. Rekening" value={env.account_number} onChange={(e) => updateArrayField("digital_envelope", idx, "account_number", e.target.value)} className="h-8 text-xs" />
                <Input placeholder="Atas Nama" value={env.account_holder} onChange={(e) => updateArrayField("digital_envelope", idx, "account_holder", e.target.value)} className="h-8 text-xs" />
              </div>
            ))}
            <Button variant="outline" className="w-full rounded-xl" onClick={() => addArrayItem("digital_envelope", { bank_name: "", account_number: "", account_holder: "", qris_url: "" })}>
              <Plus size={14} className="mr-2" /> Tambah Rekening
            </Button>
          </div>
        </SectionCard>

        {/* Closing */}
        <SectionCard
          title="Penutup"
          icon={MailCheck}
          isActive={activeSection === "closing"}
          onClick={() => setActiveSection(activeSection === "closing" ? "" : "closing")}
        >
          <Textarea 
            placeholder="Tulis ucapan penutup & doa..." 
            value={formData.closing_message || ""}
            onChange={(e) => setFormData({ closing_message: e.target.value })}
            className="min-h-[120px] rounded-xl text-xs leading-relaxed"
          />
        </SectionCard>
      </div>

      {/* ── FOOTER STATUS ── */}
      <div className="p-4 px-6 border-t border-[#E5E0D8]/50 flex items-center justify-between bg-[#FDFCFB]">
        <div className="flex flex-col">
          <span className="text-[8px] font-black uppercase tracking-widest text-slate-300">Engine Status</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase text-green-600">Sync Ready</span>
          </div>
        </div>
        <div className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter text-right">
          Undang Dong v2.4<br/>Premium Access
        </div>
      </div>

      <MapPicker 
        isOpen={isMapPickerOpen} 
        onClose={() => setIsMapPickerOpen(false)} 
        onConfirm={({ address, link }) => {
          const newAcara = [...(formData.acara || [])];
          if (newAcara.length > 0) {
            newAcara[0] = { ...newAcara[0], alamat_lengkap: address, link_maps: link };
            setFormData({ acara: newAcara });
          }
          setIsMapPickerOpen(false);
        }}
      />
      
      <audio ref={audioRef} crossOrigin="anonymous" onEnded={() => setPlayingMusicId(null)} />
    </aside>
  );
}