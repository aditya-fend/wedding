"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, Heart, Play, Pause, Gift, Copy } from 'lucide-react';
import { InvitationContent } from '@/types/invitation';

export default function SundaAnggunPriangan({ data }: { data: InvitationContent }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [activeTab, setActiveTab] = useState<'rsvp' | 'wishes'>('rsvp');
  
  // Theme Colors
  const colors = {
    primary: '#4B6E4B', // Sage Green
    secondary: '#D4B872', // Soft Gold
    text: '#2C3E2C', // Dark Green Text
    bg: '#F5F7F5', // Soft Sage White
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
      className="fixed inset-0 z-50 flex flex-col items-center justify-between py-16 px-6 text-center bg-cover bg-center"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(245, 247, 245, 0.8), rgba(245, 247, 245, 0.95)), url(${data.hero_image || '/placeholder.jpg'})`,
        color: colors.text
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: isOpened ? 0 : 1, pointerEvents: isOpened ? 'none' : 'auto' }}
      transition={{ duration: 1 }}
    >
      <div className="absolute top-0 left-0 w-full h-32 bg-contain bg-repeat-x opacity-30" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/white-diamond.png")' }}></div>
      
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
        <p className="tracking-[0.2em] text-xs uppercase mb-2 font-medium" style={{ color: colors.primary }}>{data.cover_subtitle || 'Pernikahan'}</p>
        <div className="w-12 h-px mx-auto mb-6" style={{ backgroundColor: colors.secondary }}></div>
      </motion.div>

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}>
        <h1 className="text-5xl mb-4 font-serif italic" style={{ color: colors.primary }}>
          {data.mempelai_pria.nama.split(' ')[0]} <br/> 
          <span className="text-2xl not-italic font-light opacity-50">&</span> <br/> 
          {data.mempelai_wanita.nama.split(' ')[0]}
        </h1>
        <p className="text-xs font-light tracking-widest mt-6">{data.wedding_date || '24 Agustus 2026'}</p>
      </motion.div>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2 }}>
        <button 
          onClick={() => setIsOpened(true)}
          className="px-8 py-3 rounded-full text-white font-medium tracking-wider shadow-lg transition-transform hover:scale-105 uppercase text-xs"
          style={{ backgroundColor: colors.primary }}
        >
          Buka Undangan
        </button>
      </motion.div>
    </motion.section>
  );

  if (!isOpened) return <CoverSection />;

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: colors.bg, color: colors.text }}>
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/floral-texture.png")' }}></div>
      
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform text-white"
        style={{ backgroundColor: colors.primary }}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
      </button>

      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center p-6 overflow-hidden rounded-b-[3rem] bg-white shadow-sm">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img src={data.hero_image || '/placeholder.jpg'} alt="Hero" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white"></div>
        </motion.div>
        
        <div className="relative z-10 text-center mt-12">
          <p className="tracking-widest text-xs uppercase mb-4" style={{ color: colors.primary }}>{data.cover_title || 'Tasyakuran Pernikahan'}</p>
          <h1 className="text-6xl font-serif italic mb-6" style={{ color: colors.primary }}>
            {data.mempelai_pria.nama.split(' ')[0]} <br/>&<br/> {data.mempelai_wanita.nama.split(' ')[0]}
          </h1>
          <div className="w-px h-16 mx-auto mb-6" style={{ backgroundColor: colors.secondary }}></div>
          <p className="text-xs font-medium tracking-widest uppercase">
            {data.wedding_date || '24 . 08 . 2026'}
          </p>
        </div>
      </section>

      {/* 2. Couple Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="w-full mx-auto text-center">
          <h2 className="text-3xl font-serif italic mb-12" style={{ color: colors.primary }}>Sang Mempelai</h2>
          
          <div className="flex flex-col gap-12 items-center">
            {/* Pria */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center w-full">
              <div className="w-48 h-64 mx-auto mb-6 rounded-full overflow-hidden border-4 shadow-lg p-1" style={{ borderColor: colors.secondary }}>
                <div className="w-full h-full rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${data.mempelai_pria.foto || '/placeholder.jpg'})` }}></div>
              </div>
              <h3 className="text-2xl font-serif italic mb-2" style={{ color: colors.primary }}>{data.mempelai_pria.nama}</h3>
              <p className="text-xs opacity-80 leading-relaxed mb-4">
                Putra dari<br/>Bapak {data.mempelai_pria.ortu_ayah} & Ibu {data.mempelai_pria.ortu_ibu}
              </p>
              {data.mempelai_pria.instagram && (
                <a href={`https://instagram.com/${data.mempelai_pria.instagram}`} className="text-[10px] uppercase tracking-wider font-medium hover:opacity-70" style={{ color: colors.secondary }}>
                  @{data.mempelai_pria.instagram}
                </a>
              )}
            </motion.div>

            <div className="text-3xl font-serif italic opacity-30" style={{ color: colors.primary }}>&</div>

            {/* Wanita */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center w-full">
              <div className="w-48 h-64 mx-auto mb-6 rounded-full overflow-hidden border-4 shadow-lg p-1" style={{ borderColor: colors.secondary }}>
                <div className="w-full h-full rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${data.mempelai_wanita.foto || '/placeholder.jpg'})` }}></div>
              </div>
              <h3 className="text-2xl font-serif italic mb-2" style={{ color: colors.primary }}>{data.mempelai_wanita.nama}</h3>
              <p className="text-xs opacity-80 leading-relaxed mb-4">
                Putri dari<br/>Bapak {data.mempelai_wanita.ortu_ayah} & Ibu {data.mempelai_wanita.ortu_ibu}
              </p>
              {data.mempelai_wanita.instagram && (
                <a href={`https://instagram.com/${data.mempelai_wanita.instagram}`} className="text-[10px] uppercase tracking-wider font-medium hover:opacity-70" style={{ color: colors.secondary }}>
                  @{data.mempelai_wanita.instagram}
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Event & Countdown */}
      <section className="py-20 px-4 bg-white rounded-[3rem] shadow-sm relative z-10 mx-4">
        <div className="w-full mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: colors.secondary }}>Waktu & Tempat</p>
            <h2 className="text-3xl font-serif italic" style={{ color: colors.primary }}>Rangkaian Acara</h2>
          </div>
          
          <div className="flex flex-col gap-8">
            {data.acara.map((event, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl text-center relative border border-gray-100"
                style={{ backgroundColor: colors.bg }}
              >
                <h3 className="text-xl font-serif italic mb-6" style={{ color: colors.primary }}>{event.tipe}</h3>
                
                <div className="space-y-4 mb-8 text-xs opacity-90">
                  <p className="font-medium">{event.tanggal}</p>
                  <p>{event.jam}</p>
                  <div className="w-12 h-px mx-auto my-4" style={{ backgroundColor: colors.secondary }}></div>
                  <p className="font-medium text-sm">{event.lokasi}</p>
                  <p className="opacity-70">{event.alamat_lengkap}</p>
                </div>

                <a 
                  href={event.link_maps} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white text-[10px] uppercase tracking-wider font-medium hover:shadow-lg transition-shadow w-full"
                  style={{ backgroundColor: colors.primary }}
                >
                  <MapPin size={14} /> Buka Peta Lokasi
                </a>
              </motion.div>
            ))}
          </div>

          {/* Countdown */}
          {data.countdown_date && (
            <div className="mt-16 pt-12 border-t border-gray-100">
               <div className="flex justify-center gap-4">
                 {['Hari', 'Jam', 'Menit', 'Detik'].map((unit, idx) => (
                   <div key={unit} className="text-center w-16">
                     <span className="block text-3xl font-serif italic mb-1" style={{ color: colors.primary }}>
                       {['08', '12', '45', '30'][idx]}
                     </span>
                     <span className="text-[9px] tracking-widest uppercase font-medium" style={{ color: colors.secondary }}>{unit}</span>
                   </div>
                 ))}
               </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Love Story */}
      {data.love_story && data.love_story.length > 0 && (
        <section className="py-20 px-6">
          <div className="w-full mx-auto text-center">
            <h2 className="text-3xl font-serif italic mb-12" style={{ color: colors.primary }}>Cerita Kita</h2>
            
            <div className="space-y-12">
              {data.love_story.map((story, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-white mb-4 font-serif italic text-sm shadow-md z-10 relative" style={{ backgroundColor: colors.primary }}>
                    {story.tahun.slice(-2)}'
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50">
                    <p className="text-xs leading-relaxed opacity-80">{story.cerita}</p>
                    {story.foto && <img src={story.foto} alt="Story" className="mt-4 w-full h-40 object-cover rounded-2xl" />}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Gallery */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="py-20 px-6 bg-white">
          <h2 className="text-3xl font-serif italic text-center mb-12" style={{ color: colors.primary }}>Potret Kasih</h2>
          <div className="w-full mx-auto columns-2 gap-4">
            {data.gallery.map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-2xl mb-4 break-inside-avoid"
              >
                <img src={img} alt={`Gallery ${idx}`} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Gift & RSVP */}
      <section className="py-20 px-4">
        <div className="w-full mx-auto">
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
            <div className="flex gap-2 mb-8">
              <button 
                className={`flex-1 py-3 rounded-2xl text-[10px] uppercase tracking-wider font-medium transition-colors ${activeTab === 'rsvp' ? 'text-white' : 'bg-gray-50'}`}
                style={{ backgroundColor: activeTab === 'rsvp' ? colors.primary : '' }}
                onClick={() => setActiveTab('rsvp')}
              >
                Kehadiran
              </button>
              <button 
                className={`flex-1 py-3 rounded-2xl text-[10px] uppercase tracking-wider font-medium transition-colors ${activeTab === 'wishes' ? 'text-white' : 'bg-gray-50'}`}
                style={{ backgroundColor: activeTab === 'wishes' ? colors.primary : '' }}
                onClick={() => setActiveTab('wishes')}
              >
                Tanda Kasih
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'rsvp' ? (
                <motion.div key="rsvp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <form className="space-y-4">
                    <input type="text" placeholder="Nama Lengkap" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 outline-none text-xs" />
                    <select className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 outline-none text-xs text-gray-700">
                      <option>Hadir - 1 Orang</option>
                      <option>Hadir - 2 Orang</option>
                      <option>Maaf, Tidak Bisa Hadir</option>
                    </select>
                    <textarea placeholder="Tuliskan doa & harapan..." rows={4} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 outline-none resize-none text-xs"></textarea>
                    <button type="button" className="w-full text-white py-3 rounded-xl text-xs font-medium tracking-wide shadow-md hover:shadow-lg transition-shadow" style={{ backgroundColor: colors.primary }}>
                      Kirim Pesan
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div key="wishes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  {data.digital_envelope.map((env, idx) => (
                    <div key={idx} className="bg-gray-50 p-6 rounded-2xl text-center">
                      <Gift size={24} className="mx-auto mb-3" style={{ color: colors.secondary }} />
                      <h4 className="text-sm font-medium mb-1">{env.bank_name}</h4>
                      <p className="text-xl font-mono mb-1" style={{ color: colors.primary }}>{env.account_number}</p>
                      <p className="text-[10px] opacity-70 mb-4 uppercase">a.n {env.account_holder}</p>
                      <button className="px-5 py-2 bg-white rounded-full text-[10px] font-medium shadow-sm flex items-center justify-center gap-2 mx-auto hover:bg-gray-100 transition-colors" style={{ color: colors.primary }}>
                        <Copy size={14} /> Salin Nomor
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 10. Dress Code & Info */}
      {(data.dress_code || (data.additional_info_list && data.additional_info_list.length > 0)) && (
        <section className="py-20 px-6 bg-white text-center">
          <div className="w-full mx-auto">
            {data.dress_code && (
              <div className="mb-12">
                <h3 className="text-xs uppercase tracking-widest mb-4" style={{ color: colors.secondary }}>Busana</h3>
                <p className="text-xl font-serif italic mb-2" style={{ color: colors.primary }}>{data.dress_code}</p>
                {data.dress_code_description && <p className="text-xs opacity-70">{data.dress_code_description}</p>}
                
                {data.dress_code_colors && (
                  <div className="flex justify-center gap-3 mt-4">
                    {data.dress_code_colors.map((color, idx) => (
                      <div key={idx} className="w-8 h-8 rounded-full shadow-md border-2 border-white" style={{ backgroundColor: color }}></div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {data.additional_info_list && (
              <div>
                <h3 className="text-xs uppercase tracking-widest mb-4" style={{ color: colors.secondary }}>Catatan</h3>
                <ul className="space-y-3 inline-block text-left text-xs opacity-80">
                  {data.additional_info_list.map((info, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <div className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: colors.primary }}></div>
                      {info}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 12. Closing */}
      <section className="py-24 px-6 text-center bg-white rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.02)] mt-8 relative z-10">
        <div className="w-full mx-auto">
          <div className="w-8 h-px mx-auto mb-8" style={{ backgroundColor: colors.secondary }}></div>
          <p className="font-serif italic text-lg leading-relaxed mb-8 opacity-90" style={{ color: colors.primary }}>
            "{data.closing_message || 'Terima kasih atas doa dan restu yang telah diberikan. Semoga kasih sayang selalu menyertai langkah kita semua.'}"
          </p>
          <h2 className="text-4xl font-serif italic mb-2" style={{ color: colors.primary }}>
            {data.mempelai_pria.nama.split(' ')[0]} & {data.mempelai_wanita.nama.split(' ')[0]}
          </h2>
          <p className="text-[9px] uppercase tracking-widest opacity-40 mt-12">Divine Nexus Signature</p>
        </div>
      </section>
    </div>
  );
}
