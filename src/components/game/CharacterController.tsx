import { useRef, useState } from "react"
import { Group } from "three"
import { CapsuleCollider, RapierRigidBody, RigidBody, vec3 } from "@react-three/rapier"
import { Warior } from "@/components/game/units/Warior"
import { useFrame } from "@react-three/fiber"
import { isHost, Joystick, PlayerState } from "playroomkit"
import { CameraControls } from "@react-three/drei"

interface CharacterControllProps {
  state: PlayerState,
  joystic: Joystick,
  userPlayer: boolean
}

export const CharacterControll = ({ state, joystic, userPlayer, ...props }: CharacterControllProps) => {
  const groupRef = useRef<Group>(null)
  const characterRef = useRef<Group>(null)
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  const controlsRef = useRef<CameraControls>(null)
  const [animation, setAnimation] = useState("Idle")
  const ms = state.getState("movementSpeed");

  useFrame((_, delta) => {

    if (controlsRef.current) {
      const cameraDistanceY = window.innerWidth < 1024 ? 20 : 24
      const cameraDistanceZ = window.innerWidth < 1024 ? 20 : 24
      const playerWorldPos = vec3(rigidBodyRef.current?.translation())
      controlsRef.current.setLookAt(
        playerWorldPos.x,
        playerWorldPos.y + cameraDistanceY,
        playerWorldPos.z + cameraDistanceZ,
        playerWorldPos.x,
        playerWorldPos.y + 0.5,
        playerWorldPos.z,
        true
      );
    }

    const angle = joystic.angle()

    if (joystic.isJoystickPressed() && angle && characterRef.current) {
      setAnimation("Run")
      characterRef.current.rotation.y = angle

      const velocity = {
        x: Math.sin(angle) * ms,
        y: rigidBodyRef.current?.linvel().y || 0,
        z: Math.cos(angle) * ms,
      };

      rigidBodyRef.current?.setLinvel(velocity, true);
    } else {
      setAnimation("Idle")
    }

    if (isHost()) {
      state.setState("pos", rigidBodyRef.current?.translation())
    } else {
      const pos = state.getState("pos")
      if (pos)
        rigidBodyRef.current?.setTranslation(pos, true)
    }
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
