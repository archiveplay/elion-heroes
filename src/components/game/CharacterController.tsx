import { useRef } from "react"
import { Group } from "three"
import { Warior } from "./units/Warior"

interface CharacterControllProps {
  state: {},
  joystic: {},
  userPlayer: {}
}

export const CharacterControll = (
  { state, joystic, userPlayer, ...props }
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
