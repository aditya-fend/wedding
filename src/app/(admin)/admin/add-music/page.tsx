"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, Music, X, FileAudio, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

interface UploadedFile {
  file: File;
  title: string;
  artist: string;
  category: string;
  progress: number;
  status: "uploading" | "success" | "error";
  error?: string;
}

export default function AddMusicPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const supabase = createClient();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const audioFiles = droppedFiles.filter(
      (file) =>
        file.type.startsWith("audio/") ||
        file.name.toLowerCase().endsWith(".mp3") ||
        file.name.toLowerCase().endsWith(".wav") ||
        file.name.toLowerCase().endsWith(".m4a") ||
        file.name.toLowerCase().endsWith(".ogg"),
    );

    if (audioFiles.length === 0) {
      toast.error("Hanya file audio yang didukung (MP3, WAV, M4A, OGG)");
      return;
    }

    const newFiles: UploadedFile[] = audioFiles.map((file) => ({
      file,
      title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
      artist: "",
      category: "wedding",
      progress: 0,
      status: "uploading" as const,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const audioFiles = selectedFiles.filter(
      (file) =>
        file.type.startsWith("audio/") ||
        file.name.toLowerCase().endsWith(".mp3") ||
        file.name.toLowerCase().endsWith(".wav") ||
        file.name.toLowerCase().endsWith(".m4a") ||
        file.name.toLowerCase().endsWith(".ogg"),
    );

    if (audioFiles.length === 0) {
      toast.error("Hanya file audio yang didukung (MP3, WAV, M4A, OGG)");
      return;
    }

    const newFiles: UploadedFile[] = audioFiles.map((file) => ({
      file,
      title: file.name.replace(/\.[^/.]+$/, ""),
      artist: "",
      category: "wedding",
      progress: 0,
      status: "uploading" as const,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const updateFile = (index: number, updates: Partial<UploadedFile>) => {
    setFiles((prev) =>
      prev.map((file, i) => (i === index ? { ...file, ...updates } : file)),
    );
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  

  const uploadFile = async (fileData: UploadedFile, index: number) => {
    try {
      updateFile(index, { progress: 0, status: "uploading" });

      // Upload to Supabase Storage
      const fileName = `${Date.now()}-${fileData.file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("music")
        .upload(fileName, fileData.file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      updateFile(index, { progress: 50 });

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("music").getPublicUrl(fileName);

      // Save to database
      const response = await fetch("/api/admin/music", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: fileData.title,
          artist: fileData.artist || null,
          url: publicUrl,
          category: fileData.category,
        }),
      });

      console.log("Payload yang dikirim:", { title: fileData.title, url: publicUrl });

      if (!response.ok) {
        throw new Error("Failed to save music metadata");
      }

      updateFile(index, { progress: 100, status: "success" });
      toast.success(`"${fileData.title}" berhasil diupload!`);
    } catch (error) {
      console.error("Upload error:", error);
      updateFile(index, {
        status: "error",
        error: error instanceof Error ? error.message : "Upload failed",
      });
      toast.error(`Gagal upload "${fileData.title}"`);
    }
  };

  const handleUploadAll = async () => {
    if (files.length === 0) {
      toast.error("Pilih file musik terlebih dahulu");
      return;
    }

    setIsUploading(true);

    try {
      // Upload files sequentially to avoid overwhelming the server
      for (let i = 0; i < files.length; i++) {
        await uploadFile(files[i], i);
      }

      toast.success("Semua file berhasil diupload!");
      setFiles([]);
      router.refresh();
    } catch (error) {
      console.error("Batch upload error:", error);
      toast.error("Beberapa file gagal diupload");
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
          <Music className="size-6 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-wider">
            Tambah Musik
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Upload file musik untuk koleksi undangan digital
          </p>
        </div>
      </div>

      {/* Upload Area */}
      <Card className="border-white/5 bg-slate-900/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Upload className="size-5" />
            Upload Musik
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              isDragOver
                ? "border-cyan-400 bg-cyan-500/5"
                : "border-white/10 hover:border-cyan-400/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="audio/*,.mp3,.wav,.m4a,.ogg"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-full flex items-center justify-center">
                <FileAudio className="size-8 text-cyan-400" />
              </div>

              <div>
                <p className="text-white font-semibold text-lg mb-2">
                  {isDragOver
                    ? "Lepaskan file di sini"
                    : "Seret & lepaskan file musik"}
                </p>
                <p className="text-slate-400 text-sm">
                  atau klik untuk memilih file. Mendukung MP3, WAV, M4A, OGG
                </p>
              </div>

              <Button
                variant="outline"
                className="border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10"
                onClick={() => fileInputRef.current?.click()}
              >
                Pilih File
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card className="border-white/5 bg-slate-900/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>File yang akan diupload ({files.length})</span>
              <Button
                onClick={handleUploadAll}
                disabled={isUploading}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    Mengupload...
                  </>
                ) : (
                  <>
                    <Upload className="size-4 mr-2" />
                    Upload Semua
                  </>
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {files.map((fileData, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 border border-white/5 rounded-lg bg-slate-800/50"
                >
                  <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                    <FileAudio className="size-5 text-cyan-400" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs text-slate-400 uppercase tracking-wider">
                          Judul
                        </Label>
                        <Input
                          value={fileData.title}
                          onChange={(e) =>
                            updateFile(index, { title: e.target.value })
                          }
                          className="bg-slate-900 border-slate-700 text-white"
                          placeholder="Judul lagu"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-slate-400 uppercase tracking-wider">
                          Artis
                        </Label>
                        <Input
                          value={fileData.artist}
                          onChange={(e) =>
                            updateFile(index, { artist: e.target.value })
                          }
                          className="bg-slate-900 border-slate-700 text-white"
                          placeholder="Nama artis (opsional)"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-slate-400 uppercase tracking-wider">
                          Kategori
                        </Label>
                        <Input
                          value={fileData.category}
                          onChange={(e) =>
                            updateFile(index, { category: e.target.value })
                          }
                          className="bg-slate-900 border-slate-700 text-white"
                          placeholder="wedding, instrumental, dll"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span>{fileData.file.name}</span>
                      <span>•</span>
                      <span>{formatFileSize(fileData.file.size)}</span>
                      {fileData.status === "uploading" && (
                        <>
                          <span>•</span>
                          <span className="text-cyan-400">
                            {fileData.progress}%
                          </span>
                        </>
                      )}
                    </div>

                    {fileData.status === "error" && (
                      <p className="text-red-400 text-sm">{fileData.error}</p>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-slate-400 hover:text-red-400"
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info */}
      <Card className="border-white/5 bg-slate-900/50">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Informasi Upload</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-400">
              <div>
                <h4 className="text-white font-medium mb-2">
                  Format yang didukung:
                </h4>
                <ul className="space-y-1">
                  <li>• MP3 (MPEG Audio Layer III)</li>
                  <li>• WAV (Waveform Audio)</li>
                  <li>• M4A (MPEG-4 Audio)</li>
                  <li>• OGG (Ogg Vorbis)</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Panduan:</h4>
                <ul className="space-y-1">
                  <li>• Ukuran file maksimal 50MB</li>
                  <li>• Pastikan metadata lengkap</li>
                  <li>• Gunakan nama file yang deskriptif</li>
                  <li>• Kategori membantu pengelompokan</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
