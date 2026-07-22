import { useAuthStore } from "@/store/auth-store";

const Header = () => {
  const { user } = useAuthStore((state) => state);

  return (
    <div>
      <div>Expense Tracker</div>
      {user && <div>{user.email}</div>}
    </div>
  );
};
export default Header;
