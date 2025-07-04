import { useAnimations, useGLTF } from "@react-three/drei"
import { useEffect, useMemo, useRef } from "react"
import { Group, LoopOnce } from 'three'
import { SkeletonUtils } from "three-stdlib"

interface WariorProps {
  animation: string
}

export const Warior = ({ animation = "Idle" }: WariorProps) => {
  const playerRef = useRef<Group>(null)
  const group = useRef<Group>(null)
  const { scene, animations } = useGLTF('models/warior.glb')

  const { actions } = useAnimations(animations, group);
  const attackAction = actions["Attack"]

  // if (attackAction) {
  //   attackAction.loop = LoopOnce;
  //   attackAction.clampWhenFinished = true;
  // }
  //
  useEffect(() => {
    console.log('animation', animation)

    actions[animation]?.reset().fadeIn(0.2).play();

    return () => { actions[animation]?.fadeOut(0.2) };
  }, [animation]);

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])

  return (
    <group ref={group}>
      <primitive ref={playerRef} object={clone} />
    </group>
  )
}

useGLTF.preload("/models/warior.glb");
