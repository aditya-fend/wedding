"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { InvitationContent } from '@/types/invitation';

interface RoyalStoryProps {
  data: InvitationContent;
}

const RoyalStory = ({ data }: RoyalStoryProps) => {
  const stories = data.love_story && data.love_story.length > 0 
    ? data.love_story 
    : [
        {
          tahun: "2022",
          cerita: "Di bawah langit kota yang cerah, takdir mempertemukan kami dalam sebuah simfoni yang tak terduga.",
          foto: "https://images.unsplash.com/photo-1522673607200-16488354495f?q=80&w=400&auto=format&fit=crop"
        },
        {
          tahun: "2024",
          cerita: "Kami memutuskan untuk melangkah bersama, mengukir janji di antara kelopak bunga yang bermekaran.",
          foto: "https://images.unsplash.com/photo-1516589174184-c685eaa33324?q=80&w=400&auto=format&fit=crop"
        }
      ];

  return (
    <section className="py-20 px-8 bg-white relative overflow-hidden">
      <div className="text-center mb-16">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-pink-400 tracking-[0.4em] text-[10px] uppercase font-bold"
        >
          Our Journey
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-serif italic text-slate-800 mt-2"
        >
          Kisah Cinta Kami
        </motion.h2>
      </div>

      <div className="relative border-l border-pink-100 ml-4 space-y-16">
        {stories.map((story, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.3 }}
            className="relative pl-8"
          >
            {/* Dot Timeline */}
            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-pink-300 rounded-full border-2 border-white shadow-sm" />
            
            <span className="text-pink-300 font-serif italic text-sm">{story.tahun}</span>
            <h3 className="text-xl font-serif text-slate-800 mb-4">{story.cerita}</h3>
            
            <div className="flex flex-col space-y-4">
              {story.foto && (
                <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-md border-2 border-pink-50">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    src={story.foto} 
                    alt={`Story ${story.tahun}`}
                    className="w-full h-full object-cover grayscale-[20%]"
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Ornamen Loop */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-0 right-0 opacity-10 pointer-events-none"
      >
        <svg width="150" height="150" viewBox="0 0 100 100">
          <path d="M10 50 Q 50 10 90 50 T 10 50" fill="none" stroke="#F472B6" strokeWidth="0.5" />
        </svg>
      </motion.div>
    </section>
  );
};

export default RoyalStory;