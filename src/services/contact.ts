import type { AxiosResponse } from "axios";
import api from "./api";

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContact = (data: ContactData): Promise<AxiosResponse<{ message: string }>> =>
  api.post("/api/contact", data);

export const forgotPassword = (email: string): Promise<AxiosResponse<{ message: string }>> =>
  api.post("/api/forgot-password", { email });
