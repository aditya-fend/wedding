"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, Heart, Play, Pause, Gift, CreditCard } from 'lucide-react';
import { InvitationContent } from '@/types/invitation';

export default function MinangMaharaja({ data }: { data: InvitationContent }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [activeTab, setActiveTab] = useState<'rsvp' | 'wishes'>('rsvp');
  
  // Theme Colors
  const colors = {
    primary: '#8B0000', // Maroon Red
    secondary: '#D4AF37', // Gold
    accent: '#B8860B', // Dark Goldenrod
    text: '#FDF5E6', // Old Lace
    bg: '#0A0A0A', // Almost Black
    cardBg: '#1A0B0B' // Very dark red
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
    <div className="text-center mb-12 relative">
      {subtitle && <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: colors.secondary }}>{subtitle}</p>}
      <h2 className="text-3xl font-serif" style={{ color: colors.secondary }}>{title}</h2>
      <div className="flex justify-center items-center mt-4 gap-2">
        <div className="w-8 h-px" style={{ backgroundColor: colors.secondary }}></div>
        <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: colors.secondary }}></div>
        <div className="w-8 h-px" style={{ backgroundColor: colors.secondary }}></div>
      </div>
    </div>
  );

  const CoverSection = () => (
    <motion.section 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center bg-cover bg-center"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 10, 0.6), rgba(10, 10, 10, 0.9)), url(${data.hero_image || '/placeholder.jpg'})`,
        color: colors.text
      }}
      initial={{ y: 0 }}
      animate={{ y: isOpened ? '-100vh' : 0 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabesque.png")' }}></div>
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ delay: 0.5, duration: 1 }}
        className="relative z-10 border-4 p-8 w-full bg-black/40 backdrop-blur-sm flex flex-col items-center"
        style={{ borderColor: colors.secondary }}
      >
        <div className="absolute -top-3 -left-3 w-6 h-6 border-t-4 border-l-4" style={{ borderColor: colors.secondary }}></div>
        <div className="absolute -top-3 -right-3 w-6 h-6 border-t-4 border-r-4" style={{ borderColor: colors.secondary }}></div>
        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-4 border-l-4" style={{ borderColor: colors.secondary }}></div>
        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-4 border-r-4" style={{ borderColor: colors.secondary }}></div>

        <p className="tracking-[0.2em] text-[10px] uppercase mb-4 font-bold" style={{ color: colors.secondary }}>{data.cover_subtitle || 'Baralek Gadang'}</p>
        <h1 className="text-4xl font-serif mb-4 uppercase tracking-wider" style={{ color: colors.secondary, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          {data.mempelai_pria.nama.split(' ')[0]} <br/> 
          <span className="text-xl lowercase italic block my-2">&amp;</span>
          {data.mempelai_wanita.nama.split(' ')[0]}
        </h1>
        <p className="text-[10px] font-light tracking-[0.2em] mb-10">{data.wedding_date || '24 Agustus 2026'}</p>
        
        <button 
          onClick={() => setIsOpened(true)}
          className="px-6 py-3 font-bold tracking-[0.2em] uppercase text-[10px] transition-all hover:bg-transparent border-2"
          style={{ backgroundColor: colors.secondary, color: colors.bg, borderColor: colors.secondary }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = colors.secondary; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = colors.secondary; e.currentTarget.style.color = colors.bg; }}
        >
          Buka Undangan
        </button>
      </motion.div>
    </motion.section>
  );

  if (!isOpened) return <CoverSection />;

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: colors.bg, color: colors.text }}>
      <div className="fixed inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabesque.png")' }}></div>
      
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-none flex items-center justify-center border-2 shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-transform hover:scale-110"
        style={{ backgroundColor: colors.bg, borderColor: colors.secondary, color: colors.secondary }}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
      </button>

      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-12 px-6">
        <div className="absolute inset-0 z-0 border-[12px]" style={{ borderColor: colors.primary }}>
           <img src={data.hero_image || '/placeholder.jpg'} alt="Hero" className="w-full h-full object-cover opacity-50 grayscale mix-blend-luminosity" />
           <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
        </div>
        <div className="relative z-10 text-center w-full border-y border-dashed py-12" style={{ borderColor: colors.secondary }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}>
            <p className="tracking-[0.3em] text-[10px] uppercase mb-4 font-bold" style={{ color: colors.secondary }}>{data.cover_title || 'Pesta Pernikahan'}</p>
            <h1 className="text-5xl font-serif mb-6 uppercase tracking-widest drop-shadow-2xl" style={{ color: colors.secondary }}>
              {data.mempelai_pria.nama.split(' ')[0]} <br/>&<br/> {data.mempelai_wanita.nama.split(' ')[0]}
            </h1>
            <p className="text-[10px] font-light tracking-widest leading-relaxed max-w-full mx-auto" style={{ color: colors.secondary }}>
              "Barek samo dipikua, ringan samo dijinjiang."
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Couple Section */}
      <section className="py-20 px-4 relative z-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
        <div className="w-full mx-auto">
          <SectionHeading title="Mempelai" subtitle="Urang Sumando & Anak Daro" />
          
          <div className="flex flex-col gap-12 items-center justify-center">
            {/* Pria */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full text-center bg-black/50 p-6 border" style={{ borderColor: colors.accent }}>
              <div className="w-40 h-56 mx-auto mb-6 bg-cover bg-center border-4" style={{ backgroundImage: `url(${data.mempelai_pria.foto || '/placeholder.jpg'})`, borderColor: colors.secondary }}></div>
              <h3 className="text-xl font-serif uppercase tracking-wider mb-2" style={{ color: colors.secondary }}>{data.mempelai_pria.nama}</h3>
              <p className="text-[10px] uppercase tracking-widest opacity-80 mb-4 line-clamp-2">
                Putra Bapak {data.mempelai_pria.ortu_ayah} <br/>& Ibu {data.mempelai_pria.ortu_ibu}
              </p>
              {data.mempelai_pria.instagram && (
                <a href={`https://instagram.com/${data.mempelai_pria.instagram}`} className="text-[9px] uppercase tracking-widest inline-block border-b hover:opacity-50 transition-opacity" style={{ color: colors.secondary, borderColor: colors.secondary }}>
                  @{data.mempelai_pria.instagram}
                </a>
              )}
            </motion.div>

            {/* Wanita */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full text-center bg-black/50 p-6 border" style={{ borderColor: colors.accent }}>
              <div className="w-40 h-56 mx-auto mb-6 bg-cover bg-center border-4" style={{ backgroundImage: `url(${data.mempelai_wanita.foto || '/placeholder.jpg'})`, borderColor: colors.secondary }}></div>
              <h3 className="text-xl font-serif uppercase tracking-wider mb-2" style={{ color: colors.secondary }}>{data.mempelai_wanita.nama}</h3>
              <p className="text-[10px] uppercase tracking-widest opacity-80 mb-4 line-clamp-2">
                Putri Bapak {data.mempelai_wanita.ortu_ayah} <br/>& Ibu {data.mempelai_wanita.ortu_ibu}
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
      <section className="py-20 px-4 relative z-10" style={{ backgroundColor: colors.cardBg }}>
        <div className="absolute top-0 left-0 w-full h-2 bg-repeat-x" style={{ backgroundImage: `linear-gradient(90deg, ${colors.secondary} 50%, transparent 50%)`, backgroundSize: '20px 2px' }}></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-repeat-x" style={{ backgroundImage: `linear-gradient(90deg, ${colors.secondary} 50%, transparent 50%)`, backgroundSize: '20px 2px' }}></div>
        
        <div className="w-full mx-auto">
          <SectionHeading title="Acara" subtitle="Rangkaian Baralek" />
          
          <div className="flex flex-col gap-8">
            {data.acara.map((event, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-black/60 p-6 border-2 relative"
                style={{ borderColor: colors.secondary }}
              >
                <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2" style={{ borderColor: colors.secondary }}></div>
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2" style={{ borderColor: colors.secondary }}></div>

                <h3 className="text-2xl font-serif mb-6 uppercase tracking-widest" style={{ color: colors.secondary }}>{event.tipe}</h3>
                
                <div className="space-y-4 mb-6 relative z-10">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Tanggal & Waktu</p>
                    <p className="font-bold text-sm">{event.tanggal}</p>
                    <p className="text-[10px] font-mono mt-1" style={{ color: colors.secondary }}>{event.jam}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Lokasi</p>
                    <p className="font-bold text-sm">{event.lokasi}</p>
                    <p className="text-[10px] opacity-80 mt-1">{event.alamat_lengkap}</p>
                  </div>
                </div>

                <a 
                  href={event.link_maps} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-block px-4 py-3 border font-bold uppercase tracking-widest text-[10px] transition-colors hover:bg-white hover:text-black relative z-10 w-full text-center"
                  style={{ borderColor: colors.secondary, color: colors.secondary }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.secondary; e.currentTarget.style.color = colors.bg; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = colors.secondary; }}
                >
                  Peta Lokasi
                </a>
              </motion.div>
            ))}
          </div>

          {/* Countdown */}
          {data.countdown_date && (
            <div className="mt-16 text-center">
              <h3 className="text-lg font-serif uppercase tracking-widest mb-6" style={{ color: colors.secondary }}>Menanti Hari Bahagia</h3>
              <div className="flex justify-center gap-2">
                 {['Hari', 'Jam', 'Mnt', 'Dtk'].map((unit, idx) => (
                   <div key={unit} className="bg-black/60 border border-dashed p-3 w-[4.5rem]" style={{ borderColor: colors.secondary }}>
                     <span className="block text-2xl font-serif mb-1" style={{ color: colors.secondary }}>
                       {['05', '18', '30', '12'][idx]}
                     </span>
                     <span className="text-[8px] tracking-[0.2em] uppercase opacity-70">{unit}</span>
                   </div>
                 ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Love Story */}
      {data.love_story && data.love_story.length > 0 && (
        <section className="py-20 px-4 relative z-10 bg-black">
          <div className="w-full mx-auto">
            <SectionHeading title="Kisah" subtitle="Jejak Langkah" />
            <div className="space-y-6">
              {data.love_story.map((story, idx) => (
                <div key={idx} className="flex flex-col gap-4 bg-[#1A0B0B] border p-5" style={{ borderColor: colors.secondary }}>
                  {story.foto && (
                    <div className="w-full h-40 bg-cover bg-center border-2 shrink-0" style={{ backgroundImage: `url(${story.foto})`, borderColor: colors.secondary }}></div>
                  )}
                  <div className="flex-1 flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest uppercase mb-3 self-start bg-black text-white border" style={{ borderColor: colors.secondary, color: colors.secondary }}>
                      {story.tahun}
                    </span>
                    <p className="text-xs leading-loose opacity-90">{story.cerita}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Gallery */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="py-20 px-4 bg-[#0A0A0A]">
          <SectionHeading title="Galeri" subtitle="Momen Indah" />
          <div className="w-full mx-auto columns-2 gap-4 space-y-4">
            {data.gallery.map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="break-inside-avoid relative group"
              >
                <div className="absolute -inset-1 border border-dashed opacity-0 group-hover:opacity-100 transition-opacity z-0" style={{ borderColor: colors.secondary }}></div>
                <img src={img} alt={`Gallery ${idx}`} className="w-full h-auto border relative z-10 filter grayscale hover:grayscale-0 transition-all duration-500" style={{ borderColor: colors.secondary }} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Gift & RSVP */}
      <section className="py-20 px-4 relative bg-[#1A0B0B]">
        <div className="w-full mx-auto">
          <SectionHeading title="Kehadiran" subtitle="Buku Tamu" />
          
          <div className="flex flex-col gap-8">
            {/* RSVP */}
            <div className="bg-black/50 border p-6" style={{ borderColor: colors.secondary }}>
              <h3 className="text-lg font-serif uppercase tracking-widest mb-4 text-center" style={{ color: colors.secondary }}>Konfirmasi</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Nama Anda" className="w-full bg-transparent border-b px-0 py-2 text-xs outline-none placeholder-white/30" style={{ borderColor: colors.secondary }} />
                <select className="w-full bg-transparent border-b px-0 py-2 text-xs outline-none opacity-80" style={{ borderColor: colors.secondary }}>
                  <option value="1">Hadir (1 Orang)</option>
                  <option value="2">Hadir (2 Orang)</option>
                  <option value="0">Tidak Hadir</option>
                </select>
                <textarea placeholder="Pesan untuk mempelai" rows={3} className="w-full bg-transparent border-b px-0 py-2 text-xs outline-none resize-none placeholder-white/30" style={{ borderColor: colors.secondary }}></textarea>
                <button type="button" className="w-full py-3 font-bold uppercase tracking-[0.2em] text-[10px] transition-colors mt-2" style={{ backgroundColor: colors.secondary, color: colors.bg }}>
                  Kirim Pesan
                </button>
              </form>
            </div>

            {/* Gift */}
            <div className="bg-black/50 border p-6 flex flex-col justify-center" style={{ borderColor: colors.secondary }}>
              <h3 className="text-lg font-serif uppercase tracking-widest mb-6 text-center" style={{ color: colors.secondary }}>Tanda Kasih</h3>
              <div className="space-y-4">
                {data.digital_envelope.map((env, idx) => (
                  <div key={idx} className="border border-dashed p-4 text-center relative" style={{ borderColor: colors.secondary }}>
                    <CreditCard className="mx-auto mb-3 opacity-50" size={20} style={{ color: colors.secondary }} />
                    <h4 className="text-sm font-bold tracking-widest uppercase mb-1">{env.bank_name}</h4>
                    <p className="text-lg font-mono mb-1" style={{ color: colors.secondary }}>{env.account_number}</p>
                    <p className="text-[10px] uppercase tracking-widest opacity-60 mb-4">a.n {env.account_holder}</p>
                    <button className="px-4 py-2 border text-[9px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-colors" style={{ borderColor: colors.secondary, color: colors.secondary }}>
                      Salin Rekening
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Dress Code & Info */}
      <section className="py-20 px-4 bg-[#0A0A0A]">
        <div className="w-full mx-auto text-center border-y-2 py-12" style={{ borderColor: colors.secondary }}>
          {data.dress_code && (
            <div className="mb-10">
              <p className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: colors.secondary }}>Panduan Busana</p>
              <p className="text-2xl font-serif uppercase tracking-wider">{data.dress_code}</p>
              {data.dress_code_description && <p className="text-xs opacity-70 mt-3 w-full mx-auto">{data.dress_code_description}</p>}
              
              {data.dress_code_colors && (
                <div className="flex justify-center gap-4 mt-6">
                  {data.dress_code_colors.map((color, idx) => (
                    <div key={idx} className="w-8 h-8 border-2 rotate-45 flex items-center justify-center" style={{ borderColor: colors.secondary }}>
                      <div className="w-6 h-6" style={{ backgroundColor: color }}></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {data.additional_info_list && (
            <div className="mt-8 pt-8 border-t border-dashed" style={{ borderColor: colors.secondary }}>
              <p className="text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: colors.secondary }}>Informasi</p>
              <ul className="space-y-3 inline-block text-left text-xs">
                {data.additional_info_list.map((info, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rotate-45 mt-1 shrink-0" style={{ backgroundColor: colors.secondary }}></div>
                    <span className="opacity-90">{info}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* 12. Closing */}
      <section className="py-24 px-4 text-center bg-[#1A0B0B] relative">
        <div className="absolute inset-0 border-[12px] pointer-events-none" style={{ borderColor: colors.primary }}></div>
        <div className="w-full mx-auto relative z-10">
          <p className="font-serif text-lg leading-relaxed mb-10 uppercase tracking-widest" style={{ color: colors.secondary }}>
            "{data.closing_message || 'Atas kehadiran dan doa restu Bapak/Ibu/Saudara/i, kami ucapkan terima kasih.'}"
          </p>
          <div className="flex justify-center items-center mb-10 gap-2">
            <div className="w-12 h-px" style={{ backgroundColor: colors.secondary }}></div>
            <div className="w-2 h-2 rotate-45" style={{ backgroundColor: colors.secondary }}></div>
            <div className="w-12 h-px" style={{ backgroundColor: colors.secondary }}></div>
          </div>
          <h2 className="text-4xl font-serif uppercase tracking-widest drop-shadow-lg" style={{ color: colors.secondary }}>
            {data.mempelai_pria.nama.split(' ')[0]} <br />
            <span className="text-xl lowercase italic mx-4 block my-2">&amp;</span>
            {data.mempelai_wanita.nama.split(' ')[0]}
          </h2>
          <p className="text-[9px] uppercase tracking-[0.3em] opacity-50 mt-12">Divine Nexus</p>
        </div>
      </section>
    </div>
  );
}
