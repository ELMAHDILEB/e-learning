import type { AxiosResponse } from "axios";
import api from "./api";

export interface Chapter {
  id: number;
  course_id: number;
  title: string;
  order: number;
  lessons?: import("./lessons").Lesson[];
}

export const getChapters = (courseId: number): Promise<AxiosResponse<Chapter[]>> =>
  api.get(`/api/courses/${courseId}/chapters`);

export const createChapter = (courseId: number, title: string): Promise<AxiosResponse<Chapter>> =>
  api.post(`/api/courses/${courseId}/chapters`, { title });

export const updateChapter = (id: number, data: { title?: string; order?: number }): Promise<AxiosResponse<Chapter>> =>
  api.put(`/api/chapters/${id}`, data);

export const deleteChapter = (id: number): Promise<AxiosResponse<{ message: string }>> =>
  api.delete(`/api/chapters/${id}`);
