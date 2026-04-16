import { 
  User2, 
  Heart, 
  CalendarDays, 
  BookHeart, 
  ImageIcon, 
  Wallet, 
  Shirt 
} from "lucide-react";

// Definisikan ID bagian sebagai tipe agar konsisten di seluruh aplikasi
export type SectionId = 
  | "mempelai_pria" 
  | "mempelai_wanita" 
  | "acara" 
  | "love_story" 
  | "gallery" 
  | "digital_envelope" 
  | "dress_code";

// Konfigurasi utama untuk setiap section di editor
export const SECTIONS = [
  { 
    id: "mempelai_pria", 
    label: "Mempelai Pria", 
    icon: User2 
  },
  { 
    id: "mempelai_wanita", 
    label: "Mempelai Wanita", 
    icon: Heart 
  },
  { 
    id: "acara", 
    label: "Waktu & Lokasi", 
    icon: CalendarDays 
  },
  { 
    id: "love_story", 
    label: "Love Story", 
    icon: BookHeart 
  },
  { 
    id: "gallery", 
    label: "Galeri Foto", 
    icon: ImageIcon 
  },
  { 
    id: "digital_envelope", 
    label: "Amplop Digital", 
    icon: Wallet 
  },
  { 
    id: "dress_code", 
    label: "Dress Code", 
    icon: Shirt 
  },
] as const;