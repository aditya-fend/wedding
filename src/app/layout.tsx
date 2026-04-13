// app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UndanganKu - Undangan Pernikahan Digital Indonesia",
  description: "Buat undangan pernikahan digital yang elegan dan mudah dalam hitungan menit",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} antialiased bg-[#F8F5F0]`}>
        {children}
        <Toaster 
          position="top-center" 
          richColors 
          closeButton 
        />
      </body>
    </html>
  );
}