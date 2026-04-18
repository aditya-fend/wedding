"use client";

import React from "react";
import { MobileDeviceEmulator } from "react-mobile-emulator";
import { useEditorStore } from "@/store/useEditorStore";
import { getTemplate } from "@/lib/templateRegistry";

export function LivePreview() {
  // Ambil activeTemplate langsung dari store
  const { formData, activeTemplate } = useEditorStore();

  // Helper untuk menentukan template mana yang harus tampil
  const normalizeTemplateName = (title: string) => {
    return title.replace(/\s+/g, "");
  };

  const renderTemplate = () => {
    const key = normalizeTemplateName(activeTemplate); // "Nero Gold" → "NeroGold"
    const Component = getTemplate[key];

    if (!Component) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <p>Pilih Template</p>
        </div>
      );
    }

    return <Component data={formData} />;
  };

  return (
    <div className="flex items-center justify-center h-full w-full relative overflow-hidden">
      <MobileDeviceEmulator scale={9/10} deviceType="galaxyS21">
        <div className="w-full h-full overflow-hidden overflow-y-auto no-scrollbar">
          {renderTemplate()}
        </div>
      </MobileDeviceEmulator>
    </div>
  );
}
