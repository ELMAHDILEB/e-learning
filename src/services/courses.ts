import type { AxiosResponse } from "axios";
import api from "./api";
import type { PaginatedResponse } from "./types-pagination";

export interface CourseListParams {
  page?: number;
  per_page?: number;
  search?: string;
  category?: string;
}

export interface Course {
  id: number;
  title: string;
  content?: string;
  teacher_id: number;
  category: string;
  price: number | string;
  status: string;
  teacher?: { id: number; name: string; email: string };
  enrollments_count?: number;
  lessons_count?: number;
  created_at?: string;
}

export interface CourseFormData {
  title: string;
  content?: string;
  category: string;
  price: number | string;
  status: string;
  teacher_id?: number;
}

export const mapCourseFromApi = (course: Course) => ({
  id: course.id,
  title: course.title,
  instructor: course.teacher?.name ?? "Unknown",
  category: course.category,
  price: parseFloat(String(course.price)) || 0,
  status: course.status,
  students: course.enrollments_count ?? 0,
  created: course.created_at
    ? new Date(course.created_at).toLocaleDateString("en-GB")
    : new Date().toLocaleDateString("en-GB"),
});

export const getCourses = (
  params: CourseListParams = {}
): Promise<AxiosResponse<PaginatedResponse<Course>>> => {
  const query: Record<string, string | number> = {
    page: params.page ?? 1,
    per_page: params.per_page ?? 5,
  };

  if (params.search) query.search = params.search;
  if (params.category && params.category !== "All") query.category = params.category;

  return api.get<PaginatedResponse<Course>>("/api/courses", { params: query });
};

export const getCourse = (id: number): Promise<AxiosResponse<Course>> =>
  api.get<Course>(`/api/courses/${id}`);

export const createCourse = (data: CourseFormData): Promise<AxiosResponse<Course>> =>
  api.post<Course>("/api/courses", {
    title: data.title,
    content: data.content || "",
    category: data.category,
    price: data.price,
    status: data.status,
  });

export const updateCourse = (
  id: number,
  data: CourseFormData
): Promise<AxiosResponse<Course>> =>
  api.put<Course>(`/api/courses/${id}`, {
    title: data.title,
    content: data.content || "",
    category: data.category,
    price: data.price,
    status: data.status,
  });

export const deleteCourse = (id: number): Promise<AxiosResponse<{ message: string }>> =>
  api.delete(`/api/courses/${id}`);
