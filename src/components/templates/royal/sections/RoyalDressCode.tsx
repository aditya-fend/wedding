"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { InvitationContent } from '@/types/invitation';

interface RoyalDressCodeProps {
  data: InvitationContent;
}

const RoyalDressCode = ({ data }: RoyalDressCodeProps) => {
  const colors = [
    { hex: "#FDF2F2", name: "Champagne" },
    { hex: "#FBCFE8", name: "Rose Pink" },
    { hex: "#94A3B8", name: "Slate Grey" },
    { hex: "#FFFFFF", name: "Pure White" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.2 } 
    }
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="py-20 px-8 bg-white text-center"
    >
      <div className="mb-10">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-pink-400 tracking-[0.4em] text-[10px] uppercase font-bold"
        >
          Etiquette
        </motion.span>
        <motion.h2 className="text-3xl font-serif italic text-slate-800 mt-2">Dress Code</motion.h2>
        <div className="w-12 h-[1px] bg-pink-100 mx-auto mt-4" />
      </div>

      <motion.p className="text-xs text-slate-500 italic mb-10 leading-relaxed px-4">
        {data.dress_code_description || "Tanpa mengurangi rasa hormat, demi keselarasan estetika di hari bahagia kami, para tamu undangan diharapkan mengenakan pakaian bernuansa:"}
      </motion.p>

      {/* Palette Warna */}
      <div className="flex justify-center items-center space-x-4 mb-10">
        {colors.map((color, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -10 }}
            className="flex flex-col items-center"
          >
            <div 
              className="w-12 h-12 rounded-full border border-slate-100 shadow-inner mb-2" 
              style={{ backgroundColor: color.hex }}
            />
            <span className="text-[8px] uppercase tracking-tighter text-slate-400">{color.name}</span>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="p-6 rounded-[2rem] bg-[#fffafa] border border-pink-50"
      >
        <h4 className="font-serif text-slate-700 italic mb-2">Informasi Tambahan</h4>
        <ul className="text-[11px] text-slate-500 space-y-3 leading-relaxed">
          <li className="flex items-center justify-center space-x-2">
            <span className="w-1 h-1 bg-pink-300 rounded-full" />
            <span>Mohon hadir 15 menit sebelum acara dimulai</span>
          </li>
          <li className="flex items-center justify-center space-x-2">
            <span className="w-1 h-1 bg-pink-300 rounded-full" />
            <span>Protokol kesehatan tetap diutamakan</span>
          </li>
          <li className="flex items-center justify-center space-x-2">
            <span className="w-1 h-1 bg-pink-300 rounded-full" />
            <span>Diharapkan membawa undangan digital/QR Code</span>
          </li>
        </ul>
      </motion.div>

      {/* Floating Decoration Loop */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -left-10 mt-10 opacity-5"
      >
        <svg width="150" height="150" viewBox="0 0 100 100">
          <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" fill="#F472B6" />
        </svg>
      </motion.div>
    </motion.section>
  );
};

export default RoyalDressCode;