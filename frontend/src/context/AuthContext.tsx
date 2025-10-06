import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  user: any | null;
  token: string | null;
  login: (userData: any, accessToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw || raw === "undefined") return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => {
    const t = localStorage.getItem("token");
    return t && t !== "undefined" ? t : null;
  });

  const login = (userData: any, accessToken: string) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", accessToken);
    setUser(userData);
    setToken(accessToken);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    // On mount, rehydrate from storage
    try {
      const raw = localStorage.getItem("user");
      const tok = localStorage.getItem("token");
      if (raw && raw !== "undefined") {
        setUser(JSON.parse(raw));
      }
      if (tok && tok !== "undefined") {
        setToken(tok);
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
