"use client";

import React from "react";
import { MobileDeviceEmulator } from "react-mobile-emulator";
import { useEditorStore } from "@/store/useEditorStore";
import AuraDark from "@/components/templates/AuraDark";
import NeroGold from "@/components/templates/NeroGold";

export function LivePreview() {
  const { formData, activeTemplate } = useEditorStore();

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Container untuk Emulator agar selalu di tengah */}
      <div className="relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] transform scale-[0.85] lg:scale-100 transition-transform">
        <MobileDeviceEmulator deviceType="iphone13">
          <div className="w-full h-full overflow-y-auto scrollbar-hide">
            {activeTemplate === "nero-gold" ? (
              <NeroGold data={formData} />
            ) : (
              <AuraDark data={formData} />
            )}
          </div>
        </MobileDeviceEmulator>
      </div>
    </div>
  );
}