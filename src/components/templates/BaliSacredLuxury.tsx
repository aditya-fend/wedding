"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, Heart, Play, Pause, Gift, Copy, Leaf } from 'lucide-react';
import { InvitationContent } from '@/types/invitation';

export default function BaliSacredLuxury({ data }: { data: InvitationContent }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [activeTab, setActiveTab] = useState<'rsvp' | 'wishes'>('rsvp');
  
  // Theme Colors - Bali Sacred
  const colors = {
    primary: '#2E4A35', // Tropical Green
    secondary: '#B9935A', // Bronze/Gold
    text: '#333333', // Dark text
    bg: '#F4F1EA', // Sand/Stone white
    accent: '#8B5A2B' // Wood
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

  const CoverSection = () => (
    <motion.section 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center bg-cover bg-center"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(46, 74, 53, 0.4), rgba(46, 74, 53, 0.9)), url(${data.hero_image || '/placeholder.jpg'})`,
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: isOpened ? 0 : 1, pointerEvents: isOpened ? 'none' : 'auto' }}
      transition={{ duration: 1.5 }}
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/concrete-wall.png")' }}></div>
      
      <motion.div 
        initial={{ y: 30, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.5, duration: 1.2 }}
        className="relative z-10 border border-white/30 p-8 w-full max-w-[320px] bg-white/10 backdrop-blur-md rounded-t-[100px]"
      >
        <Leaf size={24} className="mx-auto mb-6 text-[#B9935A]" />
        <p className="tracking-[0.3em] text-[10px] uppercase mb-4 text-[#F4F1EA]">{data.cover_subtitle || 'Pawiwahan'}</p>
        <h1 className="text-4xl font-serif mb-6 text-[#B9935A] leading-tight" style={{ textShadow: '1px 1px 10px rgba(0,0,0,0.5)' }}>
          {data.mempelai_pria.nama.split(' ')[0]} <br/> 
          <span className="text-sm block my-2 italic text-[#F4F1EA]">&</span>
          {data.mempelai_wanita.nama.split(' ')[0]}
        </h1>
        <div className="w-12 h-px bg-[#B9935A] mx-auto mb-6"></div>
        <p className="text-[10px] font-light tracking-[0.2em] mb-10 text-[#F4F1EA]">{data.wedding_date || '24 Agustus 2026'}</p>
        
        <button 
          onClick={() => setIsOpened(true)}
          className="px-6 py-3 tracking-[0.2em] uppercase text-[9px] transition-all rounded-full border border-[#B9935A] text-[#B9935A] hover:bg-[#B9935A] hover:text-white"
        >
          Buka Undangan
        </button>
      </motion.div>
    </motion.section>
  );

  if (!isOpened) return <CoverSection />;

  return (
    <div className="min-h-screen font-sans overflow-x-hidden relative" style={{ backgroundColor: colors.bg, color: colors.text }}>
      <div className="fixed inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/concrete-wall.png")' }}></div>
      
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        style={{ backgroundColor: colors.primary, color: colors.bg }}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-1" />}
      </button>

      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-end justify-center p-6 rounded-b-[40px] overflow-hidden bg-white shadow-xl">
        <div className="absolute inset-0 z-0">
           <img src={data.hero_image || '/placeholder.jpg'} alt="Hero" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center w-full pb-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
            <Leaf size={24} className="mx-auto mb-4" style={{ color: colors.secondary }} />
            <p className="tracking-[0.2em] text-[10px] uppercase mb-4" style={{ color: colors.primary }}>{data.cover_title || 'Om Swastiastu'}</p>
            <h1 className="text-5xl font-serif mb-4" style={{ color: colors.primary }}>
              {data.mempelai_pria.nama.split(' ')[0]} <span className="text-xl mx-2">&</span> {data.mempelai_wanita.nama.split(' ')[0]}
            </h1>
            <p className="text-[10px] uppercase tracking-widest" style={{ color: colors.secondary }}>
              {data.wedding_date || '24 Agustus 2026'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Couple Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="w-full text-center">
          <h2 className="text-2xl font-serif mb-12" style={{ color: colors.primary }}>Sang Mempelai</h2>
          
          <div className="flex flex-col gap-10 items-center">
            {/* Pria */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="w-full text-center">
              <div className="w-40 h-48 mx-auto mb-6 bg-cover bg-center rounded-t-[100px]" style={{ backgroundImage: `url(${data.mempelai_pria.foto || '/placeholder.jpg'})`, border: `2px solid ${colors.secondary}` }}></div>
              <h3 className="text-xl font-serif mb-2" style={{ color: colors.primary }}>{data.mempelai_pria.nama}</h3>
              <p className="text-[10px] opacity-70 mb-4 leading-relaxed">
                Putra dari Bapak {data.mempelai_pria.ortu_ayah} <br/>& Ibu {data.mempelai_pria.ortu_ibu}
              </p>
              {data.mempelai_pria.instagram && (
                <a href={`https://instagram.com/${data.mempelai_pria.instagram}`} className="text-[9px] uppercase tracking-widest inline-flex items-center gap-1" style={{ color: colors.secondary }}>
                  @{data.mempelai_pria.instagram}
                </a>
              )}
            </motion.div>

            <div className="w-px h-12" style={{ backgroundColor: colors.secondary }}></div>

            {/* Wanita */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="w-full text-center">
              <div className="w-40 h-48 mx-auto mb-6 bg-cover bg-center rounded-b-[100px]" style={{ backgroundImage: `url(${data.mempelai_wanita.foto || '/placeholder.jpg'})`, border: `2px solid ${colors.secondary}` }}></div>
              <h3 className="text-xl font-serif mb-2" style={{ color: colors.primary }}>{data.mempelai_wanita.nama}</h3>
              <p className="text-[10px] opacity-70 mb-4 leading-relaxed">
                Putri dari Bapak {data.mempelai_wanita.ortu_ayah} <br/>& Ibu {data.mempelai_wanita.ortu_ibu}
              </p>
              {data.mempelai_wanita.instagram && (
                <a href={`https://instagram.com/${data.mempelai_wanita.instagram}`} className="text-[9px] uppercase tracking-widest inline-flex items-center gap-1" style={{ color: colors.secondary }}>
                  @{data.mempelai_wanita.instagram}
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Event Detail & 4. Countdown */}
      <section className="py-20 px-4 relative z-10" style={{ backgroundColor: colors.primary }}>
        <div className="w-full rounded-[30px] p-6 text-center" style={{ backgroundColor: colors.bg }}>
          <h2 className="text-2xl font-serif mb-8" style={{ color: colors.primary }}>Rangkaian Acara</h2>
          
          <div className="flex flex-col gap-6">
            {data.acara.map((event, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border p-6 rounded-2xl relative overflow-hidden"
                style={{ borderColor: `${colors.secondary}40` }}
              >
                <h3 className="text-xl font-serif mb-4" style={{ color: colors.primary }}>{event.tipe}</h3>
                
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Waktu</p>
                    <p className="font-semibold text-sm" style={{ color: colors.text }}>{event.tanggal}</p>
                    <p className="text-[10px]" style={{ color: colors.text }}>{event.jam}</p>
                  </div>
                  <div className="w-8 h-px mx-auto" style={{ backgroundColor: colors.secondary }}></div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Tempat</p>
                    <p className="font-semibold text-sm" style={{ color: colors.text }}>{event.lokasi}</p>
                    <p className="text-[10px] opacity-70 mt-1">{event.alamat_lengkap}</p>
                  </div>
                </div>

                <a 
                  href={event.link_maps} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-block px-6 py-2 rounded-full text-[9px] uppercase tracking-widest font-semibold transition-colors w-full"
                  style={{ backgroundColor: colors.primary, color: colors.bg }}
                >
                  Peta Lokasi
                </a>
              </motion.div>
            ))}
          </div>

          {/* Countdown */}
          {data.countdown_date && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-[10px] uppercase tracking-widest mb-4" style={{ color: colors.secondary }}>Menanti Hari</p>
              <div className="flex justify-center gap-2">
                 {['Hari', 'Jam', 'Mnt', 'Dtk'].map((unit, idx) => (
                   <div key={unit} className="w-14 h-14 flex flex-col items-center justify-center rounded-lg" style={{ backgroundColor: colors.primary, color: colors.bg }}>
                     <span className="text-xl font-serif mb-0.5">{['08', '12', '45', '30'][idx]}</span>
                     <span className="text-[7px] tracking-widest uppercase opacity-80">{unit}</span>
                   </div>
                 ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Love Story */}
      {data.love_story && data.love_story.length > 0 && (
        <section className="py-20 px-6 bg-white">
          <div className="w-full text-center">
            <h2 className="text-2xl font-serif mb-12" style={{ color: colors.primary }}>Kisah Kami</h2>
            <div className="space-y-8">
              {data.love_story.map((story, idx) => (
                <div key={idx} className="flex flex-col bg-[#F4F1EA] rounded-3xl overflow-hidden shadow-sm">
                  {story.foto && (
                    <div className="w-full h-48 bg-cover bg-center" style={{ backgroundImage: `url(${story.foto})` }}></div>
                  )}
                  <div className="p-6 text-center">
                    <span className="inline-block px-4 py-1 text-[10px] font-bold tracking-widest uppercase mb-3 rounded-full" style={{ backgroundColor: colors.secondary, color: colors.bg }}>
                      {story.tahun}
                    </span>
                    <p className="text-[11px] leading-relaxed opacity-80">{story.cerita}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Gallery */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="py-20 px-6">
          <h2 className="text-2xl font-serif text-center mb-10" style={{ color: colors.primary }}>Galeri</h2>
          <div className="w-full columns-2 gap-3 space-y-3">
            {data.gallery.map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="break-inside-avoid rounded-xl overflow-hidden"
              >
                <img src={img} alt={`Gallery ${idx}`} className="w-full h-auto" />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Gift & RSVP */}
      <section className="py-20 px-4 bg-white rounded-t-[40px] shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <div className="w-full">
          <div className="flex bg-[#F4F1EA] rounded-full p-1 mb-8">
            <button 
              className={`flex-1 py-3 rounded-full text-[10px] uppercase tracking-widest font-semibold transition-colors`}
              style={activeTab === 'rsvp' ? { backgroundColor: colors.primary, color: colors.bg } : { color: colors.primary }}
              onClick={() => setActiveTab('rsvp')}
            >
              Kehadiran
            </button>
            <button 
              className={`flex-1 py-3 rounded-full text-[10px] uppercase tracking-widest font-semibold transition-colors`}
              style={activeTab === 'wishes' ? { backgroundColor: colors.primary, color: colors.bg } : { color: colors.primary }}
              onClick={() => setActiveTab('wishes')}
            >
              Hadiah
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'rsvp' ? (
              <motion.div key="rsvp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <form className="space-y-4">
                  <input type="text" placeholder="Nama Anda" className="w-full bg-[#F4F1EA] border-none rounded-xl px-4 py-3 text-[11px] outline-none" />
                  <select className="w-full bg-[#F4F1EA] border-none rounded-xl px-4 py-3 text-[11px] outline-none opacity-80">
                    <option value="1">Hadir (1 Orang)</option>
                    <option value="2">Hadir (2 Orang)</option>
                    <option value="0">Tidak Hadir</option>
                  </select>
                  <textarea placeholder="Ucapan / Doa" rows={3} className="w-full bg-[#F4F1EA] border-none rounded-xl px-4 py-3 text-[11px] outline-none resize-none"></textarea>
                  <button type="button" className="w-full py-3 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] transition-colors mt-2" style={{ backgroundColor: colors.secondary, color: colors.bg }}>
                    Kirim Konfirmasi
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div key="wishes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                {data.digital_envelope.map((env, idx) => (
                  <div key={idx} className="bg-[#F4F1EA] p-6 rounded-2xl text-center">
                    <Gift className="mx-auto mb-3 opacity-80" size={20} style={{ color: colors.primary }} />
                    <h4 className="text-sm font-semibold mb-1" style={{ color: colors.text }}>{env.bank_name}</h4>
                    <p className="text-lg font-mono mb-1" style={{ color: colors.primary }}>{env.account_number}</p>
                    <p className="text-[9px] uppercase tracking-widest opacity-60 mb-4">a.n {env.account_holder}</p>
                    <button className="px-5 py-2 rounded-full text-[9px] uppercase tracking-widest font-semibold flex items-center justify-center gap-1 mx-auto" style={{ backgroundColor: colors.primary, color: colors.bg }}>
                      <Copy size={12} /> Salin Rekening
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 10. Dress Code & Info */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: colors.bg }}>
        {data.dress_code && (
          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: colors.secondary }}>Dress Code</p>
            <p className="text-xl font-serif" style={{ color: colors.primary }}>{data.dress_code}</p>
            {data.dress_code_description && <p className="text-[10px] opacity-70 mt-2">{data.dress_code_description}</p>}
            
            {data.dress_code_colors && (
              <div className="flex justify-center gap-3 mt-4">
                {data.dress_code_colors.map((color, idx) => (
                  <div key={idx} className="w-6 h-6 rounded-full shadow-md border-2 border-white" style={{ backgroundColor: color }}></div>
                ))}
              </div>
            )}
          </div>
        )}

        {data.additional_info_list && (
          <div className="pt-6 border-t border-black/10">
            <p className="text-[10px] uppercase tracking-widest mb-4" style={{ color: colors.secondary }}>Informasi Tambahan</p>
            <ul className="space-y-2 inline-block text-left text-[11px] opacity-80">
              {data.additional_info_list.map((info, idx) => (
                <li key={idx} className="flex gap-2 items-start">
                  <Leaf size={10} className="mt-0.5 shrink-0" style={{ color: colors.secondary }} />
                  <span>{info}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* 12. Closing */}
      <section className="py-20 px-6 text-center text-white" style={{ backgroundColor: colors.primary }}>
        <Leaf size={24} className="mx-auto mb-6" style={{ color: colors.secondary }} />
        <p className="font-serif text-sm leading-relaxed mb-8 opacity-90">
          "{data.closing_message || 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.'}"
        </p>
        <div className="w-12 h-px mx-auto mb-8" style={{ backgroundColor: colors.secondary }}></div>
        <h2 className="text-3xl font-serif mb-2" style={{ color: colors.secondary }}>
          {data.mempelai_pria.nama.split(' ')[0]} & {data.mempelai_wanita.nama.split(' ')[0]}
        </h2>
        <p className="text-[8px] uppercase tracking-widest opacity-50 mt-10">Divine Nexus</p>
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
