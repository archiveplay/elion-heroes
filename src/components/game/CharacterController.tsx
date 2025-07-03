import { useRef, useState } from "react"
import { Group } from "three"
import { CapsuleCollider, RapierRigidBody, RigidBody } from "@react-three/rapier"
import { isHost, Joystick, PlayerState } from "playroomkit"
import { CameraControls, Text, useAnimations, useGLTF } from "@react-three/drei"
import { usePlayerMovement } from "@/hooks/game/player/usePlayerMovement"
import { usePlayerTarget } from "@/hooks/game/player/usePlayerTarget"
import { useSaveUnitsRefsToStore } from "@/hooks/store/useSaveUnitsRefsToStore"
import { usePlayerAttack } from "@/hooks/game/player/usePlayerAttack"
import { PlayerCharacter } from "./units/PlayerCharacter"
import { useMovementAnimation } from "@/hooks/game/player/useMovementAnimation"

interface CharacterControllProps {
  state: PlayerState,
  joystick: Joystick,
  userPlayer: boolean,
  highlight: boolean,
  setTargetId: any,
  targetId?: string
}

export const CharacterControll = ({ state, joystick, userPlayer, highlight, setTargetId, targetId, ...props }: CharacterControllProps) => {
  const { scene, animations } = useGLTF('models/warior.glb')
  const groupRef = useRef<Group>(null)
  const characterRef = useRef<Group>(null)
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  const controlsRef = useRef<CameraControls>(null)
  const [animation, setAnimation] = useState("Idle")

  const { actions } = useAnimations(animations, characterRef);
  const attackAction = actions['Attack'];

  const { enemies } = useSaveUnitsRefsToStore({ state, rigidBodyRef })

  usePlayerMovement({
    controlsRef,
    rigidBodyRef,
    joystick,
    state,
    isCombatMode: !!targetId,
    setAnimation
  })
  useMovementAnimation({
    animation,
    actions
  })

  usePlayerTarget({
    userPlayer,
    joystick,
    rigidBodyRef,
    enemies,
    onSetTarget: setTargetId
  })

  // usePlayerAttack({
  //   userPlayer,
  //   rigidBodyRef,
  //   attackAction,
  //   range: state.getState("attackRange"),
  //   hitTime: 0.5,
  //   target: enemies[targetId!]?.rigidBodyRef,
  //   state
  // })

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
          <PlayerCharacter ref={characterRef} scene={scene} />

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
