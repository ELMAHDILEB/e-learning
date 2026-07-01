import { createContext, useContext, useEffect } from "react";
import {
  clearSession,
  getMe,
  getStoredToken,
  logout as logoutApi,
  saveSession,
} from "../services/auth";
import { disconnectEcho, initEcho } from "../lib/echo";
import { useAuthStore } from "../store/authStore";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { user, token, loading, setSession, clearSession: clearStore, setLoading } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      const storedToken = getStoredToken();
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await getMe();
        saveSession(storedToken, data);
        setSession(storedToken, data);
        initEcho(storedToken, data.id);
      } catch {
        clearSession();
        disconnectEcho();
        clearStore();
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [setSession, clearStore, setLoading]);

  const loginSuccess = (authToken, authUser) => {
    saveSession(authToken, authUser);
    setSession(authToken, authUser);
    initEcho(authToken, authUser.id);
  };

  const logout = async () => {
    try {
      if (token) await logoutApi();
    } catch {
      // ignore network errors on logout
    } finally {
      disconnectEcho();
      clearSession();
      clearStore();
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, loginSuccess, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export { useAuthStore };
