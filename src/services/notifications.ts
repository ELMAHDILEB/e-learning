import type { AxiosResponse } from "axios";
import api from "./api";

export interface AppNotification {
  id: number;
  user_id: number;
  content: string;
  type: string;
  read: boolean;
  data?: Record<string, unknown>;
  created_at: string;
}

export const getNotifications = (unreadOnly = false): Promise<AxiosResponse<AppNotification[]>> =>
  api.get("/api/notifications", { params: { unread_only: unreadOnly } });

export const getUnreadCount = (): Promise<AxiosResponse<{ count: number }>> =>
  api.get("/api/notifications/unread-count");

export const markNotificationRead = (id: number): Promise<AxiosResponse<{ message: string }>> =>
  api.post(`/api/notifications/${id}/read`);

export const markAllNotificationsRead = (): Promise<AxiosResponse<{ message: string }>> =>
  api.post("/api/notifications/read-all");
