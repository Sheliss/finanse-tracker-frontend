import { GuestRoute } from "@/components/GuestRoute";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <GuestRoute>
      <div className="m-0 p-0 bg-neutral-100 flex items-center justify-center h-screen">
        <main>
          <Outlet />
        </main>
      </div>
    </GuestRoute>
  );
}
