import { useRef, useState } from "react"
import { Group } from "three"
import { CapsuleCollider, RapierRigidBody, RigidBody } from "@react-three/rapier"
import { Warior } from "@/components/game/units/Warior"
import { isHost, Joystick, PlayerState } from "playroomkit"
import { CameraControls } from "@react-three/drei"
import { usePlayerMovement } from "@/hooks/game/player/usePlayerMovement"

interface CharacterControllProps {
  state: PlayerState,
  joystick: Joystick,
  userPlayer: boolean
}

export const CharacterControll = ({ state, joystick, userPlayer, ...props }: CharacterControllProps) => {
  const groupRef = useRef<Group>(null)
  const characterRef = useRef<Group>(null)
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  const controlsRef = useRef<CameraControls>(null)
  const [animation, setAnimation] = useState("Idle")

  usePlayerMovement({
    characterRef,
    controlsRef,
    rigidBodyRef,
    joystick,
    state,
    setAnimation
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
          <Warior animation={animation} />
        </group>
        <CapsuleCollider args={[0.7, 0.6]} position={[0, 1.28, 0]} />
      </RigidBody>
    </group>
  )
}
