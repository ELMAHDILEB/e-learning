import type { AxiosResponse } from "axios";
import api from "./api";

export interface ChatUser {
  id: number;
  name: string;
  role?: { name: string };
}

export interface ConversationSummary {
  id: number;
  other_user: { id: number; name: string; role: string } | null;
  last_message: { content: string; created_at: string; sender_id: number } | null;
  unread: number;
}

export interface ChatMessage {
  id: number;
  conversation_id: number;
  sender_id: number;
  content: string;
  created_at: string;
  sender: { id: number; name: string };
}

const roleLabel = (role?: string) => {
  if (role === "admin") return "Admin";
  if (role === "teacher") return "Teacher";
  return "Student";
};

export const formatContact = (user: ChatUser) => ({
  id: user.id,
  name: user.name,
  role: roleLabel(user.role?.name),
  avatar: user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
});

export const getConversations = (): Promise<AxiosResponse<ConversationSummary[]>> =>
  api.get("/api/conversations");

export const getContacts = (): Promise<AxiosResponse<ChatUser[]>> =>
  api.get("/api/conversations/contacts");

export const startConversation = (userId: number): Promise<AxiosResponse<{ id: number }>> =>
  api.post("/api/conversations", { user_id: userId });

export const getMessages = (
  conversationId: number,
  afterId?: number
): Promise<AxiosResponse<ChatMessage[]>> =>
  api.get(`/api/conversations/${conversationId}/messages`, {
    params: afterId ? { after_id: afterId } : {},
  });

export const sendMessage = (
  conversationId: number,
  content: string
): Promise<AxiosResponse<ChatMessage>> =>
  api.post(`/api/conversations/${conversationId}/messages`, { content });

export { roleLabel };
