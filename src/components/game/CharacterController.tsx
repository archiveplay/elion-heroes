import { useRef, useState } from "react"
import { Group } from "three"
import { CapsuleCollider, RapierRigidBody, RigidBody } from "@react-three/rapier"
import { Warior } from "@/components/game/units/Warior"
import { isHost, Joystick, PlayerState } from "playroomkit"
import { CameraControls, Text } from "@react-three/drei"
import { usePlayerMovement } from "@/hooks/game/player/usePlayerMovement"
import { usePlayerTarget } from "@/hooks/game/player/usePlayerTarget"
import { useSaveUnitsRefsToStore } from "@/hooks/store/useSaveUnitsRefsToStore"

interface CharacterControllProps {
  state: PlayerState,
  joystick: Joystick,
  userPlayer: boolean,
  highlight: boolean,
  setTargetId: any
}

export const CharacterControll = ({ state, joystick, userPlayer, highlight, setTargetId, ...props }: CharacterControllProps) => {
  const groupRef = useRef<Group>(null)
  const characterRef = useRef<Group>(null)
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  const controlsRef = useRef<CameraControls>(null)
  const [animation, setAnimation] = useState("Idle")

  const { enemies } = useSaveUnitsRefsToStore({ state, characterRef, rigidBodyRef })

  usePlayerMovement({
    characterRef,
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
    enemies,
    onSetTarget: setTargetId
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
        <group ref={characterRef}>
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
