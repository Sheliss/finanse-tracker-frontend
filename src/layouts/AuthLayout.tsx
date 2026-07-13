import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div>
      <header>Expense Tracker</header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
