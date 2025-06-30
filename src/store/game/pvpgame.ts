import { UnitRefs } from '@/types/game/unit'
import { create } from 'zustand'
import { immer } from "zustand/middleware/immer"

export interface PlayersState {
  units: Record<string, UnitRefs> // { id: UnitRefs}
  registerPlayer: (id: string, refs: UnitRefs) => void
  unregisterPlayer: (id: string) => void
}


export const useUnitsStore = create<PlayersState>()(
  immer((set) => ({
    units: {},

    registerPlayer: (id, refs) =>
      set((state) => {
        state.units[id] = refs
      }),

    unregisterPlayer: (id) =>
      set((state) => {
        delete state.units[id]
      }),
  }))
)


