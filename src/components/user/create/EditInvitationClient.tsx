"use client";

import React, { useState, useEffect } from "react";
import CreateDesktopView from "@/components/user/create/desktop/CreateDesktopView";
import CreateMobileView from "@/components/user/create/mobile/CreateMobileView";
import { InvitationContent } from "@/types/invitation";
import { Music, Template } from "@prisma/client";

interface EditInvitationClientProps {
  templates: Template[];
  musics: Music[];
  invitationId: string;
  initialData: InvitationContent;
  slug: string;
}

export default function EditInvitationClient({
  templates,
  musics,
  invitationId,
  initialData,
  slug,
}: EditInvitationClientProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024;
    }
    return null;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    if (isMobile === null) checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [isMobile]);

  // Loading state while checking screen size
  if (isMobile === null) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#F8F5F0]">
         <div className="animate-pulse flex flex-col items-center gap-3">
            <div className="size-8 bg-slate-200 rounded-full" />
            <div className="h-2 w-24 bg-slate-100 rounded" />
         </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <CreateMobileView
        invitationId={invitationId}
        initialData={initialData}
        templates={templates}
        musics={musics}
        slug={slug}
      />
    );
  }

  return (
    <CreateDesktopView
      invitationId={invitationId}
      initialData={initialData}
      templates={templates}
      musics={musics}
      slug={slug}
    />
  );
}
