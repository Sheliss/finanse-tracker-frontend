import Header from "@/components/Header";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen w-full">
        <Header />

        <main className="grid grid-cols-12 w-full flex-1">
          <div className="col-span-2">
            <Sidebar />
          </div>
          <div className="col-span-10">
            <Outlet />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
