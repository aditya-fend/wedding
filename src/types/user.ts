import { UserRole, UserStatus } from './enums';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  created_at: Date; // [cite: 32-40]
}

export interface Token {
  id: string;
  token_code: string;
  is_used: boolean;
  user_id?: string | null;
  package_type: 'Basic' | 'Premium';
  created_at: Date; // [cite: 44-47]
}