"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { InvitationContent } from '@/types/invitation';

interface RoyalClosingProps {
  data: InvitationContent;
}

const RoyalClosing = ({ data }: RoyalClosingProps) => {
  return (
    <section className="py-24 px-8 bg-white relative overflow-hidden text-center">
      {/* Dekorasi Garis Halus */}
      <div className="flex justify-center items-center space-x-4 mb-10">
        <div className="h-[1px] w-12 bg-pink-100" />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="text-pink-200"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </motion.div>
        <div className="h-[1px] w-12 bg-pink-100" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="space-y-6"
      >
        <p className="font-serif italic text-slate-500 leading-relaxed px-4">
          "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami."
        </p>

        <div className="pt-8">
          <p className="text-[10px] tracking-[0.4em] text-pink-400 uppercase font-bold mb-4">Kami yang berbahagia,</p>
          <h2 className="text-4xl font-serif italic text-slate-800">Aurora & Julian</h2>
          <p className="text-[10px] tracking-[0.2em] text-slate-400 mt-4 italic">Beserta seluruh keluarga besar</p>
        </div>
      </motion.div>

      {/* Ornamen Bawah yang Elegan */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full"
      >
        <svg viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 10 Q 25 0 50 10 T 100 10" stroke="#F472B6" strokeWidth="0.5" />
        </svg>
      </motion.div>
    </section>
  );
};

export default RoyalClosing;