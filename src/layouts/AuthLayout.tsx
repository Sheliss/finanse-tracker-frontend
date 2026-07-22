import { GuestRoute } from "@/components/GuestRoute";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <GuestRoute>
      <div>
        <header>Expense Tracker</header>

        <main>
          <Outlet />
        </main>
      </div>
    </GuestRoute>
  );
}
