import { RapierRigidBody, vec3 } from "@react-three/rapier"
import { PlayerState } from "playroomkit"
import { useFrame } from "@react-three/fiber";
import { GamePlayer } from "@/types/game/unit";

interface UsePlayerAttackProps {
  rigidBodyRef: React.RefObject<RapierRigidBody>
  enemies: GamePlayer[]
  setAnimation: (animationName: string) => void
  state: PlayerState,
}

export function usePlayerAttack({ enemies, setAnimation, state }: UsePlayerAttackProps) {
  const attackRange = state.getState("attackRange")
  const targetId = state.getState("targetId")
  const playerPos = state.getState("pos")

  useFrame(() => {
    if (!targetId) return;

    const enemyPos = enemies
      .find(({ state }) => state.id === targetId)
      ?.state
      .getState('pos')

    if (!enemyPos) return

    const inRange = vec3(playerPos).distanceTo(vec3(enemyPos)) <= attackRange

    if (inRange)
      setAnimation("Attack")

    // const playerVec = vec3(playerPos)
    //
    // vec3(rigidBodyRef.current?.translation())
    // vec3(targetRigitBodyRef?.current?.translation())
    //
    // const inRange = playerPos.distanceTo(enemyPos) <= attackRange
    // const canAttack = targetId && inRange
    //
    // if (canAttack) setAnimation("Attack")
    //
    // if (isHost()) {
    //   state.setState("isAttacking", canAttack)
    // } else {
    //   const isAttacking = state.getState("isAttacking")
    //   if (isAttacking) setAnimation("Attack")
    // }
  })
}

