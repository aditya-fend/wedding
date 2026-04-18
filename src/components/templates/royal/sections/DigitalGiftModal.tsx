"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { InvitationContent } from '@/types/invitation';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: InvitationContent;
}

const DigitalGiftModal = ({ isOpen, onClose, data }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
      {/* Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-[320px] bg-white rounded-[2.5rem] p-8 shadow-2xl border border-pink-50"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-300 hover:text-pink-400 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="text-center">
          <div className="text-pink-400 flex justify-center mb-4">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M20 12V8H4V12M20 12V16H4V12M20 12H4M18 6H6" strokeLinecap="round" />
              <rect x="2" y="8" width="20" height="8" rx="2" />
            </svg>
          </div>
          <h3 className="font-serif text-xl italic text-slate-800">Amplop Digital</h3>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Tanda Kasih</p>
          
          <div className="mt-8 space-y-6">
            {data?.digital_envelope && data.digital_envelope.length > 0 ? (
              data.digital_envelope.map((envelope, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#fffafa] border border-pink-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-pink-100/30 rounded-full -mr-6 -mt-6" />
                  <p className="text-[10px] text-pink-400 font-bold tracking-widest uppercase mb-1">{envelope.bank_name}</p>
                  <p className="text-lg font-mono text-slate-700">{envelope.account_number}</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">a.n {envelope.account_holder}</p>
                  <button className="mt-3 text-[9px] text-pink-500 font-bold border-b border-pink-200 uppercase tracking-tighter">Salin Rekening</button>
                </div>
              ))
            ) : (
              <>
                <div className="p-4 rounded-2xl bg-[#fffafa] border border-pink-100">
                  <p className="text-[10px] text-pink-400 font-bold tracking-widest uppercase mb-1">BANK BCA</p>
                  <p className="text-lg font-mono text-slate-700">1234567890</p>
                  <p className="text-[11px] text-slate-500 italic mt-1">a.n Aurora Seraphina</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#fffafa] border border-pink-100">
                  <p className="text-[10px] text-pink-400 font-bold tracking-widest uppercase mb-1">E-WALLET / QRIS</p>
                  <div className="w-32 h-32 mx-auto bg-white border border-pink-50 rounded-lg flex items-center justify-center mb-2">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=RoyalWedding" alt="QRIS" className="w-24 h-24 grayscale-[50%]" />
                  </div>
                  <p className="text-[11px] text-slate-500 italic">Scan QRIS a.n Julian Alexander</p>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DigitalGiftModal;