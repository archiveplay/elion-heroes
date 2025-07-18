import { Environment, OrbitControls, SoftShadows } from "@react-three/drei";
import { Map } from "@/components/game/Map";
import { Canvas } from "@react-three/fiber";
import { PvPGameMode } from "./modes/PvPGameMode";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";

// TODO: Дальше селектить Map и GameMode
export function Game() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas shadows camera={{ position: [0, 30, 0], fov: 30 }}>
        <SoftShadows size={42} />
        <Suspense>
          <Physics>
            <directionalLight
              position={[25, 18, -25]}
              intensity={0.3}
              castShadow
              shadow-camera-near={0}
              shadow-camera-far={80}
              shadow-camera-left={-30}
              shadow-camera-right={30}
              shadow-camera-top={25}
              shadow-camera-bottom={-25}
              shadow-mapSize-width={4096}
              shadow-mapSize-height={4096}
              shadow-bias={-0.0001}
            />
            <Map />
            <PvPGameMode />
            <Environment preset="sunset" />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  )
}

