import React, { ForwardedRef, useMemo } from "react"
import { Group } from "three"
import { SkeletonUtils } from "three-stdlib"

interface PlayerCharacterProps {
  scene: Group,
}

export const PlayerCharacter = React.forwardRef(({ scene }: PlayerCharacterProps, ref: ForwardedRef<Group>) => {
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])

  return (
    <group ref={ref}>
      <primitive object={clone} />
    </group>
  )
})
