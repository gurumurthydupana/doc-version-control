import { createContext, useContext, useState, useEffect } from "react";
import client from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return {
      token,
      role: localStorage.getItem("role"),
      name: localStorage.getItem("name"),
    };
  });

  const login = async (email, password) => {
    const res = await client.post("/api/auth/login", { email, password });
    const { token, role, name } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("name", name);

    setUser({ token, role, name });
    return res.data;
  };

  const register = async (name, email, password, role) => {
    await client.post("/api/auth/register", { name, email, password, role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    setUser(null);
  };

  useEffect(() => {
    if (!user?.token) return;
    localStorage.setItem("token", user.token);
  }, [user]);

  const isEditor = user?.role === "editor";

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isEditor, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
