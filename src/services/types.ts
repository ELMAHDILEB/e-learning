export type RoleName = "admin" | "teacher" | "student";

export interface Role {
  id: number;
  name: RoleName;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role_id?: number;
  google_id?: string | null;
  avatar?: string | null;
  phone?: string | null;
  bio?: string | null;
  location?: string | null;
  role?: Role;
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface LogoutResponse {
  message: string;
}
