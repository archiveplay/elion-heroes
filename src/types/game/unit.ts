import { Joystick, PlayerState } from "playroomkit"

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
