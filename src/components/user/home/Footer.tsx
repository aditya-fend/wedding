// components/home/Footer.tsx
import { Instagram, Youtube, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#F0EDE6] pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1 - Brand */}
          <div className="space-y-3">
            <div className="font-bold text-xl tracking-tighter text-[#2C2C2C]">
              Undang<span className="text-[#D4AF97]">Dong</span>
            </div>
            <p className="text-[#6B6B6B] text-[12px] leading-relaxed max-w-[200px]">
              Platform undangan pernikahan digital modern. Elegan, praktis, dan berkesan.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Link href="#" className="text-[#9B9B9B] hover:text-[#D4AF97] transition-colors">
                <Instagram className="size-4" />
              </Link>
              <Link href="#" className="text-[#9B9B9B] hover:text-[#D4AF97] transition-colors">
                <Youtube className="size-4" />
              </Link>
            </div>
          </div>

          {/* Column 2 - Navigasi */}
          <div>
            <h4 className="text-[11px] font-bold text-[#2C2C2C] uppercase tracking-[0.2em] mb-4">Navigasi</h4>
            <ul className="space-y-2">
              {["Template", "Fitur", "Harga", "Testimoni"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-[12px] text-[#6B6B6B] hover:text-[#D4AF97] transition-colors font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Bantuan */}
          <div>
            <h4 className="text-[11px] font-bold text-[#2C2C2C] uppercase tracking-[0.2em] mb-4">Bantuan</h4>
            <ul className="space-y-2 text-[12px]">
              {["Cara Kerja", "FAQ", "Syarat & Ketentuan", "Kebijakan Privasi"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-[#6B6B6B] hover:text-[#D4AF97] transition-colors font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Kontak */}
          <div>
            <h4 className="text-[11px] font-bold text-[#2C2C2C] uppercase tracking-[0.2em] mb-4">Hubungi Kami</h4>
            <div className="space-y-2 text-[12px] font-medium">
              <a href="tel:+6281234567890" className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#D4AF97] transition-colors">
                <Phone className="size-3" /> +62 812-3456-7890
              </a>
              <a href="mailto:hello@undangdong.id" className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#D4AF97] transition-colors">
                <Mail className="size-3" /> hello@undangdong.id
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#F0EDE6] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-[#9B9B9B] uppercase tracking-widest">
            © 2026 UNDANGDONG INDONESIA
          </p>
          <div className="flex gap-6 text-[10px] font-bold text-[#9B9B9B] uppercase tracking-widest">
            <span className="cursor-default">Privacy</span>
            <span className="cursor-default">Terms</span>
            <span className="cursor-default">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}