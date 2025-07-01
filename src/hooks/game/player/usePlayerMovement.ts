import { CameraControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, vec3 } from "@react-three/rapier";
import { isHost, Joystick, PlayerState } from "playroomkit";

interface UsePlayerMovementProps {
  controlsRef: React.RefObject<CameraControls>
  rigidBodyRef: React.RefObject<RapierRigidBody>
  joystick: Joystick,
  setAnimation: (animationName: string) => void
  state: PlayerState
}

/**
 * Custom hook to handle player movement, camera following, and animation state in a 3D environment.
 *
 * This hook:
 * - Updates the camera to follow the player.
 * - Handles player movement and rotation based on joystick input.
 * - Sets the appropriate animation ("Run" or "Idle").
 * - Synchronizes player position in a multiplayer environment.
 */
export function usePlayerMovement({ controlsRef, rigidBodyRef, joystick, setAnimation, state }: UsePlayerMovementProps) {
  useFrame(() => {
    const ms = state.getState("movementSpeed");

    // Update camera to follow the player
    if (controlsRef.current) {
      const cameraDistanceY = window.innerWidth < 1024 ? 20 : 24
      const cameraDistanceZ = window.innerWidth < 1024 ? 20 : 24
      const playerWorldPos = vec3(rigidBodyRef.current?.translation())
      controlsRef.current.setLookAt(
        playerWorldPos.x,
        playerWorldPos.y + cameraDistanceY,
        playerWorldPos.z + cameraDistanceZ,
        playerWorldPos.x,
        playerWorldPos.y + 0.5,
        playerWorldPos.z,
        true
      );
    }

    const angle = joystick.angle()

    // Handle movement and animation based on joystick input
    if (joystick.isJoystickPressed() && angle && rigidBodyRef.current) {
      setAnimation("Run")

      // Set rotation using quaternion (y-axis rotation)
      const quaternion = {
        x: 0,
        y: Math.sin(angle / 2),
        z: 0,
        w: Math.cos(angle / 2)
      }
      rigidBodyRef.current.setRotation(quaternion, true)

      const velocity = {
        x: Math.sin(angle) * ms,
        y: rigidBodyRef.current?.linvel().y || 0,
        z: Math.cos(angle) * ms,
      };

      rigidBodyRef.current?.setLinvel(velocity, true);
    } else {
      setAnimation("Idle")
    }

    // Multiplayer synchronization: host sets position, others receive it
    if (isHost()) {
      state.setState("pos", rigidBodyRef.current?.translation())
    } else {
      const pos = state.getState("pos")
      if (pos)
        rigidBodyRef.current?.setTranslation(pos, true)
    }
  })
}
