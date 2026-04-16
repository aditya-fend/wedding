"use client";

import React from "react";
import { InvitationContent } from "@/types/invitation";
import { Montserrat, Playfair_Display } from "next/font/google";
import { motion } from "framer-motion";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

interface TemplateProps {
  data: InvitationContent;
}

export default function AuraDark({ data }: TemplateProps) {
  // Tambahkan guard clause di paling atas
  if (!data || !data.mempelai_pria) {
    return (
      <div className="h-full flex items-center justify-center bg-[#0F0F0F] text-white">
        <p className="text-xs animate-pulse">Initializing DNA...</p>
      </div>
    );
  }

  const pria = data.mempelai_pria?.nama || "Pria";
  const wanita = data.mempelai_wanita?.nama || "Wanita";

  return (
    <div
      className={`${montserrat.className} bg-[#0F0F0F] text-[#E5E0D8] min-h-full selection:bg-[#D4AF97] selection:text-black`}
    >
      {/* ── HERO SECTION ── */}
      <section className="relative h-screen flex flex-col items-center justify-center p-8 overflow-hidden">
        {/* Subtle Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-0" />
        <div className="absolute inset-0 opacity-[0.15] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] z-0" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center space-y-6"
        >
          <span className="text-[10px] tracking-[0.6em] uppercase font-bold text-[#D4AF97] opacity-80">
            Official Invitation
          </span>

          <h1
            className={`${playfair.className} text-7xl md:text-8xl font-black leading-none`}
          >
            {pria.split(" ")[0]}
            <span className="block text-[#D4AF97] text-4xl md:text-5xl my-2">
              &
            </span>
            {wanita.split(" ")[0]}
          </h1>

          <div className="pt-6">
            <p className="text-xs tracking-[0.3em] uppercase opacity-60">
              {data.acara?.[0]?.tanggal
                ? new Date(data.acara[0].tanggal).toLocaleDateString("id-ID", {
                    dateStyle: "long",
                  })
                : "Coming Soon"}
            </p>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-30">
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#D4AF97] to-transparent" />
        </div>
      </section>

      {/* ── COUPLE SECTION ── */}
      <section className="py-24 px-8 border-t border-white/5">
        <div className="max-w-md mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className={`${playfair.className} text-3xl font-bold`}>
              {data.mempelai_pria.nama}
            </h2>
            <div className="text-[10px] uppercase tracking-widest text-[#D4AF97] font-bold">
              Mempelai Pria
            </div>
            <p className="text-xs opacity-50 leading-relaxed font-light">
              Putra dari Bapak {data.mempelai_pria.ortu_ayah} <br /> & Ibu{" "}
              {data.mempelai_pria.ortu_ibu}
            </p>
          </div>

          <div className="flex justify-center opacity-20">
            <div className="w-12 h-[1px] bg-[#D4AF97]" />
          </div>

          <div className="text-center space-y-4">
            <h2 className={`${playfair.className} text-3xl font-bold`}>
              {data.mempelai_wanita.nama}
            </h2>
            <div className="text-[10px] uppercase tracking-widest text-[#D4AF97] font-bold">
              Mempelai Wanita
            </div>
            <p className="text-xs opacity-50 leading-relaxed font-light">
              Putri dari Bapak {data.mempelai_wanita.ortu_ayah} <br /> & Ibu{" "}
              {data.mempelai_wanita.ortu_ibu}
            </p>
          </div>
        </div>
      </section>

      {/* ── EVENT SECTION ── */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-md mx-auto space-y-12">
          <div className="text-center">
            <h3
              className={`${playfair.className} text-2xl font-bold tracking-tight`}
            >
              Special Event
            </h3>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF97] mt-2">
              Save the Date
            </p>
          </div>

          {data.acara.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="p-10 border border-white/10 rounded-[2rem] bg-black text-center space-y-6"
            >
              <div className="inline-block px-4 py-1.5 border border-[#D4AF97]/30 rounded-full text-[9px] font-bold uppercase tracking-widest text-[#D4AF97]">
                {item.tipe}
              </div>
              <div className="space-y-1">
                <p className="text-xl font-black">{item.tanggal}</p>
                <p className="text-xs opacity-50 tracking-tighter">
                  {item.jam}
                </p>
              </div>
              <div className="space-y-2 pt-4 border-t border-white/5">
                <p className="font-bold text-[#D4AF97] text-sm uppercase tracking-wider">
                  {item.lokasi}
                </p>
                <p className="text-[11px] opacity-40 leading-relaxed italic">
                  {item.alamat_lengkap}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── GALLERY PREVIEW (Minimalist) ── */}
      {data.gallery.length > 0 && (
        <section className="py-24 px-4">
          <div className="grid grid-cols-2 gap-4">
            {data.gallery.slice(0, 4).map((url, i) => (
              <div
                key={i}
                className={`aspect-[3/4] overflow-hidden rounded-2xl ${i % 2 !== 0 ? "mt-8" : ""}`}
              >
                <img
                  src={url}
                  alt="Gallery"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer className="py-20 text-center border-t border-white/5">
        <h4
          className={`${playfair.className} text-lg font-bold tracking-widest opacity-80`}
        >
          {pria.split(" ")[0]} & {wanita.split(" ")[0]}
        </h4>
        <p className="text-[9px] uppercase tracking-[0.4em] mt-4 opacity-30 font-bold">
          Created by Undang Dong
        </p>
      </footer>
    </div>
  );
}
