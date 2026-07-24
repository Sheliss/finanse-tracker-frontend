import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";
import type { PropsWithChildren } from "react";

export function GuestRoute({ children }: PropsWithChildren) {
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  if (!isInitialized) {
    return <div>{`Loading ∘ ∘ ∘ ( °ヮ° )`}</div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
