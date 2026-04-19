"use client";

import React from "react";
import { MobileDeviceEmulator } from "react-mobile-emulator";
import {
  getTemplate,
  TemplateComponent,
  templateRegistry,
} from "@/lib/templateRegistry";
import { InvitationContent } from "@/types/invitation";

interface Props {
  data: InvitationContent;
  templateId: string;
  invitationId?: string;
}

export default function PublicInvitationClient({ data, templateId, invitationId }: Props) {
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    // Cek jika ukuran layar > 768px (Tablet ke atas)
    const checkScreen = () => setIsDesktop(window.innerWidth > 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const normalizeTemplateName = (title: string) => {
    return title.replace(/\s+/g, "");
  };

  const renderTemplate = () => {
    const key = normalizeTemplateName(templateId);

    const Component = getTemplate[key] as TemplateComponent | undefined;

    if (!Component) {
      const DefaultComponent = templateRegistry.pink;
      return <DefaultComponent data={data} invitationId={invitationId} />;
    }

    return <Component data={data} invitationId={invitationId} />;
  };
  
  if (isDesktop) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center p-10"
        style={{ backgroundColor: "var(--color-background, #F8F5F0)" }}
      >
        <div className="relative drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
          <MobileDeviceEmulator deviceType="galaxyS21">
            <div className="w-full h-full overflow-y-auto bg-white no-scrollbar">
              {renderTemplate()}
            </div>
          </MobileDeviceEmulator>
        </div>
      </div>
    );
  }

  // Tampilan Full untuk Mobile
  return <div className="min-h-screen w-full bg-white">{renderTemplate()}</div>;
}
