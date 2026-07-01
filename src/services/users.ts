import type { AxiosResponse } from "axios";
import api from "./api";
import type { Role, RoleName, User } from "./types";
import type { PaginatedResponse } from "./types-pagination";

export interface UserListParams {
  page?: number;
  per_page?: number;
  search?: string;
  role?: string;
}

const ROLE_FILTER_MAP: Record<string, RoleName> = {
  Admin: "admin",
  Administrator: "admin",
  Teacher: "teacher",
  Instructor: "teacher",
  Student: "student",
};

export interface UserFormData {
  name: string;
  email: string;
  role: string;
  password?: string;
  role_id?: number;
}

const ROLE_FROM_API: Record<RoleName, string> = {
  admin: "Administrator",
  teacher: "Teacher",
  student: "Student",
};

export const mapUserFromApi = (user: User) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role ? ROLE_FROM_API[user.role.name] : "Student",
  status: "Active",
  joined: user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-GB")
    : new Date().toLocaleDateString("en-GB"),
  role_id: user.role_id ?? user.role?.id,
});

let rolesCache: Role[] | null = null;

export const getRoles = async (): Promise<Role[]> => {
  if (rolesCache) return rolesCache;
  const { data } = await api.get<Role[]>("/api/roles");
  rolesCache = data;
  return data;
};

const roleNameFromLabel = (label: string): RoleName => {
  if (label === "Administrator" || label === "Admin") return "admin";
  if (label === "Teacher" || label === "Instructor") return "teacher";
  return "student";
};

export const getUsers = (
  params: UserListParams = {}
): Promise<AxiosResponse<PaginatedResponse<User>>> => {
  const query: Record<string, string | number> = {
    page: params.page ?? 1,
    per_page: params.per_page ?? 5,
  };

  if (params.search) query.search = params.search;
  if (params.role && params.role !== "All") {
    query.role = ROLE_FILTER_MAP[params.role] ?? params.role;
  }

  return api.get<PaginatedResponse<User>>("/api/users", { params: query });
};

export const createUser = async (data: UserFormData): Promise<AxiosResponse<User>> => {
  const roles = await getRoles();
  const roleName = roleNameFromLabel(data.role);
  const role = roles.find((r) => r.name === roleName);

  return api.post<User>("/api/users", {
    name: data.name,
    email: data.email,
    password: data.password || "password123",
    role_id: role?.id ?? data.role_id ?? roles.find((r) => r.name === "student")?.id,
  });
};

export const updateUser = async (
  id: number,
  data: UserFormData
): Promise<AxiosResponse<User>> => {
  const roles = await getRoles();
  const roleName = roleNameFromLabel(data.role);
  const role = roles.find((r) => r.name === roleName);

  return api.put<User>(`/api/users/${id}`, {
    name: data.name,
    email: data.email,
    role_id: role?.id ?? data.role_id,
  });
};

export const deleteUser = (id: number): Promise<AxiosResponse<{ message: string }>> =>
  api.delete(`/api/users/${id}`);

export { ROLE_FROM_API };
