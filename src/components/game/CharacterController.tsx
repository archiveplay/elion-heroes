import { useRef } from "react"
import { Group } from "three"
import { Warior } from "./units/Warior"

interface CharacterControllProps {
  state: {},
  joystic: {},
  userPlayer: {}
  key?: string
}

export const CharacterControll = (
  { state, joystic, userPlayer, key, ...props }
    : CharacterControllProps) => {
  const group = useRef<Group>(null)
  const character = useRef<Group>(null)

  return (
    <group ref={group} {...props}>
      <group ref={character}>
        <Warior />
      </group>
    </group>
  )
}
