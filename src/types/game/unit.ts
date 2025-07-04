import { Joystick, PlayerState } from "playroomkit"
import { RefObject } from "react"
import { RapierRigidBody } from "@react-three/rapier"

export interface Position {
  x: number
  z: number
}

// Required fields for all game units
export interface Unit {
}

export interface GamePlayer {
  state: PlayerState,
  joystick: Joystick
}

export interface UnitRefs {
  rigidBodyRef: RefObject<RapierRigidBody>
}

