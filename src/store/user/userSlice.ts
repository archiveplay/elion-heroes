import { StateCreator } from 'zustand';
import { User } from "@/types/app/user";

export interface UserSlice {
  // State
  user: User | null;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: User) => void;
  logout: () => void;
}

export const createUserSlice: StateCreator<
  UserSlice,
  [["zustand/immer", never]],
  [],
  UserSlice
> = (set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,

  // Actions
  setUser: (user) =>
    set((state) => {
      state.user = user;
      state.isAuthenticated = true;
    }),

  logout: () =>
    set((state) => {
      state.user = null;
      state.isAuthenticated = false;
    }),
});
