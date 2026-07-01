import type { AxiosResponse } from "axios";
import api from "./api";
import type { User } from "./types";

export interface ProfileData {
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  location?: string;
}

export interface ChangePasswordData {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export const getProfile = (): Promise<AxiosResponse<User>> =>
  api.get<User>("/api/profile");

export const updateProfile = (data: ProfileData): Promise<AxiosResponse<{ message: string; user: User }>> =>
  api.put("/api/profile", data);

export const changePassword = (data: ChangePasswordData): Promise<AxiosResponse<{ message: string }>> =>
  api.post("/api/profile/password", data);

export const uploadFile = (
  file: File,
  type: "video" | "document" | "image" = "document"
): Promise<AxiosResponse<{ url: string; path: string; type: string; original_name: string }>> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);
  return api.post("/api/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
