import type { CurrencyCode } from "@/constants/currencies";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIStore {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

interface CurrencySymbolStore {
  currency: CurrencyCode;
  setCurrency: (symbol: CurrencyCode) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: false,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

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
