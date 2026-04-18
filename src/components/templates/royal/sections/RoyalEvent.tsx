"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { InvitationContent } from '@/types/invitation';

interface RoyalEventProps {
  data: InvitationContent;
}

const RoyalEvent = ({ data }: RoyalEventProps) => {
  const acara = data.acara && data.acara.length > 0 ? data.acara : [];
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.3 } as const
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-20 px-6 relative"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[#fff5f6] -z-10 skew-y-3 transform origin-top-right" />
      
      <motion.div variants={cardVariants} className="bg-white/80 backdrop-blur-md border border-pink-100 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden">
        {/* Dekorasi Bunga Atas */}
        <motion.img 
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          src="https://images.unsplash.com/photo-1533616688419-b7a585564566?q=80&w=300&auto=format&fit=crop"
          className="absolute -top-10 -right-10 w-32 h-32 opacity-40 grayscale-[30%]"
        />

        <div className="text-center relative z-10">
          <motion.span variants={itemVariants} className="text-pink-400 tracking-[0.4em] text-[10px] uppercase font-semibold">
            Save the Date
          </motion.span>
          
          <motion.h2 variants={itemVariants} className="text-4xl font-serif italic text-slate-800 mt-4 mb-2">
            {acara.length > 0 ? new Date(acara[0].tanggal).toLocaleDateString('id-ID', { weekday: 'long' }) : "Sabtu"}
          </motion.h2>
          
          <motion.div variants={itemVariants} className="flex justify-center items-center space-x-4 my-6">
            <div className="h-[1px] w-12 bg-pink-200" />
            <div className="text-5xl font-light text-pink-500">
              {acara.length > 0 ? new Date(acara[0].tanggal).getDate() : "18"}
            </div>
            <div className="h-[1px] w-12 bg-pink-200" />
          </motion.div>
          
          <motion.p variants={itemVariants} className="text-slate-600 tracking-widest text-lg uppercase font-light">
            {acara.length > 0 ? new Date(acara[0].tanggal).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }).split(' ').slice(0, 2).join(' ') : "April"} <span className="text-pink-200 mx-2">|</span> {new Date(acara.length > 0 ? acara[0].tanggal : new Date()).getFullYear()}
          </motion.p>
        </div>

        <div className="mt-12 space-y-8 relative z-10">
          {acara.map((event, index) => (
            <motion.div key={index} variants={itemVariants} className="text-center">
              <h4 className="font-serif text-xl text-slate-800 italic">{event.tipe}</h4>
              <p className="text-sm text-pink-400 mt-1 uppercase tracking-widest">{event.jam}</p>
              <p className="text-slate-500 text-xs mt-3 leading-relaxed px-10">
                {event.lokasi} <br />
                {event.alamat_lengkap}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Tombol Aksi */}
        <motion.div variants={itemVariants} className="mt-10 flex flex-col items-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-pink-400 text-white px-8 py-3 rounded-full text-xs tracking-[0.2em] shadow-lg shadow-pink-100"
          >
            GOOGLE MAPS
          </motion.button>
        </motion.div>

        {/* Dekorasi Garis Loop */}
        <svg className="absolute bottom-0 left-0 w-full opacity-10" viewBox="0 0 100 20">
            <motion.path 
              d="M0 10 Q 25 20 50 10 T 100 10" 
              stroke="#F472B6" fill="transparent" 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, repeat: Infinity }}
            />
        </svg>
      </motion.div>
    </motion.section>
  );
};

export default RoyalEvent;