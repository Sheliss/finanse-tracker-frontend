import { CURRENCIES, type CurrencyCode } from "@/constants/currencies";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useAuthStore } from "@/store/auth-store";
import { useCurrencySymbolStore, useUITheme } from "@/store/ui-store";

const Header = () => {
  const { user } = useAuthStore((state) => state);

  const logout = useLogout();

  const { currency, setCurrency } = useCurrencySymbolStore();
  const { theme, setTheme } = useUITheme();

  return (
    <div className="h-16 flex items-center justify-between px-8 py-2 border-b border-gray-300 dark:bg-neutral-900 dark:border-neutral-700">
      <div className="flex gap-5 items-center">
        <div>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="cursor-pointer hover:scale-110"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
          className="cursor-pointer border p-1 rounded border-transparent hover:border-neutral-300 dark:border-neutral-700 dark:text-white"
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
            className="font-bold text-3xl cursor-pointer transform hover:scale-110 origin-center transition-transform duration-100 will-change-transform"
          >
            ⏻
          </button>
        )}
      </div>
    </div>
  );
};
export default Header;
