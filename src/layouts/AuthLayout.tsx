import { GuestRoute } from "@/components/GuestRoute";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <GuestRoute>
      <div className="bg-neutral-100 h-screen">
        <header className="text-center pt-10 text-3xl font-bold">
          Expense Tracker
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </GuestRoute>
  );
}
