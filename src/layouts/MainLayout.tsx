import Header from "@/components/Header";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <ProtectedRoute>
      <div className="h-dvh flex flex-col">
        <Header />

        <main className="flex flex-1">
          <Sidebar />
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
}
