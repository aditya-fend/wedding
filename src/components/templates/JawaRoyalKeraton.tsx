"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, Heart, Music, Pause, Play, Gift, Check, ExternalLink } from 'lucide-react';
import { InvitationContent } from '@/types/invitation';

export default function JawaRoyalKeraton({ data }: { data: InvitationContent }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [activeTab, setActiveTab] = useState<'rsvp' | 'wishes'>('rsvp');
  
  // Theme Colors
  const colors = {
    primary: '#3B2F2F', // Dark brown
    secondary: '#D4AF37', // Gold
    accent: '#8B0000', // Deep red
    text: '#FDF5E6', // Old lace
    bg: '#1A1412' // Very dark brown for depth
  };

  useEffect(() => {
    if (isOpened && data.music_url) {
      const audio = new Audio(data.music_url);
      audio.loop = true;
      if (isPlaying) {
        audio.play().catch(e => console.log('Audio play failed:', e));
      }
      return () => audio.pause();
    }
  }, [isOpened, isPlaying, data.music_url]);

  const CoverSection = () => (
    <motion.section 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-8 text-center bg-cover bg-center"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(26, 20, 18, 0.7), rgba(26, 20, 18, 0.9)), url(${data.hero_image || '/placeholder.jpg'})`,
        color: colors.text
      }}
      initial={{ y: 0 }}
      animate={{ y: isOpened ? '-100vh' : 0 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/batik-kontemporer.png")' }}></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="relative z-10 border border-[#D4AF37] p-8 rounded-t-full rounded-b-md max-w-sm w-full bg-[#1A1412]/60 backdrop-blur-sm"
      >
        <p className="text-[#D4AF37] tracking-[0.3em] text-sm uppercase mb-6 font-serif">{data.cover_subtitle || 'The Wedding Of'}</p>
        <h1 className="text-5xl font-serif mb-4 text-[#D4AF37]" style={{ fontFamily: '"Playfair Display", serif' }}>
          {data.mempelai_pria.nama.split(' ')[0]} <br/> 
          <span className="text-3xl italic font-light">&amp;</span> <br/> 
          {data.mempelai_wanita.nama.split(' ')[0]}
        </h1>
        <p className="text-sm font-light tracking-widest mb-12 opacity-80">{data.wedding_date || 'Sabtu, 24 Agustus 2026'}</p>
        
        <button 
          onClick={() => setIsOpened(true)}
          className="px-8 py-3 bg-[#D4AF37] text-[#1A1412] font-semibold tracking-wider hover:bg-[#FDF5E6] transition-colors rounded-sm uppercase text-xs"
        >
          Buka Undangan
        </button>
      </motion.div>
    </motion.section>
  );

  const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
    <div className="text-center mb-16 relative">
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-32 h-32 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/batik-kontemporer.png")' }}></div>
      {subtitle && <p className="text-[#D4AF37] tracking-[0.2em] text-xs uppercase mb-3">{subtitle}</p>}
      <h2 className="text-4xl font-serif text-[#FDF5E6] relative z-10" style={{ fontFamily: '"Playfair Display", serif' }}>{title}</h2>
      <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-6"></div>
    </div>
  );

  if (!isOpened) return <CoverSection />;

  return (
    <div className="min-h-screen font-sans selection:bg-[#D4AF37] selection:text-[#1A1412]" style={{ backgroundColor: colors.bg, color: colors.text }}>
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/batik-kontemporer.png")' }}></div>
      
      {/* Floating Music Toggle */}
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-[#D4AF37] text-[#1A1412] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
      </button>

      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20 px-4">
        <div className="absolute inset-0 z-0">
           <img src={data.hero_image || '/placeholder.jpg'} alt="Hero" className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412] via-transparent to-[#1A1412]"></div>
        </div>
        <div className="relative z-10 text-center w-full mx-auto border-y border-[#D4AF37] py-16 px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }}>
            <p className="text-[#D4AF37] tracking-[0.3em] text-sm uppercase mb-4">{data.cover_title || 'Pernikahan Keraton'}</p>
            <h1 className="text-6xl font-serif mb-6 text-[#FDF5E6] drop-shadow-lg" style={{ fontFamily: '"Playfair Display", serif' }}>
              {data.mempelai_pria.nama.split(' ')[0]} & {data.mempelai_wanita.nama.split(' ')[0]}
            </h1>
            <p className="text-sm font-light tracking-widest max-w-full mx-auto leading-relaxed text-[#D4AF37]">
              "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri..."
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Couple Section */}
      <section className="py-24 px-4 relative z-10 bg-[#2A2121]">
        <div className="w-full mx-auto">
          <SectionHeading title="Mempelai" subtitle="Sang Raja & Ratu Sehari" />
          
          <div className="flex flex-col gap-16 items-center">
            {/* Pria */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <div className="w-48 h-64 mx-auto mb-6 p-2 border border-[#D4AF37] rounded-tl-3xl rounded-br-3xl">
                <div className="w-full h-full bg-cover bg-center rounded-tl-2xl rounded-br-2xl" style={{ backgroundImage: `url(${data.mempelai_pria.foto || '/placeholder.jpg'})` }}></div>
              </div>
              <h3 className="text-3xl font-serif text-[#D4AF37] mb-2">{data.mempelai_pria.nama}</h3>
              <p className="text-sm opacity-70 mb-4">Putra dari<br/>Bapak {data.mempelai_pria.ortu_ayah} & Ibu {data.mempelai_pria.ortu_ibu}</p>
              {data.mempelai_pria.instagram && (
                <a href={`https://instagram.com/${data.mempelai_pria.instagram}`} className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#D4AF37] hover:text-[#FDF5E6] transition-colors">
                  <ExternalLink size={14} /> @{data.mempelai_pria.instagram}
                </a>
              )}
            </motion.div>

            {/* Wanita */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <div className="w-48 h-64 mx-auto mb-6 p-2 border border-[#D4AF37] rounded-tr-3xl rounded-bl-3xl">
                <div className="w-full h-full bg-cover bg-center rounded-tr-2xl rounded-bl-2xl" style={{ backgroundImage: `url(${data.mempelai_wanita.foto || '/placeholder.jpg'})` }}></div>
              </div>
              <h3 className="text-3xl font-serif text-[#D4AF37] mb-2">{data.mempelai_wanita.nama}</h3>
              <p className="text-sm opacity-70 mb-4">Putri dari<br/>Bapak {data.mempelai_wanita.ortu_ayah} & Ibu {data.mempelai_wanita.ortu_ibu}</p>
              {data.mempelai_wanita.instagram && (
                <a href={`https://instagram.com/${data.mempelai_wanita.instagram}`} className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#D4AF37] hover:text-[#FDF5E6] transition-colors">
                  <ExternalLink size={14} /> @{data.mempelai_wanita.instagram}
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Event Detail & 4. Countdown */}
      <section className="py-24 px-4 relative z-10" style={{ backgroundColor: colors.bg }}>
        <div className="w-full mx-auto">
          <SectionHeading title="Rangkaian Acara" subtitle="Waktu & Tempat" />
          
          <div className="flex flex-col gap-8">
            {data.acara.map((event, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="border border-[#D4AF37]/30 p-6 relative overflow-hidden group bg-[#2A2121]/50 backdrop-blur-sm"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Calendar size={64} color="#D4AF37" />
                </div>
                <h3 className="text-2xl font-serif text-[#D4AF37] mb-6">{event.tipe}</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4">
                    <Calendar className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-[#FDF5E6] text-sm">{event.tanggal}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" />
                    <div>
                      <p className="text-[#FDF5E6] text-sm">{event.jam}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-[#FDF5E6] text-sm">{event.lokasi}</p>
                      <p className="text-xs opacity-70 mt-1">{event.alamat_lengkap}</p>
                    </div>
                  </div>
                </div>

                <a 
                  href={event.link_maps} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-block w-full text-center py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A1412] transition-colors text-xs uppercase tracking-wider font-semibold"
                >
                  Lihat Lokasi
                </a>
              </motion.div>
            ))}
          </div>

          {/* Countdown inside Event Section for Better Context */}
          {data.countdown_date && (
            <div className="mt-20 border-t border-[#D4AF37]/20 pt-16">
               <div className="text-center">
                  <p className="text-[#D4AF37] tracking-[0.2em] text-xs uppercase mb-6">Menuju Hari Bahagia</p>
                  <div className="flex justify-center gap-4">
                     {['Hari', 'Jam', 'Mnt', 'Dtk'].map((unit, idx) => (
                       <div key={unit} className="text-center">
                          <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] flex items-center justify-center mb-3">
                             <span className="text-2xl font-serif text-[#FDF5E6]">{['12', '05', '24', '45'][idx]}</span>
                          </div>
                          <span className="text-[10px] tracking-wider uppercase text-[#D4AF37]">{unit}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Love Story */}
      {data.love_story && data.love_story.length > 0 && (
        <section className="py-24 px-4 bg-[#2A2121]">
          <div className="w-full mx-auto">
            <SectionHeading title="Kisah Kasih" subtitle="Perjalanan Kami" />
            
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#D4AF37] before:to-transparent">
              {data.love_story.map((story, idx) => (
                <div key={idx} className="relative flex items-center justify-normal">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#2A2121] bg-[#D4AF37] absolute left-0 shrink-0 z-10 text-[#1A1412]">
                    <Heart size={16} fill="currentColor" />
                  </div>
                  <div className="w-full pl-12 text-left">
                    <div className="bg-[#1A1412] p-6 border border-[#D4AF37]/20 relative">
                      <span className="inline-block px-3 py-1 bg-[#D4AF37] text-[#1A1412] text-xs font-bold mb-3">{story.tahun}</span>
                      <p className="text-sm leading-relaxed opacity-80">{story.cerita}</p>
                      {story.foto && <img src={story.foto} alt="Story" className="mt-4 w-full h-32 object-cover border border-[#D4AF37]/30" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Gallery */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="py-24 px-4 bg-[#1A1412]">
          <SectionHeading title="Galeri" subtitle="Momen Indah" />
          <div className="w-full mx-auto columns-2 gap-4 space-y-4">
            {data.gallery.map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="break-inside-avoid overflow-hidden border border-[#D4AF37]/20 relative group"
              >
                <div className="absolute inset-0 bg-[#D4AF37]/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                <img src={img} alt={`Gallery ${idx}`} className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Gift (Digital Envelope) & RSVP */}
      <section className="py-24 px-4 bg-[#2A2121]">
        <div className="w-full mx-auto">
          <SectionHeading title="Buku Tamu" subtitle="Kehadiran & Doa" />
          
          <div className="flex border-b border-[#D4AF37]/30 mb-8">
            <button 
              className={`flex-1 py-4 text-center font-serif text-sm transition-colors ${activeTab === 'rsvp' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-[#FDF5E6] opacity-50'}`}
              onClick={() => setActiveTab('rsvp')}
            >
              Konfirmasi Kehadiran
            </button>
            <button 
              className={`flex-1 py-4 text-center font-serif text-sm transition-colors ${activeTab === 'wishes' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-[#FDF5E6] opacity-50'}`}
              onClick={() => setActiveTab('wishes')}
            >
              Kirim Tanda Kasih
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'rsvp' ? (
              <motion.div key="rsvp" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-[#1A1412] p-6 border border-[#D4AF37]/30">
                <form className="space-y-6">
                  <div>
                    <label className="block text-xs text-[#D4AF37] mb-2 uppercase tracking-wider">Nama Lengkap</label>
                    <input type="text" className="w-full bg-transparent border-b border-[#D4AF37]/50 focus:border-[#D4AF37] px-0 py-2 text-[#FDF5E6] outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-[#D4AF37] mb-2 uppercase tracking-wider">Jumlah Kehadiran</label>
                    <select className="w-full bg-[#1A1412] border-b border-[#D4AF37]/50 focus:border-[#D4AF37] px-0 py-2 text-[#FDF5E6] outline-none text-sm">
                      <option>1 Orang</option>
                      <option>2 Orang</option>
                      <option>Tidak Hadir</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-[#D4AF37] mb-2 uppercase tracking-wider">Pesan / Doa</label>
                    <textarea rows={4} className="w-full bg-transparent border-b border-[#D4AF37]/50 focus:border-[#D4AF37] px-0 py-2 text-[#FDF5E6] outline-none resize-none text-sm"></textarea>
                  </div>
                  <button type="button" className="w-full bg-[#D4AF37] text-[#1A1412] py-4 font-bold uppercase tracking-widest hover:bg-[#FDF5E6] transition-colors text-xs">
                    Kirim Konfirmasi
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div key="wishes" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                {data.digital_envelope.map((env, idx) => (
                  <div key={idx} className="bg-[#1A1412] p-6 border border-[#D4AF37]/30 text-center relative overflow-hidden">
                    <div className="absolute -right-6 -top-6 opacity-10">
                      <Gift size={80} />
                    </div>
                    <h4 className="text-xl font-serif text-[#D4AF37] mb-2">{env.bank_name}</h4>
                    <p className="text-2xl font-mono tracking-wider mb-2 text-[#FDF5E6]">{env.account_number}</p>
                    <p className="text-xs opacity-70 mb-6 uppercase tracking-widest">a.n {env.account_holder}</p>
                    <button className="px-6 py-2 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A1412] transition-colors text-[10px] uppercase tracking-wider flex items-center gap-2 mx-auto">
                      <Check size={14} /> Salin Nomor Rekening
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 10. Dress Code & 11. Additional Info */}
      <section className="py-24 px-4 bg-[#1A1412]">
        <div className="w-full mx-auto text-center border border-[#D4AF37] p-8 relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/batik-kontemporer.png")' }}></div>
          <h3 className="text-2xl font-serif text-[#D4AF37] mb-6">Informasi Tambahan</h3>
          
          {data.dress_code && (
            <div className="mb-12">
              <p className="text-xs uppercase tracking-widest text-[#D4AF37] mb-4">Dress Code</p>
              <p className="text-lg font-serif">{data.dress_code}</p>
              {data.dress_code_description && <p className="text-xs opacity-70 mt-2 w-full mx-auto">{data.dress_code_description}</p>}
              
              {data.dress_code_colors && data.dress_code_colors.length > 0 && (
                <div className="flex justify-center gap-4 mt-6">
                  {data.dress_code_colors.map((color, idx) => (
                    <div key={idx} className="w-10 h-10 rounded-full border-2 border-[#D4AF37]/50 shadow-inner" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
              )}
            </div>
          )}

          {data.additional_info_list && data.additional_info_list.length > 0 && (
            <div className="border-t border-[#D4AF37]/20 pt-12">
              <ul className="space-y-4 text-left w-full mx-auto text-sm">
                {data.additional_info_list.map((info, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 shrink-0"></span>
                    <span className="opacity-90">{info}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* 12. Closing */}
      <section className="py-32 px-4 bg-gradient-to-b from-[#1A1412] to-[#0A0807] text-center">
        <div className="w-full mx-auto">
          <p className="font-serif text-xl leading-relaxed text-[#D4AF37] mb-12">
            "{data.closing_message || 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.'}"
          </p>
          <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto mb-12"></div>
          <p className="text-xs uppercase tracking-[0.3em] opacity-50 mb-4">Kami yang berbahagia</p>
          <h2 className="text-4xl font-serif text-[#FDF5E6]" style={{ fontFamily: '"Playfair Display", serif' }}>
            {data.mempelai_pria.nama.split(' ')[0]} & {data.mempelai_wanita.nama.split(' ')[0]}
          </h2>
          <p className="mt-8 text-[10px] opacity-30">Created with love by Divine Nexus</p>
        </div>
      </section>
    </div>
  );
}
