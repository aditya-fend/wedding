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

      <div className="space-y-8 px-6">
        {sessions.map((session, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative bg-white border border-pink-100 rounded-[2.5rem] p-10 shadow-sm overflow-hidden"
          >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50/50 rounded-full -mr-16 -mt-16 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-slate-50 rounded-full -ml-12 -mb-12 blur-2xl" />

            <div className="relative z-10 flex flex-col items-center text-center">
               <motion.span 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 className="text-pink-400 tracking-[0.4em] text-[10px] uppercase font-bold mb-3"
               >
                 {session.title.includes('Akad') ? 'The Sacred' : 'The Celebration'}
               </motion.span>
               
               <h3 className="text-3xl font-serif italic text-slate-800 mb-8">{session.title}</h3>
               
               <div className="w-full space-y-6">
                  {/* Time Section */}
                  <div className="flex flex-col items-center">
                     <div className="flex items-center space-x-2 text-pink-500 mb-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                           <circle cx="12" cy="12" r="10" />
                           <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span className="text-xs font-bold tracking-tight">{session.time}</span>
                     </div>
                  </div>

                  {/* Location Section */}
                  <div className="flex flex-col items-center gap-2">
                     <p className="text-slate-700 font-medium italic text-lg leading-tight">{session.location}</p>
                     <div className="w-8 h-[1px] bg-pink-100" />
                     <p className="text-slate-400 text-xs leading-relaxed max-w-[240px]">
                        {session.address}
                     </p>
                  </div>
               </div>
               
               {/* Decorative Bottom Line */}
               <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-[1px] w-16 bg-pink-200 mt-10" 
               />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RoyalEventDetails;