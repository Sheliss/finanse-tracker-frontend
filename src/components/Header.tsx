import { useLogout } from "@/features/auth/hooks/useLogout";
import { useAuthStore } from "@/store/auth-store";

const Header = () => {
  const { user } = useAuthStore((state) => state);

  const logout = useLogout();

  return (
    <div className="h-16 flex items-center justify-end px-8 py-2 border-b border-gray-300">
      <div>{user && <div className="pr-5">{user.email}</div>}</div>
      {user && (
        <button
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
          className="font-bold text-3xl cursor-pointer transform hover:scale-110 origin-center transition-transform duration-100 will-change-transform"
        >
          ⏻
        </button>
      )}
    </div>
  );
};
export default Header;
