import { Text, useGLTF } from "@react-three/drei"
import { useMemo, useRef } from "react"
import { Group } from 'three'
import { SkeletonUtils } from "three-stdlib"

export const Warior = () => {
  const playerRef = useRef<Group>(null)
  const { scene, animations } = useGLTF('models/warior.glb')

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])

  return (
    <group>
      <primitive ref={playerRef} object={clone} position={[0, 0.5, 0]} rotation={[0, 0, 0]} />

      {/* HP бар */}
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
  )
}
