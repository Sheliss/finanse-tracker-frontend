import type { CurrencyCode } from "@/constants/currencies";
import type { UITheme } from "@/constants/themes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIStore {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: false,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

interface UIthemeStore {
  theme: UITheme;
  setTheme: (theme: UITheme) => void;
}

export const useUITheme = create<UIthemeStore>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
    },
  ),
);

interface CurrencySymbolStore {
  currency: CurrencyCode;
  setCurrency: (symbol: CurrencyCode) => void;
}

export const useCurrencySymbolStore = create<CurrencySymbolStore>()(
  persist(
    (set) => ({
      currency: "USD",

      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: "currency-storage",
    },
  ),
);
