"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RoyalLayoutProps {
  children: React.ReactNode;
}

const RoyalMainLayout = ({ children }: RoyalLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#fcf5f6] flex justify-center items-center font-serif">
      <main className="relative w-full max-w-[450px] h-screen md:h-[92vh] md:rounded-[2rem] md:shadow-2xl overflow-hidden bg-white flex flex-col border-x border-pink-100">
        
        {/* Konten Utama dengan AnimatePresence */}
        <div className="relative z-20 flex-1 overflow-y-auto scrollbar-hide">
          {children}
        </div>

        {/* Ornamen Bunga Statis di Sudut */}
        <div className="absolute top-0 right-0 w-32 h-32 z-10 pointer-events-none opacity-60">
          <img 
            src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=500&auto=format&fit=crop" 
            alt="Floral" 
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="absolute bottom-0 left-0 w-40 h-40 z-10 pointer-events-none opacity-60 rotate-180">
          <img 
            src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=500&auto=format&fit=crop" 
            alt="Floral" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Garis Bingkai Emas Halus */}
        <div className="absolute inset-3 border border-pink-200/40 rounded-[1.8rem] pointer-events-none z-10" />
      </main>
    </div>
  );
};

export default RoyalMainLayout;