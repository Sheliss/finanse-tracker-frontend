import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";
import type { PropsWithChildren } from "react";
import Loader from "./Loader";

export function ProtectedRoute({ children }: PropsWithChildren) {
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  if (!isInitialized) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
