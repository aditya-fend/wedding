import {
  User2,
  Heart,
  CalendarDays,
  BookHeart,
  ImageIcon,
  Wallet,
  Shirt,
  MailCheck,
  MessageCircle,
  Sparkles,
  Flag,
} from "lucide-react";

// Definisikan ID bagian sebagai tipe agar konsisten di seluruh aplikasi
export type SectionId =
  | ""
  | "cover"
  | "mempelai_pria"
  | "mempelai_wanita"
  | "acara"
  | "event_details"
  | "rsvp"
  | "love_story"
  | "gallery"
  | "guest_wishes"
  | "digital_envelope"
  | "dress_code"
  | "closing";

// Konfigurasi utama untuk setiap section di editor
export const SECTIONS = [
  {
    id: "cover",
    label: "Cover / Pembuka",
    icon: Sparkles,
  },
  {
    id: "mempelai_pria",
    label: "Mempelai Pria",
    icon: User2,
  },
  {
    id: "mempelai_wanita",
    label: "Mempelai Wanita",
    icon: Heart,
  },
  {
    id: "acara",
    label: "Acara & Countdown",
    icon: CalendarDays,
  },
  {
    id: "rsvp",
    label: "RSVP / Kehadiran",
    icon: MailCheck,
  },
  {
    id: "love_story",
    label: "Love Story",
    icon: BookHeart,
  },
  {
    id: "gallery",
    label: "Galeri Foto",
    icon: ImageIcon,
  },
  {
    id: "guest_wishes",
    label: "Ucapan & Doa",
    icon: MessageCircle,
  },
  {
    id: "digital_envelope",
    label: "Amplop Digital",
    icon: Wallet,
  },
  {
    id: "dress_code",
    label: "Dress Code / Tambahan",
    icon: Flag,
  },
  {
    id: "closing",
    label: "Penutup",
    icon: Heart,
  },
] as const;
