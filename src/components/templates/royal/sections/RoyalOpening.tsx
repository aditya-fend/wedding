"use client";

import React from "react";
import { motion } from "framer-motion";

interface RoyalOpeningProps {
  onOpen: () => void;
  brideName: string;
  groomName: string;
  hero_image?: string;
}

const RoyalOpening = ({
  onOpen,
  brideName,
  groomName,
  hero_image,
}: RoyalOpeningProps) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="absolute inset-0 z-[50] flex flex-col items-center justify-center bg-white p-8 text-center"
    >
      {/* Gambar Ilustrasi Kerajaan/Bunga Tengah */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="w-48 h-48 mb-8 rounded-full border-2 border-pink-100 p-2 shadow-sm"
      >
        <img
          src={
            hero_image ||
            "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500&auto=format&fit=crop"
          }
          alt="Royal Wedding"
          className="w-full h-full object-cover rounded-full"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-pink-400 uppercase tracking-[0.3em] text-xs mb-4"
      >
        The Wedding of
      </motion.p>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-4xl md:text-5xl font-light text-slate-800 mb-2 italic"
      >
        {brideName} <span className="text-pink-300">&</span> {groomName}
      </motion.h1>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "60%" }}
        transition={{ delay: 1, duration: 0.8 }}
        className="h-[1px] bg-gradient-to-r from-transparent via-pink-200 to-transparent mb-8"
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpen}
        className="px-8 py-3 bg-white border border-pink-200 text-pink-500 rounded-full text-sm tracking-widest hover:bg-pink-50 transition-colors shadow-sm z-50 cursor-pointer"
      >
        BUKA UNDANGAN
      </motion.button>

      {/* Ornamen Daun Halus */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 10C50 10 30 40 50 60C70 40 50 10 50 10Z"
            fill="#F472B6"
          />
        </svg>
      </div>
    </motion.div>
  );
};

export default RoyalOpening;
