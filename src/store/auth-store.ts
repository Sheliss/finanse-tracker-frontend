import { create } from "zustand";

export type User = {
  id: string;
  email: string;
};

type AuthStore = {
  user: User | null;
  isInitialized: boolean;

  setUser: (user: User | null) => void;
  setIsInitialized: (isInitialized: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isInitialized: false,
  setUser: (user) => set({ user }),
  setIsInitialized: (isInitialized) => set({ isInitialized }),
}));
