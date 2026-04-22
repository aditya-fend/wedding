"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, Heart, Play, Pause, Gift, Copy } from 'lucide-react';
import { InvitationContent } from '@/types/invitation';

export default function BatakHeritage({ data }: { data: InvitationContent }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [activeTab, setActiveTab] = useState<'rsvp' | 'wishes'>('rsvp');
  
  // Theme Colors - Batak Heritage
  const colors = {
    primary: '#8B0000', // Deep Red (Gorga)
    secondary: '#D4AF37', // Gold
    text: '#FFFFFF', // White
    bg: '#111111', // Very dark for contrast
    accent: '#000000' // Black
  };

  useEffect(() => {
    if (isOpened && data.music_url) {
      const audio = new Audio(data.music_url);
      audio.loop = true;
      if (isPlaying) {
        audio.play().catch(e => console.log(e));
      }
      return () => audio.pause();
    }
  }, [isOpened, isPlaying, data.music_url]);

  const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
    <div className="text-center mb-10 relative">
      <div className="flex justify-center items-center gap-2 mb-2">
        <div className="w-12 h-1 bg-[#D4AF37]"></div>
        <div className="w-3 h-3 rotate-45 bg-[#8B0000] border border-[#D4AF37]"></div>
        <div className="w-12 h-1 bg-[#D4AF37]"></div>
      </div>
      {subtitle && <p className="text-[10px] tracking-[0.3em] uppercase mb-1 font-bold text-white/70">{subtitle}</p>}
      <h2 className="text-3xl font-serif text-[#D4AF37] font-bold uppercase tracking-wider">{title}</h2>
    </div>
  );

  const CoverSection = () => (
    <motion.section 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center bg-cover bg-center"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(17, 17, 17, 0.7), rgba(139, 0, 0, 0.9)), url(${data.hero_image || '/placeholder.jpg'})`,
        color: colors.text
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: isOpened ? 0 : 1, pointerEvents: isOpened ? 'none' : 'auto' }}
      transition={{ duration: 1.2 }}
    >
      {/* Gorga pattern hint */}
      <div className="absolute top-0 left-0 w-full h-8 bg-repeat-x opacity-80" style={{ backgroundImage: `linear-gradient(45deg, ${colors.primary} 25%, ${colors.accent} 25%, ${colors.accent} 50%, ${colors.primary} 50%, ${colors.primary} 75%, ${colors.accent} 75%, ${colors.accent} 100%)`, backgroundSize: '20px 20px' }}></div>
      <div className="absolute bottom-0 left-0 w-full h-8 bg-repeat-x opacity-80" style={{ backgroundImage: `linear-gradient(-45deg, ${colors.primary} 25%, ${colors.accent} 25%, ${colors.accent} 50%, ${colors.primary} 50%, ${colors.primary} 75%, ${colors.accent} 75%, ${colors.accent} 100%)`, backgroundSize: '20px 20px' }}></div>
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ delay: 0.5, duration: 1 }}
        className="relative z-10 p-8 w-full max-w-[320px] bg-black/60 border-2 flex flex-col items-center"
        style={{ borderColor: colors.secondary }}
      >
        <div className="w-16 h-1 mb-6 bg-[#D4AF37]"></div>
        <p className="tracking-[0.2em] text-[10px] uppercase mb-4 font-bold text-[#D4AF37]">{data.cover_subtitle || 'Pesta Adat & Pemberkatan'}</p>
        <h1 className="text-4xl font-serif mb-6 uppercase tracking-wider text-white font-bold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
          {data.mempelai_pria.nama.split(' ')[0]} <br/> 
          <span className="text-xl my-2 block text-[#D4AF37]">&</span>
          {data.mempelai_wanita.nama.split(' ')[0]}
        </h1>
        <p className="text-[10px] font-bold tracking-[0.2em] mb-10 text-white/80">{data.wedding_date || '24 Agustus 2026'}</p>
        <div className="w-16 h-1 mb-8 bg-[#D4AF37]"></div>
        
        <button 
          onClick={() => setIsOpened(true)}
          className="px-6 py-3 font-bold tracking-[0.2em] uppercase text-[10px] transition-all bg-[#D4AF37] text-black w-full"
        >
          Buka Undangan
        </button>
      </motion.div>
    </motion.section>
  );

  if (!isOpened) return <CoverSection />;

  return (
    <div className="min-h-screen font-sans overflow-x-hidden" style={{ backgroundColor: colors.bg, color: colors.text }}>
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 flex items-center justify-center border-2 bg-black transition-transform hover:scale-110 shadow-lg"
        style={{ borderColor: colors.secondary, color: colors.secondary }}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
      </button>

      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-20 pb-12 px-6 border-b-8" style={{ borderColor: colors.primary }}>
        <div className="absolute inset-0 z-0">
           <img src={data.hero_image || '/placeholder.jpg'} alt="Hero" className="w-full h-full object-cover opacity-60 grayscale mix-blend-luminosity" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center w-full bg-black/40 p-6 border-2 backdrop-blur-sm" style={{ borderColor: colors.secondary }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <p className="tracking-[0.3em] text-[9px] uppercase mb-4 font-bold" style={{ color: colors.secondary }}>{data.cover_title || 'Horas! Pesta Pernikahan'}</p>
            <h1 className="text-4xl font-serif mb-6 uppercase tracking-widest font-bold" style={{ color: colors.text }}>
              {data.mempelai_pria.nama.split(' ')[0]} <br/><span className="text-2xl text-[#D4AF37]">&</span><br/> {data.mempelai_wanita.nama.split(' ')[0]}
            </h1>
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/70">
              {data.wedding_date || '24 Agustus 2026'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Couple Section */}
      <section className="py-20 px-6 relative z-10 bg-[#111111]">
        <div className="w-full mx-auto">
          <SectionHeading title="Mempelai" subtitle="Pengantin" />
          
          <div className="flex flex-col gap-10 items-center justify-center">
            {/* Pria */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="w-full text-center bg-[#1A1A1A] p-6 border-l-4 border-r-4" style={{ borderColor: colors.primary }}>
              <div className="w-36 h-48 mx-auto mb-6 bg-cover bg-center border-4" style={{ backgroundImage: `url(${data.mempelai_pria.foto || '/placeholder.jpg'})`, borderColor: colors.secondary }}></div>
              <h3 className="text-xl font-serif uppercase font-bold mb-2 text-[#D4AF37]">{data.mempelai_pria.nama}</h3>
              <p className="text-[10px] uppercase tracking-widest opacity-80 mb-4 line-clamp-2">
                Putra dari Bapak {data.mempelai_pria.ortu_ayah} <br/>& Ibu {data.mempelai_pria.ortu_ibu}
              </p>
              {data.mempelai_pria.instagram && (
                <a href={`https://instagram.com/${data.mempelai_pria.instagram}`} className="text-[9px] uppercase tracking-widest inline-block border-b hover:opacity-50 transition-opacity" style={{ color: colors.secondary, borderColor: colors.secondary }}>
                  @{data.mempelai_pria.instagram}
                </a>
              )}
            </motion.div>

            {/* Wanita */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="w-full text-center bg-[#1A1A1A] p-6 border-l-4 border-r-4" style={{ borderColor: colors.primary }}>
              <div className="w-36 h-48 mx-auto mb-6 bg-cover bg-center border-4" style={{ backgroundImage: `url(${data.mempelai_wanita.foto || '/placeholder.jpg'})`, borderColor: colors.secondary }}></div>
              <h3 className="text-xl font-serif uppercase font-bold mb-2 text-[#D4AF37]">{data.mempelai_wanita.nama}</h3>
              <p className="text-[10px] uppercase tracking-widest opacity-80 mb-4 line-clamp-2">
                Putri dari Bapak {data.mempelai_wanita.ortu_ayah} <br/>& Ibu {data.mempelai_wanita.ortu_ibu}
              </p>
              {data.mempelai_wanita.instagram && (
                <a href={`https://instagram.com/${data.mempelai_wanita.instagram}`} className="text-[9px] uppercase tracking-widest inline-block border-b hover:opacity-50 transition-opacity" style={{ color: colors.secondary, borderColor: colors.secondary }}>
                  @{data.mempelai_wanita.instagram}
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Event Detail & 4. Countdown */}
      <section className="py-20 px-6 relative z-10" style={{ backgroundColor: colors.primary }}>
        <div className="w-full mx-auto">
          <SectionHeading title="Acara" subtitle="Pemberkatan & Adat" />
          
          <div className="flex flex-col gap-8">
            {data.acara.map((event, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-black p-6 border-2 border-[#D4AF37] relative text-center"
              >
                <h3 className="text-xl font-serif mb-6 uppercase tracking-widest font-bold" style={{ color: colors.secondary }}>{event.tipe}</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest opacity-60 mb-1">Tanggal</p>
                    <p className="font-bold text-sm">{event.tanggal}</p>
                    <p className="text-[10px] mt-1 text-[#D4AF37]">{event.jam}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest opacity-60 mb-1">Lokasi</p>
                    <p className="font-bold text-sm">{event.lokasi}</p>
                    <p className="text-[10px] opacity-80 mt-1 px-4">{event.alamat_lengkap}</p>
                  </div>
                </div>

                <a 
                  href={event.link_maps} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-block px-6 py-3 font-bold uppercase tracking-widest text-[10px] bg-[#D4AF37] text-black w-full"
                >
                  Buka Google Maps
                </a>
              </motion.div>
            ))}
          </div>

          {/* Countdown */}
          {data.countdown_date && (
            <div className="mt-16 text-center bg-black/30 p-6 border border-[#D4AF37]/50">
              <h3 className="text-sm font-serif uppercase tracking-widest mb-6 font-bold" style={{ color: colors.secondary }}>Menuju Hari H</h3>
              <div className="flex justify-center gap-3">
                 {['Hari', 'Jam', 'Mnt', 'Dtk'].map((unit, idx) => (
                   <div key={unit} className="bg-black border-2 p-3 w-16" style={{ borderColor: colors.secondary }}>
                     <span className="block text-2xl font-bold mb-1" style={{ color: colors.secondary }}>
                       {['05', '18', '30', '12'][idx]}
                     </span>
                     <span className="text-[8px] tracking-[0.2em] uppercase opacity-80">{unit}</span>
                   </div>
                 ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Love Story */}
      {data.love_story && data.love_story.length > 0 && (
        <section className="py-20 px-6 relative z-10 bg-[#0A0A0A]">
          <div className="w-full mx-auto">
            <SectionHeading title="Cerita" subtitle="Perjalanan Cinta" />
            <div className="space-y-6 border-l-2 ml-4 pl-6 relative" style={{ borderColor: colors.secondary }}>
              {data.love_story.map((story, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#8B0000] border-2 border-[#D4AF37]"></div>
                  <div className="bg-[#1A1A1A] p-5 border border-white/10">
                    <span className="inline-block px-3 py-1 text-[9px] font-bold tracking-widest uppercase mb-3 bg-[#D4AF37] text-black">
                      {story.tahun}
                    </span>
                    <p className="text-[11px] leading-relaxed opacity-90">{story.cerita}</p>
                    {story.foto && (
                      <div className="w-full h-32 mt-4 bg-cover bg-center border border-white/20" style={{ backgroundImage: `url(${story.foto})` }}></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Gallery */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="py-20 px-6 bg-[#111111]">
          <SectionHeading title="Galeri" subtitle="Momen Bahagia" />
          <div className="w-full columns-2 gap-3 space-y-3">
            {data.gallery.map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="break-inside-avoid border-2 p-1 bg-black"
                style={{ borderColor: colors.primary }}
              >
                <img src={img} alt={`Gallery ${idx}`} className="w-full h-auto filter grayscale hover:grayscale-0 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Gift & RSVP */}
      <section className="py-20 px-6 relative bg-[#1A1A1A]">
        <div className="w-full mx-auto">
          <SectionHeading title="Buku Tamu" subtitle="Doa & Kehadiran" />
          
          <div className="flex gap-2 mb-6">
            <button 
              className={`flex-1 py-3 text-[10px] uppercase tracking-widest font-bold transition-colors border-2`}
              style={activeTab === 'rsvp' ? { backgroundColor: colors.secondary, color: 'black', borderColor: colors.secondary } : { borderColor: colors.secondary, color: colors.secondary }}
              onClick={() => setActiveTab('rsvp')}
            >
              Kehadiran
            </button>
            <button 
              className={`flex-1 py-3 text-[10px] uppercase tracking-widest font-bold transition-colors border-2`}
              style={activeTab === 'wishes' ? { backgroundColor: colors.secondary, color: 'black', borderColor: colors.secondary } : { borderColor: colors.secondary, color: colors.secondary }}
              onClick={() => setActiveTab('wishes')}
            >
              Hadiah
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'rsvp' ? (
              <motion.div key="rsvp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-black p-6 border border-white/10">
                <form className="space-y-4">
                  <input type="text" placeholder="Nama Lengkap" className="w-full bg-[#111111] border border-white/20 px-4 py-3 text-xs outline-none focus:border-[#D4AF37] text-white" />
                  <select className="w-full bg-[#111111] border border-white/20 px-4 py-3 text-xs outline-none focus:border-[#D4AF37] text-white">
                    <option value="1">Hadir (1 Orang)</option>
                    <option value="2">Hadir (2 Orang)</option>
                    <option value="0">Tidak Hadir</option>
                  </select>
                  <textarea placeholder="Pesan / Doa" rows={4} className="w-full bg-[#111111] border border-white/20 px-4 py-3 text-xs outline-none resize-none focus:border-[#D4AF37] text-white"></textarea>
                  <button type="button" className="w-full py-3 font-bold uppercase tracking-[0.2em] text-[10px] transition-colors bg-[#8B0000] text-white">
                    Kirim Pesan
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div key="wishes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                {data.digital_envelope.map((env, idx) => (
                  <div key={idx} className="bg-black border border-[#D4AF37] p-6 text-center">
                    <Gift className="mx-auto mb-3 opacity-80" size={24} style={{ color: colors.secondary }} />
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-2 text-[#D4AF37]">{env.bank_name}</h4>
                    <p className="text-xl font-mono mb-2 text-white">{env.account_number}</p>
                    <p className="text-[9px] uppercase tracking-widest opacity-60 mb-5">a.n {env.account_holder}</p>
                    <button className="px-5 py-2 border text-[9px] uppercase tracking-widest font-bold bg-[#D4AF37] text-black w-full flex items-center justify-center gap-2">
                      <Copy size={12} /> Salin Nomor
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 10. Dress Code & Info */}
      <section className="py-20 px-6 bg-[#0A0A0A]">
        <div className="w-full text-center border-y-2 border-[#333333] py-10">
          {data.dress_code && (
            <div className="mb-10">
              <p className="text-[10px] uppercase tracking-[0.3em] mb-3 font-bold" style={{ color: colors.secondary }}>Panduan Busana</p>
              <p className="text-xl font-serif uppercase tracking-wider font-bold text-white">{data.dress_code}</p>
              {data.dress_code_description && <p className="text-[10px] opacity-70 mt-2">{data.dress_code_description}</p>}
              
              {data.dress_code_colors && (
                <div className="flex justify-center gap-3 mt-5">
                  {data.dress_code_colors.map((color, idx) => (
                    <div key={idx} className="w-8 h-8 rounded-none border border-white" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
              )}
            </div>
          )}

          {data.additional_info_list && (
            <div className="pt-8 border-t border-[#333333]">
              <p className="text-[10px] uppercase tracking-[0.3em] mb-4 font-bold" style={{ color: colors.secondary }}>Informasi</p>
              <ul className="space-y-3 inline-block text-left text-[11px] opacity-80">
                {data.additional_info_list.map((info, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rotate-45 mt-1 shrink-0 bg-[#D4AF37]"></div>
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* 12. Closing */}
      <section className="py-24 px-6 text-center bg-[#8B0000] relative">
        <div className="absolute top-0 left-0 w-full h-4 bg-repeat-x opacity-50" style={{ backgroundImage: `linear-gradient(45deg, #000 25%, #D4AF37 25%, #D4AF37 50%, #000 50%, #000 75%, #D4AF37 75%, #D4AF37 100%)`, backgroundSize: '10px 10px' }}></div>
        
        <p className="font-serif text-sm leading-relaxed mb-10 mt-6 opacity-90 uppercase tracking-widest font-bold">
          "{data.closing_message || 'Mauliate Godang. Terima kasih atas doa dan kehadiran Bapak/Ibu sekalian.'}"
        </p>
        <div className="flex justify-center items-center mb-10 gap-2">
          <div className="w-12 h-0.5 bg-[#D4AF37]"></div>
          <div className="w-2 h-2 rotate-45 bg-[#D4AF37]"></div>
          <div className="w-12 h-0.5 bg-[#D4AF37]"></div>
        </div>
        <h2 className="text-3xl font-serif uppercase tracking-widest font-bold text-[#D4AF37]">
          {data.mempelai_pria.nama.split(' ')[0]} <br />
          <span className="text-lg lowercase italic mx-2 my-2 block text-white">&amp;</span>
          {data.mempelai_wanita.nama.split(' ')[0]}
        </h2>
        <p className="text-[8px] uppercase tracking-[0.3em] opacity-50 mt-16 text-black font-bold">Divine Nexus</p>
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
