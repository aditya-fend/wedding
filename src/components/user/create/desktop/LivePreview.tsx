"use client";

import React from "react";
import { MobileDeviceEmulator } from "react-mobile-emulator";
import { useEditorStore } from "@/store/useEditorStore";
import AuraDark from "@/components/templates/AuraDark";
import NeroGold from "@/components/templates/NeroGold";

export function LivePreview() {
  // Ambil activeTemplate langsung dari store
  const { formData, activeTemplate } = useEditorStore();

  // Helper untuk menentukan template mana yang harus tampil
  const renderTemplate = () => {
    switch (activeTemplate) {
      case "Nero Gold":
        return <NeroGold data={formData} />;
      case "Aura Dark":
      default:
        return <AuraDark data={formData} />;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] transform scale-[0.85] lg:scale-100 transition-transform">
        <MobileDeviceEmulator deviceType="galaxyS21">
          <div className="w-full h-full overflow-y-auto scrollbar-hide">
            {/* Render template secara dinamis berdasarkan state */}
            {renderTemplate()}
          </div>
        </MobileDeviceEmulator>
      </div>
    </div>
  );
}