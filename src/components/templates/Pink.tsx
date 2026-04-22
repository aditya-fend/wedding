"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { Playfair_Display, Montserrat } from "next/font/google";
import { motion } from "framer-motion";
import { InvitationContent } from "@/types/invitation";
import { data as dummyData } from "@/lib/dummy/data";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

interface TemplateProps {
  data?: InvitationContent;
  invitationId?: string;
}

export default function Pink({ data }: TemplateProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const invitation = (data ?? dummyData) as InvitationContent;
  const groom = invitation.mempelai_pria?.nama || "Pria";
  const bride = invitation.mempelai_wanita?.nama || "Wanita";

  const targetDate = useMemo(() => {
    if (invitation.countdown_date) {
      return new Date(invitation.countdown_date);
    }
    if (invitation.acara?.[0]?.tanggal) {
      return new Date(invitation.acara[0].tanggal);
    }
    return null;
  }, [invitation]);

  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    if (!targetDate) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        setCountdown({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  if (!isOpened) {
    return (
      <div
        className={`${montserrat.className} min-h-screen bg-gradient-to-br from-[#FCE4EC] to-[#F8BBD0] flex items-center justify-center p-4`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-[430px] w-full text-center space-y-8"
        >
          <div className="space-y-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className={`${playfair.className} text-6xl font-bold text-[#AD1457]`}
            >
              {groom.split(" ")[0]}
            </motion.h1>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
              className="text-4xl text-[#880E4F] font-bold"
            >
              &
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className={`${playfair.className} text-6xl font-bold text-[#AD1457]`}
            >
              {bride.split(" ")[0]}
            </motion.h1>
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="space-y-2"
          >
            <p className="text-sm text-[#880E4F] font-medium">
              {invitation.acara?.[0]?.tanggal
                ? new Date(invitation.acara[0].tanggal).toLocaleDateString(
                    "id-ID",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )
                : "Tanggal Pernikahan"}
            </p>
            <p className="text-sm text-[#AD1457] font-semibold">
              {invitation.acara?.[0]?.lokasi || "Lokasi Acara"}
            </p>
          </motion.div>

          <motion.button
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsOpened(true);
              if (audioRef.current) {
                audioRef.current.play().catch(() => {});
                setIsPlaying(true);
              }
            }}
            className="bg-[#AD1457] hover:bg-[#880E4F] text-white px-8 py-3 rounded-full font-semibold text-sm transition-colors duration-200"
          >
            Buka Undangan
          </motion.button>
        </motion.div>

        {/* Floating Music Control */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#AD1457] hover:bg-[#880E4F] rounded-full flex items-center justify-center text-white shadow-lg transition-colors duration-200 z-50"
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </motion.button>

        <audio ref={audioRef} loop>
          <source
            src={invitation.music_url || "/music/wedding-song.mp3"}
            type="audio/mpeg"
          />
        </audio>
      </div>
    );
  }

  return (
    <div
      className={`${montserrat.className} min-h-screen bg-gradient-to-br from-[#FCE4EC] to-[#F8BBD0] text-[#AD1457]`}
    >
      <div className="max-w-[430px] mx-auto px-4 py-8 space-y-12">
        {/* Couple Names Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <div className="space-y-4">
            <h1
              className={`${playfair.className} text-5xl font-bold text-[#AD1457]`}
            >
              {groom}
            </h1>
            <p className="text-sm text-[#880E4F]">
              Putra dari Bapak {invitation.mempelai_pria?.ortu_ayah} & Ibu{" "}
              {invitation.mempelai_pria?.ortu_ibu}
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-16 h-px bg-[#F48FB1] my-4"></div>
          </div>

          <div className="space-y-4">
            <h1
              className={`${playfair.className} text-5xl font-bold text-[#AD1457]`}
            >
              {bride}
            </h1>
            <p className="text-sm text-[#880E4F]">
              Putri dari Bapak {invitation.mempelai_wanita?.ortu_ayah} & Ibu{" "}
              {invitation.mempelai_wanita?.ortu_ibu}
            </p>
          </div>
        </motion.section>

        {/* Dates & Locations */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-6"
        >
          <h2
            className={`${playfair.className} text-2xl font-bold text-center text-[#AD1457]`}
          >
            Acara Pernikahan
          </h2>
          {invitation.acara?.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 text-center space-y-3"
            >
              <div className="text-xs font-semibold text-[#880E4F] uppercase tracking-wider">
                {event.tipe}
              </div>
              <div className="text-lg font-bold text-[#AD1457]">
                {new Date(event.tanggal).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="text-sm text-[#880E4F] font-medium">
                Pukul {event.jam}
              </div>
              <div className="text-sm text-[#AD1457] font-semibold">
                {event.lokasi}
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* RSVP Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 text-center space-y-4"
        >
          <h3
            className={`${playfair.className} text-xl font-bold text-[#AD1457]`}
          >
            RSVP
          </h3>
          <p className="text-sm text-[#880E4F]">
            Konfirmasi kehadiran Anda melalui WhatsApp
          </p>
          <a
            href={invitation.rsvp_url || "#"}
            className="inline-block bg-[#AD1457] hover:bg-[#880E4F] text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-200"
          >
            Konfirmasi Kehadiran
          </a>
        </motion.section>

        {/* Countdown Timer */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 text-center space-y-4"
        >
          <h3
            className={`${playfair.className} text-xl font-bold text-[#AD1457]`}
          >
            Menghitung Hari
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Hari", value: countdown.days },
              { label: "Jam", value: countdown.hours },
              { label: "Menit", value: countdown.minutes },
              { label: "Detik", value: countdown.seconds },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.8 + index * 0.1,
                  duration: 0.5,
                  type: "spring",
                }}
                className="space-y-2"
              >
                <div className="bg-[#AD1457] text-white rounded-lg p-3 text-xl font-bold">
                  {item.value}
                </div>
                <div className="text-xs text-[#880E4F] font-medium">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Love Story */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="space-y-6"
        >
          <h3
            className={`${playfair.className} text-2xl font-bold text-center text-[#AD1457]`}
          >
            Kisah Cinta Kami
          </h3>
          <div className="space-y-4">
            {invitation.love_story?.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 space-y-3"
              >
                <div className="text-sm font-semibold text-[#AD1457]">
                  {story.tahun}
                </div>
                <div className="text-sm text-[#880E4F] leading-relaxed">
                  {story.cerita}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Photo Gallery */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="space-y-6"
        >
          <h3
            className={`${playfair.className} text-2xl font-bold text-center text-[#AD1457]`}
          >
            Galeri Foto
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {invitation.gallery?.slice(0, 4).map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                className="aspect-square rounded-2xl overflow-hidden"
              >
                <Image
                  src={photo}
                  alt={`Foto ${index + 1}`}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                  unoptimized={
                    photo.includes("brave.com") || photo.includes("search")
                  }
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Guest Wishes */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 space-y-4"
        >
          <h3
            className={`${playfair.className} text-xl font-bold text-center text-[#AD1457]`}
          >
            Ucapan & Doa
          </h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {invitation.guest_wishes?.slice(0, 5).map((wish, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                className="border-l-2 border-[#F48FB1] pl-4 py-2"
              >
                <div className="text-sm font-semibold text-[#AD1457]">
                  {wish.name}
                </div>
                <div className="text-xs text-[#880E4F] italic">
                  &quot;{wish.message}&quot;
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Digital Envelope */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 space-y-4"
        >
          <h3
            className={`${playfair.className} text-xl font-bold text-center text-[#AD1457]`}
          >
            Amplop Digital
          </h3>
          <div className="space-y-3">
            {invitation.digital_envelope?.map((envelope, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
                className="flex justify-between items-center p-3 bg-[#FCE4EC] rounded-lg"
              >
                <div>
                  <div className="text-sm font-semibold text-[#AD1457]">
                    {envelope.bank_name}
                  </div>
                  <div className="text-xs text-[#880E4F]">
                    {envelope.account_number}
                  </div>
                  <div className="text-xs text-[#880E4F]">
                    a.n. {envelope.account_holder}
                  </div>
                </div>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(envelope.account_number)
                  }
                  className="bg-[#AD1457] hover:bg-[#880E4F] text-white px-3 py-1 rounded text-xs font-medium transition-colors duration-200"
                >
                  Salin
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Dress Code */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 text-center space-y-4"
        >
          <h3
            className={`${playfair.className} text-xl font-bold text-[#AD1457]`}
          >
            Dress Code
          </h3>
          <div className="flex justify-center space-x-4">
            {invitation.dress_code?.split(",").map((color, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 1.8 + index * 0.1,
                  duration: 0.5,
                  type: "spring",
                }}
                className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
                style={{ backgroundColor: color.trim() }}
              />
            ))}
          </div>
          <p className="text-sm text-[#880E4F]">
            {invitation.dress_code_description || "Sesuaikan dengan warna tema"}
          </p>
        </motion.section>

        {/* Closing Message */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-center space-y-4 pb-20"
        >
          <h3
            className={`${playfair.className} text-2xl font-bold text-[#AD1457]`}
          >
            Penutup
          </h3>
          <p className="text-sm text-[#880E4F] leading-relaxed italic">
            {invitation.closing_message ||
              "Terima kasih atas kehadiran dan doa restu Anda. Sampai jumpa di hari bahagia kami!"}
          </p>
          <div className="text-xs text-[#F48FB1] font-medium">
            Dibuat dengan ❤️ untuk {groom} & {bride}
          </div>
        </motion.section>
      </div>

      {/* Floating Music Control */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, duration: 0.5, type: "spring" }}
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#AD1457] hover:bg-[#880E4F] rounded-full flex items-center justify-center text-white shadow-lg transition-colors duration-200 z-50"
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </motion.button>

      <audio ref={audioRef} loop>
        <source
          src={invitation.music_url || "/music/wedding-song.mp3"}
          type="audio/mpeg"
        />
      </audio>
    
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
