"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { InvitationContent } from '@/types/invitation';

interface RoyalWishesProps {
  data: InvitationContent;
}

const RoyalWishes = ({ data }: RoyalWishesProps) => {
  const displayWishes = (data.guest_wishes && data.guest_wishes.length > 0) 
    ? data.guest_wishes.map(w => ({ name: w.name, message: w.message, time: "Baru saja" }))
    : [
        { name: "Alfian Nur Hidayat", message: "Selamat menempuh hidup baru Aurora dan Julian! Semoga menjadi keluarga yang sakinah dan penuh berkat.", time: "2 jam yang lalu" },
        { name: "Sari Putri", message: "Barakallah! Cantik sekali undangannya. Semoga lancar sampai hari H ya!", time: "5 jam yang lalu" },
        { name: "Robertus", message: "Happy wedding! Wish you both a lifetime of love and happiness.", time: "1 hari yang lalu" },
      ];

  return (
    <section className="py-20 px-8 bg-[#fffafa] relative overflow-hidden">
      <div className="text-center mb-12">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-pink-400 tracking-[0.4em] text-[10px] uppercase font-bold"
        >
          Guest Book
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-serif italic text-slate-800 mt-2"
        >
          Ucapan & Doa
        </motion.h2>
      </div>

      {/* Form Singkat Kirim Ucapan */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mb-12 bg-white p-6 rounded-[2rem] shadow-sm border border-pink-50"
      >
        <textarea 
          placeholder="Tuliskan ucapan manis Anda..."
          className="w-full text-xs font-serif italic bg-transparent border-none focus:ring-0 text-slate-600 resize-none h-20"
        />
        <div className="flex justify-end mt-2">
          <button className="text-[9px] tracking-[0.2em] bg-pink-400 text-white px-4 py-2 rounded-full shadow-md shadow-pink-100">
            KIRIM UCAPAN
          </button>
        </div>
      </motion.div>

      {/* Daftar Ucapan */}
      <div className="space-y-6 max-h-[400px] overflow-y-auto scrollbar-hide pr-2">
        {displayWishes.map((wish, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border-l-4 border-pink-200 shadow-sm"
          >
            <h4 className="text-sm font-serif text-slate-800 font-bold">{wish.name}</h4>
            <p className="text-[11px] text-slate-500 mt-2 leading-relaxed italic">
              "{wish.message}"
            </p>
            <p className="text-[9px] text-pink-300 mt-3 text-right uppercase tracking-tighter">
              {wish.time}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Ornamen Floating */}
      <motion.div 
        animate={{ rotate: [0, 10, 0], y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-10 -right-10 opacity-10 pointer-events-none"
      >
        <img 
          src="https://images.unsplash.com/photo-1533616688419-b7a585564566?q=80&w=200&auto=format&fit=crop" 
          className="w-32 h-32 object-contain"
        />
      </motion.div>
    </section>
  );
};

export default RoyalWishes;