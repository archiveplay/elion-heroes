import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Vector3 } from "three"
import { RapierRigidBody } from "@react-three/rapier"
import { LoopOnce, AnimationAction, AnimationMixerEventMap } from "three"
import { isHost, PlayerState } from "playroomkit"

// import { useLookAtTarget } from "./useLookAtTarget"
interface UsePlayerAttackProps {
  userPlayer: boolean
  rigidBodyRef: React.RefObject<RapierRigidBody>
  target?: React.RefObject<RapierRigidBody> | null
  hitTime?: number
  onHit?: () => void
  range: number
  attackAction: AnimationAction | null
  state: PlayerState
}

export function usePlayerAttack({
  userPlayer,
  rigidBodyRef,
  target,
  hitTime = 0.5,
  onHit,
  range,
  attackAction,
  state
}: UsePlayerAttackProps) {
  const duration = useRef(0)
  const startTime = useRef(0)
  const hasHit = useRef(false)

  const attackerPosition = new Vector3()
  const targetPosition = new Vector3()

  // === 1) Локальный игрок вычисляет дистанцию и пишет isAttacking ===
  useFrame(() => {
    if (!rigidBodyRef.current || !target || !userPlayer) return

    const attacker = rigidBodyRef.current
    const enemy = target.current
    if (!enemy) return

    attackerPosition.copy(attacker.translation())
    targetPosition.copy(enemy.translation())

    const dist = attackerPosition.distanceTo(targetPosition)

    if (isHost()) {
      state.setState("isAttacking", dist <= range)
    }
  })

  // === 2) Все игроки слушают состояние и запускают анимацию ===
  const isAttacking = state.getState("isAttacking")

  useEffect(() => {
    if (!attackAction || !isAttacking) return

    const mixer = attackAction.getMixer()
    const clip = attackAction.getClip()

    duration.current = clip.duration / (attackAction.timeScale || 1)
    startTime.current = performance.now()
    hasHit.current = false

    attackAction.clampWhenFinished = true
    attackAction.reset().setLoop(LoopOnce, 1).play()

    const handleFinished = (e: AnimationMixerEventMap["finished"]) => {
      if (e.action !== attackAction) return

      // Если атакуем — зацикливаем снова
      if (state.getState("isAttacking")) {
        attackAction.reset().play()
        startTime.current = performance.now()
        hasHit.current = false
      }
    }

    mixer.addEventListener("finished", handleFinished)

    return () => {
      mixer.removeEventListener("finished", handleFinished)
      attackAction.stop()
    }
  }, [isAttacking, attackAction])

  // === 3) Только локальный игрок вызывает onHit ===
  useFrame(() => {
    if (!isAttacking || !attackAction || hasHit.current || !userPlayer) return

    const elapsed = (performance.now() - startTime.current) / 1000
    const hitThreshold = duration.current * hitTime

    if (elapsed >= hitThreshold) {
      onHit?.()
      hasHit.current = true
    }
  })
}

