import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createUserSlice, UserSlice } from '@/store/user/userSlice'

export type GameStore = UserSlice

const store = create<GameStore>()(
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

const useGameStore = store;

export type { Position, Unit, User } from '@/types'
export { useGameStore, store }


