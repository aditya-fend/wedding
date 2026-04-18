"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { InvitationContent } from '@/types/invitation';
import { saveGuestWish } from '@/lib/actions/guestWish';

interface RoyalRSVPProps {
  data: InvitationContent;
  invitationId?: string;
}

const RoyalRSVP = ({ data, invitationId }: RoyalRSVPProps) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    guestCount: '1',
    presence: 'Hadir'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invitationId) return;
    
    setStatus('submitting');
    
    const result = await saveGuestWish({
      invitationId,
      guestName: formData.name,
      message: `RSVP: ${formData.presence} - ${formData.guestCount} orang`,
      isPresent: formData.presence,
      guestCount: parseInt(formData.guestCount)
    });

    if (result.success) {
      setStatus('submitted');
    } else {
      setStatus('idle');
      alert('Gagal mengirim konfirmasi. Silakan coba lagi.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.2 } }
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="py-20 px-8 bg-[#fffafa]"
    >
      <div className="max-w-sm mx-auto bg-white rounded-[2.5rem] p-8 shadow-sm border border-pink-50 relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-pink-50/50 rounded-full -mr-10 -mt-10 blur-2xl" />

        <div className="text-center mb-8">
          <motion.h2 className="text-3xl font-serif italic text-slate-800">RSVP</motion.h2>
          <p className="text-[10px] text-pink-400 uppercase tracking-[0.3em] mt-2">Konfirmasi Kehadiran</p>
        </div>

        {status === 'submitted' ? (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-10"
          >
            <div className="text-pink-400 mb-4 flex justify-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="font-serif italic text-slate-600">Terima kasih atas konfirmasi Anda.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-slate-400 ml-2">Nama Lengkap</label>
              <input 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-pink-50/30 border border-pink-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-200 transition-all font-serif"
                placeholder="Contoh: Bpk. Dharma"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-slate-400 ml-2">Jumlah Tamu</label>
              <select 
                value={formData.guestCount}
                onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                className="w-full bg-pink-50/30 border border-pink-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-200 appearance-none font-serif"
              >
                <option value="1">1 Orang</option>
                <option value="2">2 Orang</option>
                <option value="3">3 Orang</option>
                <option value="4">4 Orang</option>
                <option value="5">5 Orang</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-slate-400 ml-2">Kehadiran</label>
              <div className="flex gap-2">
                {['Hadir', 'Tidak Hadir'].map((opt) => (
                  <label key={opt} className="flex-1">
                    <input 
                      type="radio" 
                      name="attend" 
                      className="hidden peer" 
                      checked={formData.presence === opt}
                      onChange={() => setFormData({ ...formData, presence: opt })} 
                    />
                    <div className="text-center py-2 border border-pink-100 rounded-xl text-xs peer-checked:bg-pink-400 peer-checked:text-white peer-checked:border-pink-400 transition-all cursor-pointer text-slate-500 font-serif">
                      {opt}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === 'submitting'}
              className="w-full bg-slate-800 text-white py-4 rounded-xl text-[10px] tracking-[0.3em] mt-4 shadow-lg shadow-slate-200 disabled:bg-slate-400"
            >
              {status === 'submitting' ? 'MENGIRIM...' : 'KIRIM KONFIRMASI'}
            </motion.button>
          </form>
        )}
      </div>
    </motion.section>
  );
};

export default RoyalRSVP;