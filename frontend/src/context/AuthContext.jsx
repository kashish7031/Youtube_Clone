// frontend/src/context/AuthContext.jsx
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  user: null,
  token: null,
  login: (data) => {},
  logout: () => {},
});

// helper to persist
const STORAGE_KEY = "auth";

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (auth) localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
    else localStorage.removeItem(STORAGE_KEY);
  }, [auth]);

  const login = ({ token, userId, username, email }) => {
    setAuth({ token, userId, username, email });
  };

  const logout = () => {
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ user: auth, token: auth?.token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
