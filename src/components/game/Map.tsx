import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"
import { Mesh } from 'three'

export const Map = () => {
  const map = useGLTF("models/map.glb")
  console.log('map', map)

  useEffect(() => {
    map.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  })

  return (
    <primitive object={map.scene} />
  )
}

useGLTF.preload("models/map.glb")
