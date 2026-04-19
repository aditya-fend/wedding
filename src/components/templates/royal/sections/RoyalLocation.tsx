"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { InvitationContent } from '@/types/invitation';

interface RoyalLocationProps {
  data: InvitationContent;
}

const RoyalLocation = ({ data }: RoyalLocationProps) => {
  const primaryEvent = data.acara?.[0];
  const gmapsLink = primaryEvent?.link_maps || 
    (primaryEvent?.alamat_lengkap 
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(primaryEvent.alamat_lengkap + " " + primaryEvent.lokasi)}`
      : "https://www.google.com/maps");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.3 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-16 px-8 bg-white flex flex-col items-center"
    >
      {/* Judul Seksi */}
      <motion.div variants={itemVariants} className="text-center mb-10">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-12 h-[1px] bg-pink-300 mx-auto mb-4" 
        />
        <h2 className="text-3xl font-serif italic text-slate-800">Lokasi Acara</h2>
      </motion.div>

      {/* Frame Peta / Ilustrasi Lokasi */}
      <motion.div 
        variants={itemVariants}
        className="relative w-full aspect-square max-w-[320px] rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl mb-8 group"
      >
        <img 
          src="https://images.unsplash.com/photo-1524397057410-1e775ed476f3?q=80&w=500&auto=format&fit=crop" 
          alt="Location Map Placeholder" 
          className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-pink-900/10 group-hover:bg-transparent transition-colors" />
        
        {/* Pin Icon Animasi */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-500"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </motion.div>
      </motion.div>

      {/* Detail Alamat */}
      <motion.div variants={itemVariants} className="text-center space-y-4">
        <h3 className="text-xl font-serif text-slate-700 italic">{primaryEvent?.lokasi || "Grand Ballroom Royal Palace"}</h3>
        <p className="text-sm text-slate-500 leading-relaxed max-w-[280px] mx-auto">
          {primaryEvent?.alamat_lengkap || "Jl. Kastil Putih No. 18, Kawasan Distrik Bangsawan, Kota Aurora, Kerajaan Harmoni."}
        </p>
        
        <motion.div className="pt-4">
          <motion.a
            href={gmapsLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-slate-800 text-white px-8 py-3 rounded-full text-[10px] tracking-[0.2em] shadow-xl"
          >
            <span>Buka Google Maps</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Ornamen Daun Loop */}
      <motion.img 
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        src="https://images.unsplash.com/photo-1533616688419-b7a585564566?q=80&w=200&auto=format&fit=crop"
        className="absolute -bottom-20 -right-20 w-48 h-48 opacity-10 pointer-events-none"
      />
    </motion.section>
  );
};

export default RoyalLocation;