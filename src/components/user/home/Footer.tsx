// components/home/Footer.tsx
import { Instagram, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E0D8] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Column 1 - Brand */}
          <div>
            <div className="font-semibold text-3xl tracking-tighter text-[#2C2C2C] mb-4">
              Undang<span className="text-[#D4AF97]">Dong</span>
            </div>
            <p className="text-[#6B6B6B] text-sm leading-relaxed max-w-xs">
              Platform undangan pernikahan digital modern untuk pasangan
              Indonesia. Elegan, mudah, dan terpercaya.
            </p>
          </div>

          {/* Column 2 - Navigasi */}
          <div>
            <h4 className="font-medium text-[#2C2C2C] mb-5">Navigasi</h4>
            <div className="space-y-3 text-sm">
              <Link
                href="#template"
                className="block text-[#6B6B6B] hover:text-[#D4AF97] transition-colors"
              >
                Template
              </Link>
              <Link
                href="#fitur"
                className="block text-[#6B6B6B] hover:text-[#D4AF97] transition-colors"
              >
                Fitur
              </Link>
              <Link
                href="#harga"
                className="block text-[#6B6B6B] hover:text-[#D4AF97] transition-colors"
              >
                Harga
              </Link>
              <Link
                href="/testimoni"
                className="block text-[#6B6B6B] hover:text-[#D4AF97] transition-colors"
              >
                testimoni
              </Link>
            </div>
          </div>

          {/* Column 3 - Bantuan */}
          <div>
            <h4 className="font-medium text-[#2C2C2C] mb-5">Bantuan</h4>
            <div className="space-y-3 text-sm">
              <Link
                href="#"
                className="block text-[#6B6B6B] hover:text-[#D4AF97] transition-colors"
              >
                Cara Kerja
              </Link>
              <Link
                href="#"
                className="block text-[#6B6B6B] hover:text-[#D4AF97] transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="#"
                className="block text-[#6B6B6B] hover:text-[#D4AF97] transition-colors"
              >
                Hubungi Kami
              </Link>
              <Link
                href="#"
                className="block text-[#6B6B6B] hover:text-[#D4AF97] transition-colors"
              >
                Kebijakan Privasi
              </Link>
            </div>
          </div>

          {/* Column 4 - Kontak */}
          <div>
            <h4 className="font-medium text-[#2C2C2C] mb-5">Hubungi Kami</h4>
            <div className="space-y-3 text-sm text-[#6B6B6B]">
              <p>
                WhatsApp:{" "}
                <span className="text-[#D4AF97]">+62 812-3456-7890</span>
              </p>
              <p>
                Email:{" "}
                <span className="text-[#D4AF97]">hello@undanganku.id</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex justify-center items-center mt-8">
          <p className="text-xs text-[#6B6B6B]">
            © 2026 Semua hak dilindungi, UndangDong
          </p>
          {/* <p className="text-xs text-[#6B6B6B]">
            <Link
              href="https://www.instagram.com/undanganku.id"
              className="text-[#D4AF97] hover:underline"
            >
              <Instagram className="inline-block size-4 mx-2 text-[#D4AF97]" />
            </Link>
            <Link
              href="https://www.instagram.com/undanganku.id"
              className="text-[#D4AF97] hover:underline"
            >
              <Youtube className="inline-block size-4 mx-2 text-[#D4AF97]" />
            </Link>
          </p> */}
        </div>
      </div>
    </footer>
  );
}
