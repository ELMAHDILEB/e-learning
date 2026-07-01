import { create } from "zustand";
import { getStoredToken, getStoredUser } from "../services/auth";

export const useAuthStore = create((set) => ({
  user: getStoredUser(),
  token: getStoredToken(),
  loading: Boolean(getStoredToken()),

  setSession: (token, user) => set({ token, user, loading: false }),
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  clearSession: () => set({ user: null, token: null, loading: false }),
}));
