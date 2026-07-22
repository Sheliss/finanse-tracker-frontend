import Header from "@/components/Header";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <ProtectedRoute>
      <Header />

      <main>
        <Outlet />
      </main>
    </ProtectedRoute>
  );
}
