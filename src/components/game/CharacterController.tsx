import { useRef, useState } from "react"
import { Group } from "three"
import { CapsuleCollider, RapierRigidBody, RigidBody } from "@react-three/rapier"
import { Warior } from "@/components/game/units/Warior"
import { isHost, Joystick, myPlayer, PlayerState } from "playroomkit"
import { CameraControls, Text } from "@react-three/drei"
import { usePlayerMovement } from "@/hooks/game/player/usePlayerMovement"
import { usePlayerTarget } from "@/hooks/game/player/usePlayerTarget"
import { useSaveUnitsRefsToStore } from "@/hooks/store/useSaveUnitsRefsToStore"
import { usePlayerAttack } from "@/hooks/game/player/usePlayerAttack"
import { GamePlayer } from "@/types/game/unit"

interface CharacterControllProps {
  state: PlayerState,
  players: GamePlayer[]
  joystick: Joystick,
  userPlayer: boolean,
  highlight: boolean,
  setTargetId: any,
  targetId?: string
}

export const CharacterControll = ({ state, players, joystick, userPlayer, highlight, setTargetId, targetId, ...props }: CharacterControllProps) => {
  const groupRef = useRef<Group>(null)
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  const controlsRef = useRef<CameraControls>(null)
  const [animation, setAnimation] = useState("Idle")

  const { enemyRefs } = useSaveUnitsRefsToStore({ state, rigidBodyRef })

  const enemies = players
    .filter(({ state }) =>
      state.id !== myPlayer().id)

  usePlayerMovement({
    controlsRef,
    rigidBodyRef,
    joystick,
    state,
    setAnimation
  })

  usePlayerTarget({
    userPlayer,
    joystick,
    setAnimation,
    rigidBodyRef,
    enemies: enemyRefs,
    onSetTarget: (targetId) => {
      // change target for local state
      setTargetId(targetId)
      state.setState("targetId", targetId)
    }
  })

  usePlayerAttack({
    rigidBodyRef,
    state,
    enemies,
    setAnimation,
  })

  return (
    <group {...props} ref={groupRef}>
      {
        userPlayer && (<CameraControls ref={controlsRef} />)
      }
      <RigidBody
        ref={rigidBodyRef}
        colliders={false}
        linearDamping={12}
        lockRotations
        type={isHost() ? "dynamic" : "kinematicPosition"}
      >
        <group>
          {/* charater model */}
          <Warior animation={animation} />

          {/* highlight targe unit */}
          {highlight && (
            <pointLight color="yellow" intensity={1} distance={5} />
          )}

          {/* HP bar */}
          <Text
            position={[0, 2.5, 0]}
            fontSize={0.3}
            color="red"
            anchorX="center"
            anchorY="middle"
          >
            {`${100}/${100}`}
          </Text>
        </group>
        <CapsuleCollider args={[0.7, 0.6]} position={[0, 1.28, 0]} />
      </RigidBody>
    </group>
  )
}
