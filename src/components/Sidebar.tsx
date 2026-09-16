import { useLocation, useNavigate } from "react-router-dom";
import SidebarButton from "./SidebarButton";
import { useCurrencySymbolStore, useUITheme } from "@/store/ui-store";
import { CURRENCIES, type CurrencyCode } from "@/constants/currencies";

interface OwnProps {
  onClose: () => void;
}

const Sidebar: React.FC<OwnProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const currentRoute = useLocation();

  const { currency, setCurrency } = useCurrencySymbolStore();
  const { theme, setTheme } = useUITheme();

  return (
    <div className=" bg-neutral-900 dark:bg-neutral-950 flex flex-col col-span-2 h-screen">
      <div className="h-16 px-6 md:px-12 mb-4 font-bold text-xl text-white justify-between flex items-center border-b border-neutral-800">
        Finanse Tracker
        <button
          onClick={onClose}
          className="text-white hover:text-neutral-300 text-3xl cursor-pointer font-semibold focus:outline-none md:hidden"
        >
          &times;
        </button>
      </div>
      <SidebarButton
        isActive={currentRoute.pathname === "/"}
        onClick={() => navigate("/")}
      >
        Dashboard
      </SidebarButton>
      <SidebarButton
        isActive={currentRoute.pathname === "/expenses"}
        onClick={() => navigate("/expenses")}
      >
        Transactions
      </SidebarButton>
      <div className="flex gap-2 items-center mx-auto">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="cursor-pointer hover:scale-110 visible md:hidden"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
          className="visible md:hidden cursor-pointer border p-1 rounded hover:border-neutral-300 border-neutral-700 text-white"
        >
          {CURRENCIES.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default Sidebar;
