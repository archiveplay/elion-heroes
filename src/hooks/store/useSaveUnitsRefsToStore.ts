import { useUnitsStore } from "@/store/game/pvpgame";
import { RapierRigidBody } from "@react-three/rapier";
import { myPlayer, PlayerState } from "playroomkit";
import { useEffect, useMemo } from "react";

interface useSaveUnitsRefsToStoreProps {
  state: PlayerState
  rigidBodyRef: React.RefObject<RapierRigidBody>
}

export const useSaveUnitsRefsToStore = ({ state, rigidBodyRef }: useSaveUnitsRefsToStoreProps) => {
  const unitRefs = useUnitsStore(state => state.units)

  const enemyRefs: typeof unitRefs = useMemo(() =>
    Object.keys(unitRefs)
      .filter((id) => id !== myPlayer()?.id)
      .reduce((obj, id) => ({ ...obj, [id]: unitRefs[id] }), {}),
    [unitRefs]);

  // Write all units refs to store
  useEffect(() => {
    useUnitsStore.getState().registerPlayer(state.id, {
      rigidBodyRef,
    })
    return () => {
      useUnitsStore.getState().unregisterPlayer(state.id)
    }
  }, [state.id, rigidBodyRef])

  return { unitRefs, enemyRefs }
}
