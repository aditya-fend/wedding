"use client";

import React from "react";
import { InvitationContent } from "@/types/invitation";
import { Playfair_Display, Montserrat } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700", "900"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600"] });

interface TemplateProps {
  data: InvitationContent;
  invitationId?: string;
}

export default function NeroGold({ data }: TemplateProps) {
  return (
    <div className={`bg-[#0A0A0A] text-[#E5E0D8] min-h-full ${montserrat.className}`}>
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center p-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
        
        <div className="relative z-10 space-y-4 animate-in fade-in zoom-in duration-1000">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#D4AF97] font-bold">The Wedding of</span>
          <h1 className={`${playfair.className} text-6xl md:text-7xl font-black leading-tight bg-gradient-to-b from-[#D4AF97] via-[#F1D5AB] to-[#D4AF97] bg-clip-text text-transparent`}>
            {data.mempelai_pria.nama.split(" ")[0]} <br /> & {data.mempelai_wanita.nama.split(" ")[0]}
          </h1>
          <p className="text-sm tracking-[0.2em] font-light opacity-80">
            {data.acara[0]?.tanggal ? new Date(data.acara[0].tanggal).toLocaleDateString('id-ID', { dateStyle: 'long' }) : "SAVE THE DATE"}
          </p>
        </div>
        
        <div className="absolute bottom-10 animate-bounce">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#D4AF97] to-transparent" />
        </div>
      </section>

      {/* Couple Section */}
      <section className="py-20 px-8 space-y-16 text-center border-t border-[#D4AF97]/10">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className={`${playfair.className} text-3xl font-bold text-[#D4AF97]`}>{data.mempelai_pria.nama}</h2>
            <p className="text-xs leading-relaxed opacity-60">
              Putra dari Bapak {data.mempelai_pria.ortu_ayah} <br /> & Ibu {data.mempelai_pria.ortu_ibu}
            </p>
          </div>
          
          <div className={`${playfair.className} text-4xl text-[#D4AF97] opacity-30 italic`}>&</div>
          
          <div className="space-y-4">
            <h2 className={`${playfair.className} text-3xl font-bold text-[#D4AF97]`}>{data.mempelai_wanita.nama}</h2>
            <p className="text-xs leading-relaxed opacity-60">
              Putri dari Bapak {data.mempelai_wanita.ortu_ayah} <br /> & Ibu {data.mempelai_wanita.ortu_ibu}
            </p>
          </div>
        </div>
      </section>

      {/* Event Section */}
      <section className="bg-[#111111] py-20 px-8 rounded-t-[3rem] border-t border-[#D4AF97]/20">
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <h3 className={`${playfair.className} text-2xl font-bold tracking-tighter`}>Waktu & Lokasi</h3>
            <div className="w-10 h-[2px] bg-[#D4AF97] mx-auto" />
          </div>

          {data.acara.map((item, idx) => (
            <div key={idx} className="bg-black/40 p-8 rounded-3xl border border-white/5 space-y-4 text-center">
              <span className="text-[10px] font-bold text-[#D4AF97] uppercase tracking-widest">{item.tipe}</span>
              <div className="space-y-1">
                <p className="font-bold text-lg">{item.tanggal}</p>
                <p className="text-sm opacity-60">{item.jam}</p>
              </div>
              <div className="space-y-1 pt-4 border-t border-white/5">
                <p className="font-bold text-[#D4AF97]">{item.lokasi}</p>
                <p className="text-xs opacity-50 italic">{item.alamat_lengkap}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Quote */}
      <section className="py-20 px-10 text-center space-y-6">
        <p className="text-sm italic opacity-60 leading-loose">
          "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy."
        </p>
        <div className="pt-10">
           <h4 className={`${playfair.className} text-xl font-bold bg-gradient-to-r from-[#D4AF97] to-[#F1D5AB] bg-clip-text text-transparent`}>
             #The{data.mempelai_pria.nama.split(" ")[0]}{data.mempelai_wanita.nama.split(" ")[0]}Wedding
           </h4>
        </div>
      </section>
    
        {/* ── WATERMARK SAJIJANJI ── */}
        <div className="w-full py-10 text-center flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
          <p className="text-[10px] uppercase tracking-widest font-bold mb-1">Created with love by</p>
          <a href="https://sajijanji.id" target="_blank" rel="noopener noreferrer" className="text-sm font-black">
            SajiJanji
          </a>
        </div>
      </div>
  );
}
