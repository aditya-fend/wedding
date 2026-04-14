export * from './enums';
export * from './user';
export * from './invitation';

// Tipe data gabungan untuk Invitation
import { InvitationContent } from './invitation';

export interface Invitation {
  id: string;
  user_id: string;
  template_id: string;
  title: string;
  slug_url: string;
  is_active: boolean;
  content_data: InvitationContent; // Strongly typed JSON
  views_count: number;
  created_at: Date; // [cite: 60-66, 75, 76]
}