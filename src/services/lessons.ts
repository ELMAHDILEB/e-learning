import type { AxiosResponse } from "axios";
import api from "./api";

export interface Lesson {
  id: number;
  title: string;
  content: string;
  course_id: number;
  order: number;
  duration: number;
  status: string;
  video_url?: string | null;
  file_url?: string | null;
  quiz?: Quiz | null;
  unlocked?: boolean;
  completed?: boolean;
  quiz_passed?: boolean;
  has_quiz?: boolean;
  course?: { id: number; title: string; teacher?: { name: string } };
}

export interface Quiz {
  id: number;
  title: string;
  content?: string;
  lesson_id: number;
  timer_minutes: number;
  pass_score: number;
  questions?: Question[];
}

export interface Question {
  id: number;
  content: string;
  options: string[];
  type: string;
}

export interface LessonFormData {
  title: string;
  content: string;
  duration: number | string;
  status: string;
  order?: number;
  video_url?: string;
  file_url?: string;
}

export const getLessons = (courseId: number): Promise<AxiosResponse<Lesson[]>> =>
  api.get<Lesson[]>(`/api/courses/${courseId}/lessons`);

export const createLesson = (
  courseId: number,
  data: LessonFormData
): Promise<AxiosResponse<Lesson>> =>
  api.post<Lesson>(`/api/courses/${courseId}/lessons`, data);

export const updateLesson = (
  id: number,
  data: LessonFormData
): Promise<AxiosResponse<Lesson>> =>
  api.put<Lesson>(`/api/lessons/${id}`, data);

export const deleteLesson = (id: number): Promise<AxiosResponse<{ message: string }>> =>
  api.delete(`/api/lessons/${id}`);

export const getStudentLesson = (id: number): Promise<AxiosResponse<Lesson>> =>
  api.get<Lesson>(`/api/student/lessons/${id}`);

export const getStudentLessonQuiz = (lessonId: number): Promise<AxiosResponse<Quiz>> =>
  api.get<Quiz>(`/api/student/lessons/${lessonId}/quiz`);

export interface QuizFormData {
  title: string;
  content?: string;
  timer_minutes: number;
  pass_score: number;
  questions: {
    content: string;
    options: string[];
    correct_answer: string;
    type?: string;
  }[];
}

export const createQuiz = (
  lessonId: number,
  data: QuizFormData
): Promise<AxiosResponse<Quiz>> =>
  api.post<Quiz>(`/api/lessons/${lessonId}/quiz`, data);

export const submitQuiz = (
  quizId: number,
  answers: Record<number, string>
): Promise<
  AxiosResponse<{
    message: string;
    score: number;
    passed: boolean;
    pass_score: number;
    correct: number;
    total: number;
  }>
> => api.post(`/api/quizzes/${quizId}/submit`, { answers });
