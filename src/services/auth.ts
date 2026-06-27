import type { AxiosResponse } from "axios";
import api from "./api";
import type {
  AuthResponse,
  LoginCredentials,
  LogoutResponse,
  RegisterData,
  User,
} from "./types";

const API_BASE = import.meta.env.VITE_API_URL || "";

export const login = (
  credentials: LoginCredentials
): Promise<AxiosResponse<AuthResponse>> =>
  api.post<AuthResponse>("/api/login", credentials);

export const register = (
  data: RegisterData
): Promise<AxiosResponse<AuthResponse>> =>
  api.post<AuthResponse>("/api/register", data);

export const logout = (): Promise<AxiosResponse<LogoutResponse>> =>
  api.post<LogoutResponse>("/api/logout");

export const getMe = (): Promise<AxiosResponse<User>> =>
  api.get<User>("/api/me");

export const getGoogleLoginUrl = (): string => `${API_BASE}/auth/google`;

export const saveSession = (token: string, user: User): void => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearSession = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getStoredUser = (): User | null => {
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};

export const getStoredToken = (): string | null =>
  localStorage.getItem("token");

export const getDashboardPath = (user: User | null): string => {
  const role = user?.role?.name;
  if (role === "admin" || role === "teacher") return "/admin";
  return "/";
};

export type {
  AuthResponse,
  LoginCredentials,
  LogoutResponse,
  RegisterData,
  Role,
  RoleName,
  User,
} from "./types";
