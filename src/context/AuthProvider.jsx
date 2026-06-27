import { createContext, useContext, useEffect, useState } from "react";
import {
  clearSession,
  getMe,
  getStoredToken,
  getStoredUser,
  logout as logoutApi,
  saveSession,
} from "../services/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);
  const [token, setToken] = useState(getStoredToken);
  const [loading, setLoading] = useState(!!getStoredToken());

  useEffect(() => {
    const init = async () => {
      const storedToken = getStoredToken();
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await getMe();
        setUser(data);
        saveSession(storedToken, data);
      } catch {
        clearSession();
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const loginSuccess = (authToken, authUser) => {
    saveSession(authToken, authUser);
    setToken(authToken);
    setUser(authUser);
  };

  const logout = async () => {
    try {
      if (token) await logoutApi();
    } catch {
      // ignore network errors on logout
    } finally {
      clearSession();
      setToken(null);
      setUser(null);
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
