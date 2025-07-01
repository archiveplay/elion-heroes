import { UnitRefs } from "@/types/game/unit";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, vec3 } from "@react-three/rapier";
import { Joystick } from "playroomkit";
import { useRef } from "react";
import { Vector3 } from "three";

interface UsePlayerTargetProps {
  userPlayer: boolean,
  joystick: Joystick,
  setAnimation: (animationName: string) => void,
  rigidBodyRef: React.RefObject<RapierRigidBody>
  enemies: Record<string, UnitRefs>,
  onSetTarget: (id: string) => void
}

const CHANGE_RATE = 300

export function usePlayerTarget({ userPlayer, joystick, setAnimation, rigidBodyRef, enemies, onSetTarget }: UsePlayerTargetProps) {
  const lastPress = useRef(0)
  const targetIndex = useRef(0)

  useFrame(() => {
    if (joystick.isPressed("next-target") && userPlayer) {
      if (Date.now() - lastPress.current > CHANGE_RATE) {
        lastPress.current = Date.now()
        // setAnimation("Combat")

        const playerWorldPos = vec3(rigidBodyRef.current?.translation())
        if (!playerWorldPos) return

        const sortedEnemies = Object.entries(enemies)
          .map(([id, enemy]) => {
            const pos = vec3(enemy.rigidBodyRef.current?.translation())
            if (!pos) return null

            const dist = new Vector3(playerWorldPos.x, playerWorldPos.y, playerWorldPos.z)
              .distanceTo(new Vector3(pos.x, pos.y, pos.z))
            return { enemy, dist, id }
          })
          .filter(Boolean)
          .sort((a, b) => a!.dist - b!.dist)

        if (sortedEnemies.length === 0) {
          console.info("no target enemies")
          return
        }

        if (targetIndex.current >= sortedEnemies.length) {
          targetIndex.current = 0
        }

        const nextTarget = sortedEnemies[targetIndex.current]
        targetIndex.current += 1

        if (!nextTarget?.id) return

        onSetTarget(nextTarget.id)
      }
    }
  })
}
