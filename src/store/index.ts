import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createUserSlice, UserSlice } from '@/store/user/userSlice'

export type AppStore = UserSlice

const store = create<AppStore>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createUserSlice(...a),
      })),
      {
        name: 'game-store',
        partialize: (state) => ({
          // save to localStorage
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: 'GameStore' }
  )
);

const useAppStore = store;

export type { Position, Unit, User } from '@/types'
export { useAppStore, store }


