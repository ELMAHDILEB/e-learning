import type { AxiosResponse } from "axios";
import api from "./api";

export interface Permission {
  id: number;
  name: string;
  slug: string;
}

export interface RolePermissions {
  id: number;
  name: string;
  permission_ids: number[];
}

export interface PermissionsPayload {
  permissions: Permission[];
  roles: RolePermissions[];
}

export const getPermissions = (): Promise<AxiosResponse<PermissionsPayload>> =>
  api.get<PermissionsPayload>("/api/permissions");

export const updateRolePermissions = (
  roleId: number,
  permissionIds: number[]
): Promise<AxiosResponse<{ message: string; role: RolePermissions }>> =>
  api.put(`/api/roles/${roleId}/permissions`, { permission_ids: permissionIds });

export const ROLE_LABELS: Record<string, string> = {
  admin: "Admin",
  teacher: "Teacher",
  student: "Student",
};
