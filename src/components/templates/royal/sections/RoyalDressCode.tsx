"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { InvitationContent } from '@/types/invitation';

interface RoyalDressCodeProps {
  data: InvitationContent;
}

const RoyalDressCode = ({ data }: RoyalDressCodeProps) => {
  const dressCodeColors = data.dress_code_colors && data.dress_code_colors.length > 0 
    ? data.dress_code_colors 
    : [data.dress_code_color || "#D4AF37"];
  
  const dressCodeNotes = data.dress_code_description || "";
  const infoList = data.additional_info_list && data.additional_info_list.length > 0
    ? data.additional_info_list
    : (data.additional_info ? [data.additional_info] : ["Mohon hadir 15 menit sebelum acara dimulai", "Protokol kesehatan tetap diutamakan"]);

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
      className="py-20 px-8 bg-white text-center relative overflow-hidden"
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

      <motion.div className="flex flex-col items-center mb-10">
        <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-6">Pakaian: {data.dress_code || "Formal"}</p>
        
        {/* Color Palette representation */}
        <div className="flex justify-center items-center space-x-6">
          {dressCodeColors.map((color, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center"
            >
              <div 
                className="w-14 h-14 rounded-full border-4 border-white shadow-xl mb-2" 
                style={{ backgroundColor: color }}
              />
              <span className="text-[8px] font-mono text-slate-400 uppercase tracking-tighter">{color}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {dressCodeNotes && (
        <motion.p className="text-xs text-slate-500 italic mb-10 leading-relaxed px-4 max-w-[320px] mx-auto">
          &quot;{dressCodeNotes}&quot;
        </motion.p>
      )}

      {infoList.length > 0 && (
        <motion.div 
          className="p-8 rounded-[2.5rem] bg-[#fffafa] border border-pink-50 max-w-[340px] mx-auto text-left"
        >
          <h4 className="font-serif text-slate-700 italic mb-4 text-center">Informasi Tambahan</h4>
          <ul className="space-y-4">
            {infoList.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-3">
                <span className="w-1.5 h-1.5 bg-pink-300 rounded-full mt-1.5 flex-shrink-0" />
                <span className="text-[11px] text-slate-500 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Floating Decoration Loop */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -left-10 mt-10 opacity-5 pointer-events-none"
      >
        <svg width="150" height="150" viewBox="0 0 100 100">
          <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" fill="#F472B6" />
        </svg>
      </motion.div>
    </motion.section>
  );
};

export default RoyalDressCode;