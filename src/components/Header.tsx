import { CURRENCIES, type CurrencyCode } from "@/constants/currencies";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useAuthStore } from "@/store/auth-store";
import { useCurrencySymbolStore, useUITheme } from "@/store/ui-store";

interface OwnProps {
  onOpen: () => void;
}

const Header: React.FC<OwnProps> = ({ onOpen }) => {
  const { user } = useAuthStore((state) => state);

  const logout = useLogout();

  const { currency, setCurrency } = useCurrencySymbolStore();
  const { theme, setTheme } = useUITheme();

  return (
    <div className="h-16 flex items-center justify-between px-2 md:px-8 py-2 border-b border-gray-300 dark:bg-neutral-900 dark:border-neutral-700">
      <div className="flex gap-2 items-center">
        <button
          onClick={onOpen}
          className="flex flex-col gap-1.5 p-2 group cursor-pointer md:hidden"
        >
          <div className="w-6 h-0.5 bg-black dark:bg-white dark:group-hover:bg-neutral-200 group-hover:bg-neutral-500 transition-colors duration-200"></div>
          <div className="w-6 h-0.5 bg-black dark:bg-white dark:group-hover:bg-neutral-200 group-hover:bg-neutral-500 transition-colors duration-200"></div>
          <div className="w-6 h-0.5 bg-black dark:bg-white dark:group-hover:bg-neutral-200 group-hover:bg-neutral-500 transition-colors duration-200"></div>
        </button>

        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="cursor-pointer hover:scale-110 hidden md:visible md:block"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
          className="hidden md:visible md:block cursor-pointer border p-1 w-14 md:w-full rounded border-transparent hover:border-neutral-300 dark:border-neutral-700 dark:text-white"
        >
          {CURRENCIES.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-5 items-center dark:text-white">
        <div>{user && <div>{user.email}</div>}</div>
        {user && (
          <button
            onClick={() => logout.mutate()}
            disabled={logout.isPending}
            className="font-bold text-3xl cursor-pointer transform hover:text-neutral-500  dark:hover:text-neutral-300 transition-colors duration-100"
          >
            ⏻
          </button>
        )}
      </div>
    </div>
  );
};
export default Header;
