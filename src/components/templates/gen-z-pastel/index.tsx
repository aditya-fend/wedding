"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, MapPin, Calendar, Clock, Copy, CheckCircle2,
  Volume2, VolumeX, ChevronDown, Gift, Sparkles,
} from "lucide-react";
import { InvitationContent } from "@/types/invitation";

const C = {
  bg: "#FDFBF7", beige: "#E5E0D8", sage: "#A3B19B",
  sageDark: "#7A9070", text: "#4A4A4A", muted: "#888880",
  border: "#DDD9D0", white: "#FFFFFF",
};

const fUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } } };
const stg = { hidden: {}, visible: { transition: { staggerChildren: 0.13 } } };

const Sec = ({ children, cls = "" }: { children: React.ReactNode; cls?: string }) => (
  <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stg} className={`w-full px-5 py-10 ${cls}`}>
    {children}
  </motion.section>
);

const Heading = ({ children }: { children: React.ReactNode }) => (
  <motion.div variants={fUp} className="mb-7 text-center">
    <h2 className="text-3xl font-light tracking-wide" style={{ fontFamily: "'Cormorant Garamond',serif", color: C.text }}>{children}</h2>
    <div className="mx-auto mt-2.5 w-8 h-px" style={{ backgroundColor: C.sage }} />
  </motion.div>
);

const Crd = ({ children, cls = "" }: { children: React.ReactNode; cls?: string }) => (
  <div className={`rounded-2xl p-5 ${cls}`} style={{ backgroundColor: C.beige, border: `1px solid ${C.border}` }}>{children}</div>
);

export default function GenZPastelTemplate({ data, guestName }: { data: InvitationContent; guestName?: string | null }) {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [story, setStory] = useState(0);
  const [copied, setCopied] = useState<Record<string, boolean>>({});
  const [tl, setTl] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const audio = useRef<HTMLAudioElement | null>(null);

  const groom = data.mempelai_pria?.nama || "Groom";
  const bride = data.mempelai_wanita?.nama || "Bride";

  useEffect(() => {
    if (!data.music_url) return;
    audio.current = new Audio(data.music_url);
    audio.current.loop = true;
    return () => { audio.current?.pause(); };
  }, [data.music_url]);

  useEffect(() => {
    if (!audio.current) return;
    playing && opened ? audio.current.play().catch(() => {}) : audio.current.pause();
  }, [playing, opened]);

  useEffect(() => {
    if (!data.countdown_date) return;
    const target = new Date(data.countdown_date).getTime();
    const id = setInterval(() => {
      const d = target - Date.now();
      if (d < 0) return;
      setTl({ d: Math.floor(d / 86400000), h: Math.floor((d % 86400000) / 3600000), m: Math.floor((d % 3600000) / 60000), s: Math.floor((d % 60000) / 1000) });
    }, 1000);
    return () => clearInterval(id);
  }, [data.countdown_date]);

  useEffect(() => {
    if (!data.love_story?.length || !opened) return;
    const id = setInterval(() => setStory(p => (p + 1) % data.love_story!.length), 4800);
    return () => clearInterval(id);
  }, [data.love_story, opened]);

  const copy = useCallback((text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(p => ({ ...p, [key]: true }));
    setTimeout(() => setCopied(p => ({ ...p, [key]: false })), 2000);
  }, []);

  return (
    <div className="w-full min-h-screen overflow-x-hidden" style={{ backgroundColor: C.bg, color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');`}</style>

      {/* ── COVER ── */}
      <AnimatePresence>
        {!opened && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }} transition={{ duration: 0.9 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center"
            style={{ backgroundColor: C.bg }}>
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-40" style={{ backgroundColor: C.beige, filter: "blur(60px)", transform: "translate(30%,-30%)" }} />
            <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full opacity-30" style={{ backgroundColor: C.sage, filter: "blur(80px)", transform: "translate(-30%,30%)" }} />
            {data.hero_image && <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${data.hero_image})` }} />}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9 }} className="relative z-10 flex flex-col items-center gap-5">
              <p className="text-xs uppercase tracking-[0.35em] font-medium" style={{ color: C.sage }}>{data.cover_subtitle || "You Are Invited"}</p>
              <div className="w-7 h-px" style={{ backgroundColor: C.sage }} />
              <h1 className="text-5xl leading-tight font-light italic" style={{ fontFamily: "'Cormorant Garamond',serif" }}>{data.cover_title || `${groom} & ${bride}`}</h1>
              
              {/* Tambahan Nama Tamu */}
              {guestName && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8 }}
                  className="mt-2 px-8 py-3 rounded-2xl backdrop-blur-sm" 
                  style={{ backgroundColor: `${C.beige}50`, border: `1px solid ${C.border}80` }}>
                  <p className="text-[9px] uppercase tracking-widest font-bold mb-1" style={{ color: C.sageDark }}>Kepada Yth:</p>
                  <p className="text-xl font-medium" style={{ color: C.text }}>{guestName}</p>
                </motion.div>
              )}

              {data.wedding_date && (
                <p className="text-sm font-light" style={{ color: C.muted }}>
                  {new Date(data.wedding_date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </p>
              )}
              <motion.button onClick={() => setOpened(true)} whileTap={{ scale: 0.95 }}
                animate={{ scale: [1, 1.02, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}
                className="mt-4 px-8 py-3.5 rounded-full text-sm font-medium flex items-center gap-2 shadow-sm"
                style={{ backgroundColor: C.sage, color: C.white }}>
                <Heart className="w-3.5 h-3.5" /> Buka Undangan
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN ── */}
      {opened && (
        <div className="relative w-full pb-28">
          {/* Music */}
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            onClick={() => setPlaying(p => !p)}
            className="fixed top-5 right-4 z-40 w-10 h-10 rounded-full flex items-center justify-center shadow-md"
            style={{ backgroundColor: C.white, border: `1px solid ${C.border}` }}>
            {playing ? <Volume2 className="w-4 h-4" style={{ color: C.sage }} /> : <VolumeX className="w-4 h-4" style={{ color: C.muted }} />}
          </motion.button>

          {/* ── HERO ── */}
          <section className="relative w-full min-h-screen flex flex-col justify-end overflow-hidden">
            {data.hero_image
              ? <motion.div initial={{ scale: 1.08, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.6 }}
                  className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${data.hero_image})` }} />
              : <div className="absolute inset-0" style={{ backgroundColor: C.beige }} />}
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.bg} 18%, ${C.bg}88 42%, transparent 70%)` }} />
            <motion.div initial="hidden" animate="visible" variants={stg} className="relative z-10 flex flex-col items-center text-center px-6 pb-14 gap-3">
              <motion.p variants={fUp} className="text-xs uppercase tracking-[0.28em]" style={{ color: C.sage }}>The Wedding of</motion.p>
              <motion.h2 variants={fUp} className="text-6xl font-light italic leading-tight" style={{ fontFamily: "'Cormorant Garamond',serif" }}>{groom}</motion.h2>
              <motion.span variants={fUp} className="text-xl font-light" style={{ color: C.sage }}>&</motion.span>
              <motion.h2 variants={fUp} className="text-6xl font-light italic leading-tight" style={{ fontFamily: "'Cormorant Garamond',serif" }}>{bride}</motion.h2>
              <motion.div variants={fUp} className="mt-5"><ChevronDown className="w-5 h-5 animate-bounce" style={{ color: C.sage }} /></motion.div>
            </motion.div>
          </section>

          {/* ── MEMPELAI ── */}
          <Sec>
            <Heading>Mempelai</Heading>
            <div className="flex flex-col gap-4">
              {[
                { p: data.mempelai_pria, label: "Putra dari" },
                { p: data.mempelai_wanita, label: "Putri dari" },
              ].map(({ p, label }, i) => (
                <motion.div key={i} variants={fUp}>
                  <Crd cls="flex items-center gap-4">
                    {/* Arch photo */}
                    <div className="shrink-0 w-24 h-28 overflow-hidden" style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", border: `2px solid ${C.sage}`, backgroundColor: C.bg }}>
                      {p?.foto
                        ? <img src={p.foto} alt="" className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center"><Heart className="w-7 h-7" style={{ color: C.sage }} /></div>}
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-xl font-light italic" style={{ fontFamily: "'Cormorant Garamond',serif" }}>{p?.nama}</p>
                      <p className="text-xs" style={{ color: C.muted }}>{label}</p>
                      <p className="text-sm font-light leading-snug" style={{ color: C.text }}>
                        {p?.ortu_ayah && `Bp. ${p.ortu_ayah}`}
                        {p?.ortu_ibu && <><br />Ibu {p.ortu_ibu}</>}
                      </p>
                    </div>
                  </Crd>
                </motion.div>
              ))}
            </div>
          </Sec>

          {/* ── COUNTDOWN ── */}
          {data.countdown_date && (
            <Sec>
              <Heading>Menuju Hari Bahagia</Heading>
              <motion.div variants={fUp}>
                <Crd>
                  <div className="grid grid-cols-4 gap-3">
                    {[["Hari", tl.d], ["Jam", tl.h], ["Menit", tl.m], ["Detik", tl.s]].map(([lbl, val]) => (
                      <div key={lbl} className="flex flex-col items-center rounded-xl py-4" style={{ backgroundColor: C.bg }}>
                        <span className="text-3xl font-light tabular-nums" style={{ fontFamily: "'Cormorant Garamond',serif", color: C.sageDark }}>
                          {String(val).padStart(2, "0")}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest mt-1" style={{ color: C.muted }}>{lbl}</span>
                      </div>
                    ))}
                  </div>
                </Crd>
              </motion.div>
            </Sec>
          )}

          {/* ── JADWAL ACARA ── */}
          {data.acara && data.acara.length > 0 && (
            <Sec>
              <Heading>Rangkaian Acara</Heading>
              {data.acara.map((ev, i) => (
                <motion.div key={i} variants={fUp} className="flex gap-4 mb-6">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full mt-1 shrink-0" style={{ backgroundColor: C.sage }} />
                    {i < data.acara!.length - 1 && <div className="w-px flex-1 mt-1" style={{ backgroundColor: C.border }} />}
                  </div>
                  <div className="flex-1 pb-2">
                    <Crd cls="p-4">
                      <h3 className="text-lg font-light italic mb-3" style={{ fontFamily: "'Cormorant Garamond',serif", color: C.sageDark }}>
                        {ev.tipe}
                      </h3>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-sm" style={{ color: C.muted }}>
                          <Calendar className="w-3.5 h-3.5 shrink-0" style={{ color: C.sage }} />{ev.tanggal}
                        </div>
                        <div className="flex items-center gap-2 text-sm" style={{ color: C.muted }}>
                          <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: C.sage }} />{ev.jam}
                        </div>
                        <div className="flex items-start gap-2 text-sm" style={{ color: C.muted }}>
                          <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: C.sage }} />
                          <span><span className="font-medium" style={{ color: C.text }}>{ev.lokasi}</span>{ev.alamat_lengkap && <><br />{ev.alamat_lengkap}</>}</span>
                        </div>
                      </div>
                      {ev.link_maps && (
                        <a href={ev.link_maps} target="_blank" rel="noopener noreferrer"
                          className="mt-4 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium"
                          style={{ backgroundColor: C.bg, color: C.sage, border: `1px solid ${C.border}` }}>
                          <MapPin className="w-3 h-3" /> Buka Google Maps
                        </a>
                      )}
                    </Crd>
                  </div>
                </motion.div>
              ))}
            </Sec>
          )}

          {/* ── LOVE STORY ── */}
          {data.love_story && data.love_story.length > 0 && (
            <Sec>
              <Heading>Kisah Cinta</Heading>
              <div className="flex gap-1.5 justify-center mb-5">
                {data.love_story.map((_, i) => (
                  <button key={i} onClick={() => setStory(i)} className="rounded-full transition-all"
                    style={{ width: i === story ? 20 : 7, height: 7, backgroundColor: i === story ? C.sage : C.border }} />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={story} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.45 }}>
                  <Crd>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: C.bg, color: C.sage }}>
                        {data.love_story[story].tahun}
                      </span>
                      <div className="flex-1 h-px" style={{ backgroundColor: C.border }} />
                    </div>
                    <p className="text-sm leading-relaxed font-light" style={{ color: C.muted }}>
                      {data.love_story[story].cerita}
                    </p>
                    {data.love_story[story].foto && (
                      <img src={data.love_story[story].foto} alt="" className="w-full mt-4 rounded-xl object-cover" style={{ maxHeight: 200 }} />
                    )}
                  </Crd>
                </motion.div>
              </AnimatePresence>
            </Sec>
          )}

          {/* ── GALLERY ── */}
          {data.gallery && data.gallery.length > 0 && (
            <Sec>
              <Heading>Galeri</Heading>
              <motion.div variants={fUp} className="columns-2 gap-3">
                {data.gallery.map((img, i) => (
                  <div key={i} className="mb-3 break-inside-avoid overflow-hidden rounded-2xl" style={{ border: `1px solid ${C.border}` }}>
                    <img src={img} alt="" loading="lazy" className="w-full object-cover"
                      style={{ aspectRatio: i % 5 === 0 ? "3/4" : i % 3 === 0 ? "4/3" : "1/1" }} />
                  </div>
                ))}
              </motion.div>
            </Sec>
          )}

          {/* ── AMPLOP DIGITAL ── */}
          {data.digital_envelope && data.digital_envelope.length > 0 && (
            <Sec>
              <Heading>Amplop Digital</Heading>
              <motion.p variants={fUp} className="text-center text-sm mb-5 font-light" style={{ color: C.muted }}>
                Doa restu Anda adalah hadiah terindah bagi kami.
              </motion.p>
              <div className="flex flex-col gap-3">
                {data.digital_envelope.map((env, i) => (
                  <motion.div key={i} variants={fUp}>
                    <Crd>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-semibold text-sm" style={{ color: C.text }}>{env.bank_name}</p>
                          <p className="text-xs mt-0.5 font-light" style={{ color: C.muted }}>a.n {env.account_holder}</p>
                        </div>
                        <Gift className="w-5 h-5" style={{ color: C.sage }} />
                      </div>
                      <div className="flex items-center justify-between rounded-xl px-4 py-3" style={{ backgroundColor: C.bg }}>
                        <span className="font-mono text-sm tracking-wider">{env.account_number}</span>
                        <motion.button whileTap={{ scale: 0.9 }} onClick={() => copy(env.account_number, `e${i}`)}
                          className="ml-2 p-1.5 rounded-lg" style={{ backgroundColor: C.beige, border: `1px solid ${C.border}` }}>
                          {copied[`e${i}`] ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" style={{ color: C.sage }} />}
                        </motion.button>
                      </div>
                      {env.qris_url && (
                        <div className="mt-4 flex flex-col items-center">
                          <p className="text-xs mb-2" style={{ color: C.muted }}>Atau scan QRIS</p>
                          <img src={env.qris_url} alt="QRIS" className="w-32 h-32 object-contain rounded-xl" style={{ border: `1px solid ${C.border}` }} />
                        </div>
                      )}
                    </Crd>
                  </motion.div>
                ))}
              </div>
            </Sec>
          )}

          {/* ── RSVP ── */}
          {data.rsvp_url && (
            <Sec>
              <Heading>RSVP</Heading>
              <motion.div variants={fUp} className="text-center">
                <p className="text-sm font-light mb-5" style={{ color: C.muted }}>
                  {data.rsvp_note || "Mohon konfirmasi kehadiran Anda sebelum hari H."}
                </p>
                <a href={data.rsvp_url} target="_blank" rel="noopener noreferrer">
                  <motion.div whileTap={{ scale: 0.97 }}
                    className="w-full py-4 rounded-2xl text-sm font-medium flex items-center justify-center gap-2"
                    style={{ backgroundColor: C.sage, color: C.white }}>
                    <Sparkles className="w-4 h-4" /> Konfirmasi Kehadiran
                  </motion.div>
                </a>
              </motion.div>
            </Sec>
          )}

          {/* ── UCAPAN ── */}
          {data.guest_wishes && data.guest_wishes.length > 0 && (
            <section className="py-8 overflow-hidden">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stg}>
                <motion.div variants={fUp} className="px-5 mb-6 text-center">
                  <h2 className="text-3xl font-light tracking-wide" style={{ fontFamily: "'Cormorant Garamond',serif", color: C.text }}>Ucapan & Doa</h2>
                  <div className="mx-auto mt-2.5 w-8 h-px" style={{ backgroundColor: C.sage }} />
                </motion.div>
                <motion.div variants={fUp} className="relative flex overflow-x-hidden">
                  <motion.div className="flex gap-3 px-5" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: 22 }}>
                    {[...data.guest_wishes, ...data.guest_wishes].map((w, i) => (
                      <div key={i} className="inline-flex flex-col rounded-2xl p-4 min-w-[220px] max-w-[240px] shrink-0"
                        style={{ backgroundColor: C.beige, border: `1px solid ${C.border}` }}>
                        <p className="text-xs font-semibold mb-2" style={{ color: C.sageDark }}>{w.name}</p>
                        <p className="text-xs leading-relaxed font-light line-clamp-3" style={{ color: C.muted }}>{w.message}</p>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            </section>
          )}

          {/* ── CLOSING ── */}
          <Sec cls="text-center">
            <motion.div variants={fUp} className="flex flex-col items-center gap-4">
              <div className="w-10 h-px" style={{ backgroundColor: C.sage }} />
              <Heart className="w-6 h-6" style={{ color: C.sage }} />
              <p className="text-sm font-light leading-relaxed max-w-xs" style={{ color: C.muted }}>
                {data.closing_message || "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu."}
              </p>
              <h3 className="text-3xl font-light italic mt-1" style={{ fontFamily: "'Cormorant Garamond',serif", color: C.text }}>
                {groom} & {bride}
              </h3>
              <div className="w-10 h-px" style={{ backgroundColor: C.border }} />
            </motion.div>
          </Sec>

          {/* ── WATERMARK SAJIJANJI ── */}
          <div className="w-full py-8 mb-20 text-center flex flex-col items-center justify-center opacity-70">
            <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: C.muted }}>Created with love by</p>
            <a href="https://sajijanji.id" target="_blank" rel="noopener noreferrer" className="text-xs font-black mt-1 hover:opacity-80 transition-opacity" style={{ color: C.sageDark }}>
              SajiJanji
            </a>
          </div>

          {/* ── STICKY CTA ── */}
          {data.rsvp_url && (
            <div className="fixed bottom-0 left-0 w-full z-50 px-5 pb-6 pt-10"
              style={{ background: `linear-gradient(to top, ${C.bg} 60%, transparent)` }}>
              <motion.a href={data.rsvp_url} target="_blank" rel="noopener noreferrer"
                initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 22, delay: 1 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-semibold tracking-wide shadow-lg"
                style={{ backgroundColor: C.sage, color: C.white }}>
                <Sparkles className="w-4 h-4" /> Konfirmasi Kehadiran
              </motion.a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
