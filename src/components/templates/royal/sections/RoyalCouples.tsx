"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { InvitationContent } from '@/types/invitation';

interface RoyalCouplesProps {
  data: InvitationContent;
}

const RoyalCouples = ({ data }: RoyalCouplesProps) => {
  const containerRef = useRef(null);
  
  // Scroll tracking untuk efek parallax global di section ini
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [20, -20]);

  // Varian untuk Staggered Load
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: "easeOut" } as const
    }
  };

  return (
    <motion.section 
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      className="py-20 px-8 flex flex-col items-center space-y-24 relative overflow-hidden bg-white"
    >
      {/* 1. DEKORASI LOOPING: Lingkaran Halo Emas */}
      <motion.div 
        animate={{ 
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-10 -left-16 w-64 h-64 border border-pink-100 rounded-full opacity-40 pointer-events-none"
      />

      {/* 2. MEMPELAI PRIA */}
      <div className="flex flex-col items-center w-full z-10">
        <motion.div 
          variants={textVariants}
          className="relative mb-8"
        >
          {/* Frame Foto dengan Animasi Floating */}
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-64 h-80 rounded-t-[12rem] rounded-b-[2rem] border-[1px] border-pink-200 p-2 shadow-sm"
          >
            <div className="w-full h-full rounded-t-[11.5rem] rounded-b-[1.5rem] overflow-hidden bg-slate-100 shadow-inner">
              <motion.img 
                style={{ scale: 1.2, y: yParallax }}
                src={data.mempelai_pria?.foto || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop"} 
                alt="Groom" 
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Aksesoris Bunga Kecil (Animasi Scroll) */}
            <motion.img 
              whileInView={{ rotate: [0, 15, 0], scale: [0, 1] }}
              src="https://images.unsplash.com/photo-1533616688419-b7a585564566?q=80&w=200&auto=format&fit=crop"
              className="absolute -bottom-6 -right-6 w-24 h-24 object-contain opacity-80"
            />
          </motion.div>
        </motion.div>

        {/* Nama & Orang Tua (Staggered) */}
        <motion.h3 
          variants={textVariants}
          className="text-3xl font-light text-slate-800 tracking-wider font-serif italic"
        >
          {data.mempelai_pria?.nama || "Groom"}
        </motion.h3>
        <motion.div 
          variants={textVariants}
          className="flex items-center space-x-2 mt-3"
        >
          <div className="w-8 h-[1px] bg-pink-200" />
          <p className="text-pink-400 text-[10px] uppercase tracking-[0.3em] font-medium">
            Putra dari {data.mempelai_pria?.ortu_ayah || "Bapak"} & {data.mempelai_pria?.ortu_ibu || "Ibu"}
          </p>
          <div className="w-8 h-[1px] bg-pink-200" />
        </motion.div>
      </div>

      {/* 3. PEMBATAS: AMPERSAND DENGAN EFEK GROW */}
      <motion.div 
        initial={{ scale: 0, rotate: -45, opacity: 0 }}
        whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
        className="relative py-4"
      >
        <span className="text-6xl font-serif text-pink-100 opacity-60 italic">&</span>
        {/* Particle Loop */}
        <motion.div 
          animate={{ opacity: [0, 1, 0], y: [-20, -40] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-0 left-1/2 w-1 h-1 bg-pink-300 rounded-full"
        />
      </motion.div>

      {/* 4. MEMPELAI WANITA */}
      <div className="flex flex-col items-center w-full z-10">
        <motion.div 
          variants={textVariants}
          className="relative mb-8"
        >
          {/* Frame Foto dengan Animasi Floating (Berlawanan arah) */}
          <motion.div 
            animate={{ y: [-12, 0, -12] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-64 h-80 rounded-t-[12rem] rounded-b-[2rem] border-[1px] border-pink-200 p-2 shadow-sm"
          >
            <div className="w-full h-full rounded-t-[11.5rem] rounded-b-[1.5rem] overflow-hidden bg-slate-100 shadow-inner">
              <motion.img 
                style={{ scale: 1.2, y: yParallax }}
                src={data.mempelai_wanita?.foto || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500&auto=format&fit=crop"} 
                alt="Bride" 
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Aksesoris Daun (Animasi Scroll) */}
            <motion.img 
              whileInView={{ rotate: [0, -15, 0], scale: [0, 1] }}
              src="https://images.unsplash.com/photo-1533616688419-b7a585564566?q=80&w=200&auto=format&fit=crop"
              className="absolute -top-10 -left-10 w-24 h-24 object-contain opacity-80 -scale-y-100"
            />
          </motion.div>
        </motion.div>

        <motion.h3 
          variants={textVariants}
          className="text-3xl font-light text-slate-800 tracking-wider font-serif italic"
        >
          {data.mempelai_wanita?.nama || "Bride"}
        </motion.h3>
        <motion.div 
          variants={textVariants}
          className="flex items-center space-x-2 mt-3"
        >
          <div className="w-8 h-[1px] bg-pink-200" />
          <p className="text-pink-400 text-[10px] uppercase tracking-[0.3em] font-medium">
            Putri dari {data.mempelai_wanita?.ortu_ayah || "Bapak"} & {data.mempelai_wanita?.ortu_ibu || "Ibu"}
          </p>
          <div className="w-8 h-[1px] bg-pink-200" />
        </motion.div>
      </div>

      {/* 5. DEKORASI BAWAH: Garis Melengkung Loop */}
      <motion.svg 
        width="100%" height="60" viewBox="0 0 400 60" fill="none"
        className="opacity-20"
      >
        <motion.path 
          d="M0 30C100 0 300 60 400 30" 
          stroke="#F472B6" 
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />
      </motion.svg>
    </motion.section>
  );
};

export default RoyalCouples;