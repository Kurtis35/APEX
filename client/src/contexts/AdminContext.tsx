import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface AdminContextType {
  isAdmin: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, refetch } = useQuery<{ isAdmin: boolean }>({
    queryKey: ["/api/admin/status"],
  });

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      return apiRequest("POST", "/api/admin/login", { username, password });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/admin/logout");
    },
  });

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      await loginMutation.mutateAsync({ username, password });
      await refetch();
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
    await refetch();
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin: data?.isAdmin || false,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
