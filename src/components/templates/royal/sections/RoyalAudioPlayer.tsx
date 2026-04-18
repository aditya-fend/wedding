"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AudioProps {
  isPlaying: boolean;
  setIsPlaying: (val: boolean) => void;
  musicUrl?: string;
}

const RoyalAudioPlayer = ({ isPlaying, setIsPlaying, musicUrl = "/horeg-made-with-Voicemod.mp3" }: AudioProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrl = musicUrl;

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Menangani kebijakan autoplay browser
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, setIsPlaying]);

  return (
    <>
      <audio ref={audioRef} src={audioUrl} loop />
      
      {/* Tombol Kontrol Sticky (Diposisikan di atas tombol Gift) */}
      <div className="fixed bottom-24 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 bg-white/80 backdrop-blur-md text-pink-400 rounded-full shadow-lg flex items-center justify-center border border-pink-50"
        >
          {isPlaying ? (
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            </motion.div>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </motion.button>
      </div>
    </>
  );
};

export default RoyalAudioPlayer;