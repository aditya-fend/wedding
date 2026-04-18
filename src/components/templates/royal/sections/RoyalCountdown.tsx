"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { InvitationContent } from '@/types/invitation';

interface RoyalCountdownProps {
  data: InvitationContent;
}

const RoyalCountdown = ({ data }: RoyalCountdownProps) => {
  const countdownDate = data.countdown_date || data.acara?.[0]?.tanggal || new Date().toISOString();
  const targetDate = new Date(countdownDate).getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { staggerChildren: 0.2, duration: 0.8 } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="py-16 px-6 bg-white flex flex-col items-center"
    >
      <motion.div className="text-center mb-8">
        <p className="text-pink-400 tracking-[0.4em] text-[10px] uppercase font-bold mb-2">Menuju Hari Bahagia</p>
        <div className="w-12 h-[1px] bg-pink-100 mx-auto" />
      </motion.div>

      <div className="grid grid-cols-4 gap-3 w-full max-w-sm">
        {Object.entries(timeLeft).map(([label, value], idx) => (
          <motion.div 
            key={label}
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <div className="relative w-full aspect-square flex items-center justify-center bg-[#fffafa] rounded-2xl border border-pink-50 shadow-sm overflow-hidden">
              {/* Dekorasi Glossy */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-white/40 z-0" />
              
              <motion.span 
                key={value}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-2xl font-serif text-slate-700 z-10"
              >
                {value.toString().padStart(2, '0')}
              </motion.span>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-pink-300 mt-2 font-medium">
              {label === 'days' ? 'Hari' : label === 'hours' ? 'Jam' : label === 'minutes' ? 'Menit' : 'Detik'}
            </span>
          </motion.div>
        ))}
      </div>
      
      {/* Ornamen Garis Loop di bawah Timer */}
      <motion.div 
        animate={{ width: ["10%", "30%", "10%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="h-[1px] bg-pink-100 mt-10"
      />
    </motion.section>
  );
};

export default RoyalCountdown;