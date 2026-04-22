"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, Heart, Play, Pause, Gift, Copy, Gem } from 'lucide-react';
import { InvitationContent } from '@/types/invitation';

export default function BugisGoldenSilk({ data }: { data: InvitationContent }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [activeTab, setActiveTab] = useState<'rsvp' | 'wishes'>('rsvp');
  
  // Theme Colors - Bugis Golden Silk
  const colors = {
    primary: '#004B23', // Dark Emerald Green (warna khas Bugis)
    secondary: '#FFD700', // Bright Gold (sutra/sabbé)
    accent: '#FFA500', // Orange/Yellow accent (sutra)
    text: '#FFFFFF', // White
    bg: '#002912', // Very dark green background
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
      <Gem size={20} className="mx-auto mb-3" style={{ color: colors.secondary }} />
      {subtitle && <p className="text-[9px] tracking-[0.3em] uppercase mb-1 font-bold" style={{ color: colors.secondary }}>{subtitle}</p>}
      <h2 className="text-3xl font-serif font-bold uppercase tracking-widest text-white" style={{ textShadow: `0 0 10px ${colors.secondary}40` }}>{title}</h2>
      <div className="w-16 h-0.5 mx-auto mt-4" style={{ backgroundColor: colors.secondary, boxShadow: `0 0 5px ${colors.secondary}` }}></div>
    </div>
  );

  const CoverSection = () => (
    <motion.section 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center bg-cover bg-center"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(0, 41, 18, 0.7), rgba(0, 75, 35, 0.9)), url(${data.hero_image || '/placeholder.jpg'})`,
        color: colors.text
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: isOpened ? 0 : 1, pointerEvents: isOpened ? 'none' : 'auto' }}
      transition={{ duration: 1.2 }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-scales.png")' }}></div>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.5, duration: 1 }}
        className="relative z-10 p-8 w-full max-w-[320px] rounded-3xl backdrop-blur-sm border border-white/20"
        style={{ background: `linear-gradient(135deg, ${colors.primary}90, ${colors.bg}90)`, boxShadow: `0 10px 30px rgba(0,0,0,0.5), inset 0 0 0 1px ${colors.secondary}40` }}
      >
        <p className="tracking-[0.2em] text-[10px] uppercase mb-6 font-bold" style={{ color: colors.secondary }}>{data.cover_subtitle || 'Walimatul Ursy'}</p>
        <h1 className="text-4xl font-serif mb-6 uppercase tracking-widest text-white font-bold" style={{ textShadow: `2px 2px 0px ${colors.primary}, -1px -1px 0px ${colors.secondary}` }}>
          {data.mempelai_pria.nama.split(' ')[0]} <br/> 
          <span className="text-xl my-2 block" style={{ color: colors.secondary }}>&</span>
          {data.mempelai_wanita.nama.split(' ')[0]}
        </h1>
        <p className="text-[10px] font-bold tracking-[0.2em] mb-10 text-white/90">{data.wedding_date || '24 Agustus 2026'}</p>
        
        <button 
          onClick={() => setIsOpened(true)}
          className="px-6 py-3 font-bold tracking-[0.2em] uppercase text-[10px] transition-all rounded-full shadow-[0_0_15px_rgba(255,215,0,0.4)] w-full"
          style={{ backgroundColor: colors.secondary, color: colors.primary }}
        >
          Buka Undangan
        </button>
      </motion.div>
    </motion.section>
  );

  if (!isOpened) return <CoverSection />;

  return (
    <div className="min-h-screen font-sans overflow-x-hidden" style={{ backgroundColor: colors.bg, color: colors.text }}>
      <div className="fixed inset-0 opacity-5 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-scales.png")' }}></div>

      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-[0_0_20px_rgba(255,215,0,0.3)]"
        style={{ backgroundColor: colors.secondary, color: colors.primary }}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
      </button>

      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-16 pb-12 rounded-b-[40px] overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img src={data.hero_image || '/placeholder.jpg'} alt="Hero" className="w-full h-full object-cover opacity-60" />
           <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${colors.bg} 0%, transparent 50%, ${colors.primary} 100%)` }}></div>
        </div>
        <div className="relative z-10 text-center w-full">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="bg-black/30 backdrop-blur-sm border border-white/20 p-8 rounded-3xl">
            <Gem size={28} className="mx-auto mb-4" style={{ color: colors.secondary }} />
            <p className="tracking-[0.3em] text-[9px] uppercase mb-4 font-bold" style={{ color: colors.secondary }}>{data.cover_title || 'Pernikahan Adat Bugis'}</p>
            <h1 className="text-4xl font-serif mb-6 uppercase tracking-widest font-bold" style={{ color: colors.secondary }}>
              {data.mempelai_pria.nama.split(' ')[0]} <br/><span className="text-xl text-white">&</span><br/> {data.mempelai_wanita.nama.split(' ')[0]}
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/90">
              {data.wedding_date || '24 Agustus 2026'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Couple Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="w-full mx-auto">
          <SectionHeading title="Mempelai" subtitle="Pasangan Berbahagia" />
          
          <div className="flex flex-col gap-10 items-center justify-center">
            {/* Pria */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full text-center p-6 rounded-3xl" style={{ background: `linear-gradient(180deg, ${colors.primary} 0%, transparent 100%)` }}>
              <div className="w-40 h-52 mx-auto mb-6 bg-cover bg-center rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-2" style={{ backgroundImage: `url(${data.mempelai_pria.foto || '/placeholder.jpg'})`, borderColor: colors.secondary }}></div>
              <h3 className="text-xl font-serif uppercase font-bold mb-2 text-white">{data.mempelai_pria.nama}</h3>
              <p className="text-[10px] uppercase tracking-widest opacity-80 mb-4 line-clamp-2" style={{ color: colors.secondary }}>
                Putra dari Bapak {data.mempelai_pria.ortu_ayah} <br/>& Ibu {data.mempelai_pria.ortu_ibu}
              </p>
              {data.mempelai_pria.instagram && (
                <a href={`https://instagram.com/${data.mempelai_pria.instagram}`} className="text-[9px] uppercase tracking-widest inline-block border-b hover:opacity-50 transition-opacity" style={{ color: colors.secondary, borderColor: colors.secondary }}>
                  @{data.mempelai_pria.instagram}
                </a>
              )}
            </motion.div>

            {/* Wanita */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full text-center p-6 rounded-3xl" style={{ background: `linear-gradient(180deg, ${colors.primary} 0%, transparent 100%)` }}>
              <div className="w-40 h-52 mx-auto mb-6 bg-cover bg-center rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-2" style={{ backgroundImage: `url(${data.mempelai_wanita.foto || '/placeholder.jpg'})`, borderColor: colors.secondary }}></div>
              <h3 className="text-xl font-serif uppercase font-bold mb-2 text-white">{data.mempelai_wanita.nama}</h3>
              <p className="text-[10px] uppercase tracking-widest opacity-80 mb-4 line-clamp-2" style={{ color: colors.secondary }}>
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
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #FFD700 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="w-full mx-auto relative z-10">
          <SectionHeading title="Acara" subtitle="Rangkaian Mappacci & Resepsi" />
          
          <div className="flex flex-col gap-6">
            {data.acara.map((event, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#002912] p-6 rounded-2xl text-center shadow-lg border border-white/10"
              >
                <h3 className="text-lg font-serif mb-6 uppercase tracking-widest font-bold" style={{ color: colors.secondary }}>{event.tipe}</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest opacity-60 mb-1">Tanggal</p>
                    <p className="font-bold text-sm text-white">{event.tanggal}</p>
                    <p className="text-[10px] mt-1 text-white/70">{event.jam}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest opacity-60 mb-1">Lokasi</p>
                    <p className="font-bold text-sm text-white">{event.lokasi}</p>
                    <p className="text-[10px] opacity-80 mt-1 text-white/70">{event.alamat_lengkap}</p>
                  </div>
                </div>

                <a 
                  href={event.link_maps} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-block px-6 py-3 font-bold uppercase tracking-widest text-[9px] rounded-full w-full"
                  style={{ backgroundColor: colors.secondary, color: colors.bg }}
                >
                  Buka Google Maps
                </a>
              </motion.div>
            ))}
          </div>

          {/* Countdown */}
          {data.countdown_date && (
            <div className="mt-16 text-center">
              <h3 className="text-[10px] uppercase tracking-widest mb-4 font-bold text-white">Menuju Hari Bahagia</h3>
              <div className="flex justify-center gap-3">
                 {['Hari', 'Jam', 'Mnt', 'Dtk'].map((unit, idx) => (
                   <div key={unit} className="flex flex-col items-center justify-center w-14 h-14 rounded-xl border border-[#FFD700] bg-black/20 backdrop-blur-sm">
                     <span className="block text-xl font-serif font-bold" style={{ color: colors.secondary }}>
                       {['05', '18', '30', '12'][idx]}
                     </span>
                     <span className="text-[7px] tracking-[0.2em] uppercase text-white/80">{unit}</span>
                   </div>
                 ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Love Story */}
      {data.love_story && data.love_story.length > 0 && (
        <section className="py-20 px-6 relative z-10 bg-[#001c0c]">
          <div className="w-full mx-auto">
            <SectionHeading title="Kisah" subtitle="Perjalanan Kami" />
            <div className="space-y-6">
              {data.love_story.map((story, idx) => (
                <div key={idx} className="bg-[#002912] p-5 rounded-2xl border border-white/10 shadow-lg">
                  <span className="inline-block px-3 py-1 text-[9px] font-bold tracking-widest uppercase mb-3 rounded-md" style={{ backgroundColor: colors.secondary, color: colors.bg }}>
                    {story.tahun}
                  </span>
                  <p className="text-[11px] leading-relaxed opacity-90 text-white/90">{story.cerita}</p>
                  {story.foto && (
                    <div className="w-full h-40 mt-4 bg-cover bg-center rounded-xl" style={{ backgroundImage: `url(${story.foto})` }}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Gallery */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="py-20 px-6 bg-[#002912]">
          <SectionHeading title="Galeri" subtitle="Kenangan" />
          <div className="w-full columns-2 gap-3 space-y-3">
            {data.gallery.map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="break-inside-avoid rounded-xl overflow-hidden shadow-lg border border-white/10"
              >
                <img src={img} alt={`Gallery ${idx}`} className="w-full h-auto" />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Gift & RSVP */}
      <section className="py-20 px-6 relative" style={{ backgroundColor: colors.primary }}>
        <div className="w-full mx-auto">
          <SectionHeading title="Buku Tamu" subtitle="Doa Restu" />
          
          <div className="flex gap-2 mb-6 bg-black/20 p-1 rounded-full">
            <button 
              className={`flex-1 py-3 text-[9px] uppercase tracking-widest font-bold transition-colors rounded-full`}
              style={activeTab === 'rsvp' ? { backgroundColor: colors.secondary, color: colors.bg } : { color: 'white' }}
              onClick={() => setActiveTab('rsvp')}
            >
              Kehadiran
            </button>
            <button 
              className={`flex-1 py-3 text-[9px] uppercase tracking-widest font-bold transition-colors rounded-full`}
              style={activeTab === 'wishes' ? { backgroundColor: colors.secondary, color: colors.bg } : { color: 'white' }}
              onClick={() => setActiveTab('wishes')}
            >
              Hadiah
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'rsvp' ? (
              <motion.div key="rsvp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-[#002912] p-6 rounded-3xl border border-[#FFD700]/30 shadow-xl">
                <form className="space-y-4">
                  <input type="text" placeholder="Nama Lengkap" className="w-full bg-[#001c0c] border border-white/10 px-4 py-3 text-xs outline-none rounded-xl text-white" />
                  <select className="w-full bg-[#001c0c] border border-white/10 px-4 py-3 text-xs outline-none rounded-xl text-white">
                    <option value="1">Hadir (1 Orang)</option>
                    <option value="2">Hadir (2 Orang)</option>
                    <option value="0">Tidak Hadir</option>
                  </select>
                  <textarea placeholder="Pesan / Doa" rows={4} className="w-full bg-[#001c0c] border border-white/10 px-4 py-3 text-xs outline-none resize-none rounded-xl text-white"></textarea>
                  <button type="button" className="w-full py-3 font-bold uppercase tracking-widest text-[10px] transition-colors rounded-xl shadow-lg mt-2" style={{ backgroundColor: colors.secondary, color: colors.bg }}>
                    Kirim Pesan
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div key="wishes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                {data.digital_envelope.map((env, idx) => (
                  <div key={idx} className="bg-[#002912] border border-[#FFD700]/30 p-6 rounded-3xl text-center shadow-xl">
                    <Gift className="mx-auto mb-3" size={24} style={{ color: colors.secondary }} />
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-1 text-white">{env.bank_name}</h4>
                    <p className="text-xl font-mono mb-1" style={{ color: colors.secondary }}>{env.account_number}</p>
                    <p className="text-[9px] uppercase tracking-widest opacity-60 mb-5 text-white">a.n {env.account_holder}</p>
                    <button className="px-5 py-2 text-[9px] uppercase tracking-widest font-bold rounded-full w-full flex items-center justify-center gap-2" style={{ backgroundColor: colors.secondary, color: colors.bg }}>
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
      <section className="py-20 px-6 bg-[#001c0c]">
        <div className="w-full text-center py-8 bg-[#002912] rounded-3xl border border-white/10 shadow-lg px-4">
          {data.dress_code && (
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-widest mb-3 font-bold" style={{ color: colors.secondary }}>Panduan Busana</p>
              <p className="text-xl font-serif uppercase tracking-wider font-bold text-white">{data.dress_code}</p>
              {data.dress_code_description && <p className="text-[10px] opacity-70 mt-2 text-white/80">{data.dress_code_description}</p>}
              
              {data.dress_code_colors && (
                <div className="flex justify-center gap-3 mt-4">
                  {data.dress_code_colors.map((color, idx) => (
                    <div key={idx} className="w-6 h-6 rounded-full border-2 border-white shadow-md" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
              )}
            </div>
          )}

          {data.additional_info_list && (
            <div className="pt-6 border-t border-white/10">
              <p className="text-[10px] uppercase tracking-widest mb-4 font-bold" style={{ color: colors.secondary }}>Informasi</p>
              <ul className="space-y-3 inline-block text-left text-[11px] opacity-80 text-white/90">
                {data.additional_info_list.map((info, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <Gem size={12} className="mt-0.5 shrink-0" style={{ color: colors.secondary }} />
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* 12. Closing */}
      <section className="py-24 px-6 text-center bg-[#002912] rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <Gem size={24} className="mx-auto mb-6" style={{ color: colors.secondary }} />
        <p className="font-serif text-[13px] leading-relaxed mb-8 opacity-90 uppercase tracking-widest font-bold text-white/80">
          "{data.closing_message || 'Terima kasih atas doa dan kehadiran Bapak/Ibu sekalian dalam acara pernikahan kami.'}"
        </p>
        <div className="w-16 h-px mx-auto mb-8" style={{ backgroundColor: colors.secondary }}></div>
        <h2 className="text-3xl font-serif uppercase tracking-widest font-bold" style={{ color: colors.secondary }}>
          {data.mempelai_pria.nama.split(' ')[0]} <br />
          <span className="text-lg lowercase italic mx-2 my-2 block text-white">&amp;</span>
          {data.mempelai_wanita.nama.split(' ')[0]}
        </h2>
        <p className="text-[8px] uppercase tracking-[0.3em] opacity-40 mt-16 text-white font-bold">Divine Nexus</p>
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
