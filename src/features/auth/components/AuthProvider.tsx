import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { getCurrentUser } from "../api/auth";

export function AuthProvider({ children }: PropsWithChildren) {
  const setUser = useAuthStore((state) => state.setUser);
  const setIsInitialized = useAuthStore((state) => state.setIsInitialized);

  useEffect(() => {
    async function initializeAuth() {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch (error) {
        setUser(null);
      } finally {
        setIsInitialized(true);
      }
    }

    initializeAuth();
  }, [setUser, setIsInitialized]);

  return children;
}
