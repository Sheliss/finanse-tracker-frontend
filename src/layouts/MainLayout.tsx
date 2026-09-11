import Header from "@/components/Header";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <ProtectedRoute>
      <div className="grid grid-cols-12 h-screen">
        <div className="col-span-2">
          <Sidebar />
        </div>

        <div className="col-span-10 w-full flex h-screen flex-col">
          <div>
            <Header />
          </div>
          <div className="flex flex-1 min-h-0 overflow-y-auto p-4 bg-neutral-100 dark:bg-neutral-900">
            <Outlet />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
