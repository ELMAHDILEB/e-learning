import type { AxiosResponse } from "axios";
import api from "./api";

export interface AiMessage {
  id: number;
  role: string;
  content: string;
  created_at: string;
}

export const askAi = (
  lessonId: number,
  question: string
): Promise<AxiosResponse<{ question: string; answer: string; conversation_id: number }>> =>
  api.post(`/api/lessons/${lessonId}/ai/ask`, { question });

export const summarizeLesson = (
  lessonId: number
): Promise<AxiosResponse<{ summary: string; lesson_id: number }>> =>
  api.post(`/api/lessons/${lessonId}/ai/summarize`);

export const getAiHistory = (
  lessonId: number
): Promise<AxiosResponse<{ messages: AiMessage[] }>> =>
  api.get(`/api/lessons/${lessonId}/ai/history`);

export const generateQuizWithAi = (
  lessonId: number,
  count = 3
): Promise<AxiosResponse<{ questions: { content: string; options: string[]; correct_answer: string }[]; lesson_id: number }>> =>
  api.post(`/api/lessons/${lessonId}/ai/generate-quiz`, { count });

export const explainLessonWithAi = (
  lessonId: number,
  topic?: string
): Promise<AxiosResponse<{ explanation: string; lesson_id: number }>> =>
  api.post(`/api/lessons/${lessonId}/ai/explain`, { topic });
