'use client';

import { motion } from 'framer-motion';
import { Playfair_Display, Cinzel } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], style: ['italic'] });
const cinzel = Cinzel({ subsets: ['latin'], weight: ['400'] });

interface ParentInfoProps {
  gender: 'groom' | 'bride';
  sonOrDaughter: string; // Contoh: "Putra Pertama" atau "Putri Bungsu"
  fatherName: string;
  motherName: string;
}

export default function ParentInfo({ gender, sonOrDaughter, fatherName, motherName }: ParentInfoProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.5 }}
      className="mt-6 space-y-2"
    >
      <p className="text-slate-400 text-xs md:text-sm tracking-wide font-light italic">
        {sonOrDaughter} dari
      </p>
      
      <div className="flex flex-col items-center">
        <h4 className={`${cinzel.className} text-slate-100 text-base md:text-lg tracking-widest`}>
          Bapak {fatherName}
        </h4>
        <span className={`${playfair.className} text-amber-600/60 text-sm my-1`}>&</span>
        <h4 className={`${cinzel.className} text-slate-100 text-base md:text-lg tracking-widest`}>
          Ibu {motherName}
        </h4>
      </div>
      
      {/* Garis dekoratif kecil di bawah nama orang tua */}
      <div className="pt-4 flex justify-center">
        <div className="h-[1px] w-8 bg-amber-600/30"></div>
      </div>
    </motion.div>
  );
}