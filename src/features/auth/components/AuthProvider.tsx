import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { getCurrentUser } from "../api/auth";
import { supabase } from "@/lib/supabase";

export function AuthProvider({ children }: PropsWithChildren) {
  const setUser = useAuthStore((state) => state.setUser);
  const setIsInitialized = useAuthStore((state) => state.setIsInitialized);

  useEffect(() => {
    async function initializeAuth() {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } finally {
        setIsInitialized(true);
      }
    }

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setIsInitialized]);

  return children;
}
