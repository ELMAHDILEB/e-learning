import type { AxiosResponse } from "axios";
import api from "./api";

export interface StudentPerformance {
  student: { id: number; name: string; email: string };
  courses: string[];
  completed_lessons: number;
  total_lessons: number;
  progress_percent: number;
  average_score: number;
  quiz_attempts: number;
  passed_quizzes: number;
}

export const getTeacherStudents = (): Promise<AxiosResponse<{ students: StudentPerformance[]; total_students: number }>> =>
  api.get("/api/teacher/students");
