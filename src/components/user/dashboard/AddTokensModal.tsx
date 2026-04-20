"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Plus, AlertCircle, Ticket, Sparkles } from "lucide-react";
import { PaymentModalTokens } from "./PaymentModalTokens";
import { cn } from "@/lib/utils";

interface AddTokensModalProps {
  currentTokens: number;
  totalTokens: number;
}

export function AddTokensModal({
  currentTokens,
  totalTokens,
}: AddTokensModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tokenInput, setTokenInput] = useState("");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [error, setError] = useState("");

  const tokens = tokenInput ? parseInt(tokenInput) : 0;
  const pricePerTenTokens = 20000;
  const totalPrice = Math.floor(tokens / 10) * pricePerTenTokens;
  const isValid = tokens >= 10 && tokens % 10 === 0;

  const handleTokenInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTokenInput(value);
    setError("");

    if (value && isNaN(parseInt(value))) {
      setError("Input harus berupa angka");
    } else if (value && parseInt(value) < 10) {
      setError("Minimal pengisian adalah 10 token");
    } else if (value && parseInt(value) % 10 !== 0) {
      setError("Token harus dalam kelipatan 10");
    }
  };

  const handlePaymentClick = () => {
    if (!isValid) {
      setError("Pastikan input valid sebelum melanjutkan");
      return;
    }
    setIsPaymentOpen(true);
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="rounded-2xl h-11 border-[#F0EDE6] bg-white hover:bg-[#FDFCFB] hover:border-[#D4AF97]/50 transition-all group px-4 shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <div className="bg-[#D4AF97]/10 p-1.5 rounded-lg group-hover:bg-[#D4AF97]/20 transition-colors">
                <Ticket className="size-3.5 text-[#D4AF97]" />
              </div>
              <span className="text-sm font-bold text-[#2C2C2C] tracking-tight">
                {totalTokens}
              </span>
              <div className="h-4 w-px bg-[#F0EDE6] mx-1" />
              <Plus className="size-3.5 text-[#9B9B9B] group-hover:text-[#D4AF97] transition-colors" />
            </div>
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-md rounded-[2.5rem] border-[#F0EDE6] p-8">
          <DialogHeader className="space-y-3">
            <div className="bg-[#FDFCFB] w-fit p-3 rounded-2xl border border-[#F0EDE6] mb-2">
              <Sparkles className="size-5 text-[#D4AF97]" />
            </div>
            <DialogTitle className="text-2xl font-bold tracking-tight text-[#2C2C2C]">
              Top Up Credits
            </DialogTitle>
            <DialogDescription className="text-sm text-[#6B6B6B] leading-relaxed">
              Saldo saat ini: <span className="font-bold text-[#D4AF97] bg-[#D4AF97]/5 px-2 py-0.5 rounded-full">{currentTokens} Token</span>. Gunakan token untuk mengaktifkan fitur premium undangan Anda.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-6">
            {/* Info Harga */}
            <div className="bg-[#FDFCFB] border border-[#F0EDE6] rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9B9B9B]">Rate Penukaran</p>
                <p className="text-sm text-[#2C2C2C] font-bold mt-0.5">10 Credits <span className="text-[#D4AF97] mx-1">≈</span> Rp 20.000</p>
              </div>
              <Ticket className="size-8 text-[#D4AF97]/10" />
            </div>

            {/* Input Token */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest text-[#2C2C2C] ml-1">
                Jumlah Top Up
              </label>
              <div className="relative group">
                <Input
                  type="number"
                  placeholder="Kelipatan 10 (Contoh: 20, 50, 100)"
                  value={tokenInput}
                  onChange={handleTokenInputChange}
                  className="h-12 rounded-2xl border-[#F0EDE6] focus:border-[#D4AF97] focus:ring-[#D4AF97]/10 bg-[#FDFCFB]/30 pl-4 font-bold transition-all"
                />
                <div className="absolute right-10 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#9B9B9B] uppercase tracking-tighter">
                  Tokens
                </div>
              </div>
              {error && (
                <div className="flex items-center gap-2 text-[11px] font-bold text-rose-500 animate-in fade-in slide-in-from-top-1 ml-1">
                  <AlertCircle className="size-3" />
                  {error}
                </div>
              )}
            </div>

            {/* Price Summary */}
            {tokens > 0 && isValid && (
              <div className="bg-gradient-to-br from-[#FDFCFB] to-[#FFFFFF] border border-[#F0EDE6] rounded-[1.5rem] p-5 space-y-3 animate-in zoom-in-95 duration-300">
                <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-[#9B9B9B]">
                  <span>Item</span>
                  <span>Subtotal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-[#2C2C2C]">{tokens} Credits</span>
                  <span className="text-sm font-bold text-[#2C2C2C]">Rp {totalPrice.toLocaleString("id-ID")}</span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-[#F0EDE6] to-transparent my-1" />
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-[#6B6B6B]">Total Pembayaran</span>
                  <span className="text-2xl font-black text-[#D4AF97] tracking-tighter">
                    Rp {totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <DialogClose asChild>
              <Button variant="ghost" className="rounded-2xl font-bold text-[#9B9B9B] hover:text-[#2C2C2C] flex-1">
                Batal
              </Button>
            </DialogClose>
            <Button
              onClick={handlePaymentClick}
              disabled={!isValid}
              className="rounded-2xl bg-[#D4AF97] hover:bg-[#B99575] text-white font-bold flex-[2] h-12 shadow-lg shadow-[#D4AF97]/20 transition-all active:scale-[0.98]"
            >
              Lanjutkan Pembayaran
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <PaymentModalTokens
        isOpen={isPaymentOpen}
        onClose={setIsPaymentOpen}
        tokenAmount={tokens}
        totalPrice={totalPrice}
      />
    </>
  );
}