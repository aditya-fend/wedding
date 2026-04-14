import { AttendanceStatus } from './enums';

export interface CoupleDetail {
  nama: string;
  ortu_ayah: string;
  ortu_ibu: string;
  instagram?: string; // [cite: 68, 69]
}

export interface EventDetail {
  tipe: string; // Misal: 'Akad', 'Resepsi'
  tanggal: string;
  jam: string;
  lokasi: string;
  alamat_lengkap: string;
  link_maps: string; // [cite: 70]
}

export interface LoveStory {
  tahun: string;
  cerita: string;
  foto?: string; // [cite: 70]
}

export interface DigitalEnvelope {
  bank_name: string;
  account_number: string;
  account_holder: string;
  qris_url?: string; // [cite: 72]
}

// Representasi kolom 'contentData' di Prisma
export interface InvitationContent {
  mempelai_pria: CoupleDetail;
  mempelai_wanita: CoupleDetail;
  acara: EventDetail[];
  love_story: LoveStory[];
  gallery: string[]; // [cite: 71]
  digital_envelope: DigitalEnvelope[];
  music_url?: string; // [cite: 73]
  dress_code?: string; // [cite: 74]
}

export interface GuestWish {
  id: string;
  invitation_id: string;
  guest_name: string;
  message: string;
  is_present: AttendanceStatus; // [cite: 83, 84, 85]
  created_at: Date;
}