"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { InvitationContent } from '@/types/invitation';

interface RoyalGalleryProps {
  data: InvitationContent;
}

const RoyalGallery = ({ data }: RoyalGalleryProps) => {
  const galleryImages = data.gallery && data.gallery.length > 0
    ? data.gallery.map((url, idx) => ({
        url,
        size: idx % 3 === 0 ? "tall" : "square"
      }))
    : [
        { url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500", size: "tall" },
        { url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=500", size: "square" },
        { url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=500", size: "square" },
        { url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=500", size: "tall" },
        { url: "https://images.unsplash.com/photo-1522673607200-16488354495f?q=80&w=500", size: "square" },
        { url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=500", size: "square" },
      ];
  return (
    <section className="py-20 px-6 bg-white relative overflow-hidden">
      <div className="text-center mb-12">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-pink-400 tracking-[0.4em] text-[10px] uppercase font-bold"
        >
          Our Memories
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-serif italic text-slate-800 mt-2"
        >
          Galeri Kebahagiaan
        </motion.h2>
      </div>

      {/* Grid Galeri */}
      <div className="grid grid-cols-2 gap-4">
        {galleryImages.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.1,
              ease: [0.21, 0.47, 0.32, 0.98] 
            }}
            className={`relative overflow-hidden rounded-2xl shadow-sm border border-pink-50 
              ${img.size === 'tall' ? 'row-span-2 h-[300px]' : 'h-[142px]'}`}
          >
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
              src={img.url}
              alt={`Gallery ${index}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-pink-900/5 pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* Dekorasi Awan/Bunga di Galeri */}
      <motion.div 
        animate={{ x: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-10 -left-10 opacity-20 pointer-events-none"
      >
        <svg width="200" height="200" viewBox="0 0 100 100">
           <circle cx="50" cy="50" r="40" stroke="#F472B6" strokeWidth="0.2" fill="none" />
        </svg>
      </motion.div>
    </section>
  );
};

export default RoyalGallery;