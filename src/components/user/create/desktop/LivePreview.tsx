"use client";

import React, { useState, useEffect } from "react";
import { MobileDeviceEmulator } from "react-mobile-emulator";
import { useEditorStore } from "@/store/useEditorStore";
import { getTemplate, TemplateComponent } from "@/lib/templateRegistry";
import { Sparkles } from "lucide-react";

export function LivePreview() {
  const { formData, activeTemplate } = useEditorStore();
  const [isMobile, setIsMobile] = useState(false);

  // Efek untuk mendeteksi ukuran layar
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile(); // Cek saat mount
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const normalizeTemplateName = (title: string) => {
    if (!title) return "";
    return title.replace(/\s+/g, "").toLowerCase();
  };

  const renderContent = () => {
    const key = normalizeTemplateName(activeTemplate);
    const Component = getTemplate[key] as TemplateComponent | undefined;

    if (!Component) {
      return (
        <div className="flex flex-col h-full w-full items-center justify-center bg-white p-8 text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[#D4AF97]/20 blur-2xl rounded-full" />
            <Sparkles className="relative size-12 text-[#D4AF97] animate-pulse" />
          </div>
          <h3 className="text-lg font-black text-[#2C2C2C] uppercase tracking-tighter">
            Siap Memulai?
          </h3>
          <p className="text-xs text-slate-400 mt-2 font-medium leading-relaxed">
            Pilih template di panel kiri untuk melihat keajaiban undangan digital Anda secara real-time.
          </p>
        </div>
      );
    }

    return <Component data={formData} />;
  };

  // 1. Tampilan untuk Mobile (Tanpa Emulator)
  if (isMobile) {
    return (
      <div className="w-full h-full overflow-y-auto bg-white">
        {renderContent()}
      </div>
    );
  }

  // 2. Tampilan untuk Desktop (Dengan Emulator)
  return (
    <div className="flex items-center justify-center h-full w-full relative overflow-hidden">
      <div className="drop-shadow-[0_35px_60px_-15px_rgba(0,0,0,0.15)] flex items-center justify-center h-screen w-full overflow-hidden transform transition-all duration-700 hover:scale-[1.02]">
        <MobileDeviceEmulator scale={0.6} deviceType="galaxyS21">
          <div className="w-full h-full overflow-hidden overflow-y-auto no-scrollbar bg-white">
            {renderContent()}
          </div>
        </MobileDeviceEmulator>
      </div>
    </div>
  );
}