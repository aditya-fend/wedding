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
import { Plus, AlertCircle, Ticket } from "lucide-react";
import { PaymentModalTokens } from "./PaymentModalTokens";

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
      setError("Minimal input 10 token");
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
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="rounded-xl h-11 gap-2 p-3" size="lg">
            <Ticket className="size-4 text-[#D4AF97]" />
            <span className="text-sm font-bold text-[#2C2C2C]">
              {totalTokens}
            </span>

            <Plus className="size-4" />
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tambah Token</DialogTitle>
            <DialogDescription>
              Token Anda saat ini:{" "}
              <span className="font-bold text-[#D4AF97]">{currentTokens}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Info Harga */}
            <div className="bg-[#FBF8F4] border border-[#E5E0D8] rounded-xl p-3">
              <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
                Harga Token
              </p>
              <p className="text-sm text-[#2C2C2C] mt-1">
                Setiap 10 token ={" "}
                <span className="font-bold text-[#D4AF97]">Rp 20.000</span>
              </p>
            </div>

            {/* Input Token */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#2C2C2C]">
                Berapa token yang ingin ditambahkan?
              </label>
              <Input
                type="number"
                placeholder="Masukan jumlah token (minimal 10, kelipatan 10)"
                value={tokenInput}
                onChange={handleTokenInputChange}
                min="10"
                step="10"
                className="h-11 rounded-xl"
              />
              {error && (
                <div className="flex items-center gap-2 text-xs text-red-600">
                  <AlertCircle className="size-3" />
                  {error}
                </div>
              )}
            </div>

            {/* Price Summary */}
            {tokens > 0 && (
              <div className="bg-gradient-to-br from-[#F6EEE6] via-[#F8F3EE] to-[#FDF8F4] border border-[#E5E0D8] rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#6B6B6B]">
                    Token yang Ditambahkan
                  </span>
                  <span className="font-bold text-[#2C2C2C]">{tokens}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#6B6B6B]">
                    Harga per 10 Token
                  </span>
                  <span className="font-semibold text-[#2C2C2C]">
                    Rp 20.000
                  </span>
                </div>
                <div className="border-t border-[#D4AF97]/20 pt-3 flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#2C2C2C]">
                    Total Harga
                  </span>
                  <span className="text-lg font-bold text-[#D4AF97]">
                    Rp{" "}
                    {totalPrice.toLocaleString("id-ID", {
                      minimumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 justify-end">
            <DialogClose asChild>
              <Button variant="outline" className="rounded-xl">
                Batal
              </Button>
            </DialogClose>
            <Button
              onClick={handlePaymentClick}
              disabled={!isValid}
              className="rounded-xl"
            >
              Bayar via QRIS
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      <PaymentModalTokens
        isOpen={isPaymentOpen}
        onClose={setIsPaymentOpen}
        tokenAmount={tokens}
        totalPrice={totalPrice}
      />
    </>
  );
}
