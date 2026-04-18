"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { InvitationContent } from '@/types/invitation';

interface RoyalEventDetailsProps {
  data: InvitationContent;
}

const RoyalEventDetails = ({ data }: RoyalEventDetailsProps) => {
  const sessions = data.acara && data.acara.length > 0 
    ? data.acara.map((event, index) => ({
        title: event.tipe,
        time: event.jam,
        location: event.lokasi,
        address: event.alamat_lengkap,
        image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=500&auto=format&fit=crop",
        side: index % 2 === 0 ? "left" : "right"
      }))
    : [
        {
          title: "Akad Nikah",
          time: "08:00 - 10:00 WIB",
          location: "Kediaman Mempelai Wanita",
          address: "Jl. Kerajaan No. 12, Kastil Merah Muda",
          image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=500&auto=format&fit=crop",
          side: "left"
        },
        {
          title: "Resepsi Pernikahan",
          time: "11:00 - Selesai",
          location: "Grand Ballroom Royal Palace",
          address: "Lantai 7, Aula Kristal Putih",
          image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=500&auto=format&fit=crop",
          side: "right"
        }
      ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="px-8 flex flex-col items-center mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-pink-400 tracking-[0.4em] text-[10px] uppercase font-bold"
        >
          Special Moments
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-serif italic text-slate-800 mt-2"
        >
          Detail Acara
        </motion.h2>
      </div>

      <div className="space-y-24 px-6">
        {sessions.map((session, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: session.side === "left" ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col space-y-6"
          >
            {/* Foto Sesi Acara */}
            <div className="relative h-64 w-full rounded-[2rem] overflow-hidden shadow-lg border-4 border-pink-50">
               <motion.img 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
                src={session.image}
                className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 to-transparent" />
               <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-[10px] tracking-widest uppercase opacity-80">Event Session</p>
                  <h3 className="text-2xl font-serif italic">{session.title}</h3>
               </div>
            </div>

            {/* Informasi Detail */}
            <div className={`flex flex-col ${session.side === "right" ? "items-end text-right" : "items-start text-left"} px-2`}>
               <div className="flex items-center space-x-2 text-pink-500 mb-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="text-xs font-semibold tracking-tighter">{session.time}</span>
               </div>
               <p className="text-slate-700 font-medium italic">{session.location}</p>
               <p className="text-slate-400 text-xs mt-1 leading-relaxed max-w-[250px]">
                 {session.address}
               </p>
               
               {/* Decorative Line */}
               <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "40%" }}
                transition={{ delay: 0.5, duration: 1 }}
                className="h-[1px] bg-pink-100 mt-4" 
               />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RoyalEventDetails;