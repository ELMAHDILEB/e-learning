import type { AxiosResponse } from "axios";
import api from "./api";
import type { Course } from "./courses";

export interface DashboardStats {
  total_users?: number;
  total_courses?: number;
  total_students?: number;
  total_teachers?: number;
  total_enrollments?: number;
  average_quiz_score?: number;
  courses_by_category?: Record<string, number>;
  weekly_users?: { week: string; users: number }[];
  enrollment_trend?: { month: string; enrollments: number }[];
  average_score?: number;
  courses?: unknown[];
}

export interface StudentDashboard {
  enrolled_courses: number;
  completed_lessons: number;
  average_score: number;
  total_attempts: number;
  recent_scores: {
    title: string;
    score: number;
    passed: boolean;
    created_at: string;
  }[];
}

export const getDashboard = (): Promise<AxiosResponse<DashboardStats>> =>
  api.get<DashboardStats>("/api/dashboard");

export const getStudentDashboard = (): Promise<AxiosResponse<StudentDashboard>> =>
  api.get<StudentDashboard>("/api/student/dashboard");

export const getStudentCourses = (): Promise<AxiosResponse<Course[]>> =>
  api.get<Course[]>("/api/student/courses");

export interface StudentCourseDetail {
  course: Course;
  enrolled: boolean;
  lessons: import("./lessons").Lesson[];
  progress_percent: number;
}

export const getStudentCourse = (
  courseId: number
): Promise<AxiosResponse<StudentCourseDetail>> =>
  api.get<StudentCourseDetail>(`/api/student/courses/${courseId}`);

export const enrollCourse = (
  courseId: number
): Promise<AxiosResponse<{ message: string }>> =>
  api.post(`/api/student/courses/${courseId}/enroll`);
