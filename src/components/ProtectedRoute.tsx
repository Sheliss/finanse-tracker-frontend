import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";
import type { PropsWithChildren } from "react";
import Loader from "./Loader";

export function ProtectedRoute({ children }: PropsWithChildren) {
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  if (!isInitialized) {
    return (
      <div className="flex h-screen flex-1 min-h-0 overflow-y-auto p-4 bg-neutral-100 dark:bg-neutral-900">
        <Loader />;
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
