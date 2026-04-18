"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { InvitationContent } from "@/types/invitation";
import RoyalMainLayout from "@/components/templates/royal/sections/RoyalMainLayout";
import RoyalOpening from "@/components/templates/royal/sections/RoyalOpening";
import RoyalCouples from "@/components/templates/royal/sections/RoyalCouples";
import RoyalEvent from "@/components/templates/royal/sections/RoyalEvent";
import RoyalLocation from "@/components/templates/royal/sections/RoyalLocation";
import RoyalEventDetails from "@/components/templates/royal/sections/RoyalEventDetails";
import RoyalRSVP from "@/components/templates/royal/sections/RoyalRSVP";
import RoyalStory from "@/components/templates/royal/sections/RoyalStory";
import RoyalGallery from "@/components/templates/royal/sections/RoyalGallery";
import RoyalWishes from "@/components/templates/royal/sections/RoyalWishes";
import DigitalGiftModal from "@/components/templates/royal/sections/DigitalGiftModal";
import RoyalCountdown from "@/components/templates/royal/sections/RoyalCountdown";
import RoyalAudioPlayer from "@/components/templates/royal/sections/RoyalAudioPlayer";
import RoyalDressCode from "@/components/templates/royal/sections/RoyalDressCode";
import RoyalClosing from "@/components/templates/royal/sections/RoyalClosing";

interface RoyalProps {
  data: InvitationContent;
  invitationId?: string;
}

export default function Royal({ data, invitationId }: RoyalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsMusicPlaying(true);
  };

  const brideName = data.mempelai_wanita?.nama?.split(" ")[0] || "Bride";
  const groomName = data.mempelai_pria?.nama?.split(" ")[0] || "Groom";

  return (
    <RoyalMainLayout>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <RoyalOpening 
            key="opening"
            onOpen={handleOpenInvitation}
            brideName={brideName} 
            groomName={groomName} 
          />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col bg-white pb-20"
          >
            <RoyalAudioPlayer 
              isPlaying={isMusicPlaying} 
              setIsPlaying={setIsMusicPlaying}
              musicUrl={data.music_url}
            />

            {/* Hero Section */}
            <section className="relative h-[80vh] w-full overflow-hidden">
               <motion.img 
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 5 }}
                src={data.hero_image || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop"}
                className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
               <div className="absolute bottom-10 left-0 w-full text-center px-4">
                  <p className="text-pink-400 tracking-[0.5em] text-[10px] uppercase mb-2">The Wedding Of</p>
                  <h2 className="text-5xl font-serif italic text-slate-800">
                    {groomName} & {brideName}
                  </h2>
               </div>
            </section>

            {/* Rangkaian Konten Undangan */}
            <RoyalCouples data={data} />
            <RoyalCountdown data={data} />
            <RoyalStory data={data} />
            <RoyalEvent data={data} />
            <RoyalEventDetails data={data} />
            <RoyalGallery data={data} />
            <RoyalDressCode data={data} />
            <RoyalLocation data={data} />
            <RoyalWishes data={data} invitationId={invitationId} />
            <RoyalRSVP data={data} invitationId={invitationId} />
            <RoyalClosing data={data} /> {/* Penutup Puitis */}

            {/* Floating UI Elements */}
            <div className="fixed bottom-6 right-6 z-50">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowGiftModal(true)}
                className="w-14 h-14 bg-white text-pink-400 rounded-full shadow-xl flex items-center justify-center border-2 border-pink-50"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 12 20 22 4 22 4 12"></polyline>
                  <rect x="2" y="7" width="20" height="5"></rect>
                  <line x1="12" y1="22" x2="12" y2="7"></line>
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
                </svg>
              </motion.button>
            </div>

            <AnimatePresence>
              {showGiftModal && (
                <DigitalGiftModal 
                  isOpen={showGiftModal} 
                  onClose={() => setShowGiftModal(false)}
                  data={data}
                />
              )}
            </AnimatePresence>

            <footer className="py-10 text-center bg-white">
               <p className="text-[9px] text-slate-300 tracking-[0.2em] uppercase">
                 Created with love for {groomName} & {brideName}
               </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </RoyalMainLayout>
  );
}