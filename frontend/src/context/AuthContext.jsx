/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiRequest } from "../api/client.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("avidus_user");
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("avidus_token");
    if (!token) {
      setLoading(false);
      return;
    }

    apiRequest("/auth/me")
      .then(({ user: freshUser }) => {
        setUser(freshUser);
        localStorage.setItem("avidus_user", JSON.stringify(freshUser));
      })
      .catch(() => {
        localStorage.removeItem("avidus_token");
        localStorage.removeItem("avidus_user");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  async function authenticate(path, payload) {
    const data = await apiRequest(path, {
      method: "POST",
      body: JSON.stringify(payload)
    });
    localStorage.setItem("avidus_token", data.token);
    localStorage.setItem("avidus_user", JSON.stringify(data.user));
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem("avidus_token");
    localStorage.removeItem("avidus_user");
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      isAdmin: user?.role === "Admin",
      login: (payload) => authenticate("/auth/login", payload),
      register: (payload) => authenticate("/auth/register", payload),
      logout
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
