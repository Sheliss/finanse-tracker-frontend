import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <header>Expense Tracker</header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
