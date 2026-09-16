import Header from "@/components/Header";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleSidebarOpen = () => {
    setIsSidebarOpen(true);
  };

  return (
    <ProtectedRoute>
      <div className="grid grid-cols-1 md:grid-cols-12 h-screen overflow-hidden">
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
        <div
          className={`
                  fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ease-in-out
                  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                  md:translate-x-0 md:static md:col-span-2 md:w-full
                `}
        >
          <Sidebar onClose={handleSidebarClose} />
        </div>

        <div className="col-span-12 md:col-span-10 w-full flex h-screen flex-col">
          <div>
            <Header onOpen={handleSidebarOpen} />
          </div>
          <div className="flex flex-1 min-h-0 overflow-y-auto p-4 bg-neutral-100 dark:bg-neutral-900">
            <Outlet />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
