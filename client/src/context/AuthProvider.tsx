import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import type { AuthContextValue } from "./AuthContext";
import useGetMe from "../hooks/auth/useGetMe";
import { clearToken, getToken, saveToken } from "../api/token";
import type { AuthResponse } from "../types/user";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(() => getToken());
  const { data: user, isLoading } = useGetMe(token);

  const login = useCallback(
    (response: AuthResponse) => {
      saveToken(response.token);
      queryClient.setQueryData(["me"], response.user);
      setToken(response.token);
    },
    [queryClient]
  );

  const logout = useCallback(() => {
    clearToken();
    setToken(null);
    queryClient.removeQueries({ queryKey: ["me"] });
  }, [queryClient]);

  useEffect(() => {
    window.addEventListener("auth:logout", logout);
    return () => window.removeEventListener("auth:logout", logout);
  }, [logout]);

  const value = useMemo<AuthContextValue>(() => {
    const currentUser = token ? (user ?? null) : null;
    return {
      user: currentUser,
      isAuthenticated: currentUser !== null,
      isAdmin: currentUser?.role === "admin",
      isLoading: Boolean(token) && isLoading,
      login,
      logout,
    };
  }, [token, user, isLoading, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}