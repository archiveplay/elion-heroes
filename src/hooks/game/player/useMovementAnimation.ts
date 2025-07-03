import { useEffect, useRef } from "react";
import { AnimationAction } from "three";

type UseMovementAnimationProps = {
  animation: string; // например, "Idle", "Run", "Attack"
  actions: Record<string, AnimationAction | null>;
};

export function useMovementAnimation({ animation, actions }: UseMovementAnimationProps) {
  const prevAction = useRef<AnimationAction | null>(null);

  useEffect(() => {
    const nextAction = actions[animation];
    if (!nextAction) return;

    if (prevAction.current !== nextAction) {
      prevAction.current?.fadeOut(0.2);
      nextAction.reset().fadeIn(0.2).play();
      prevAction.current = nextAction;
    }
  }, [animation, actions]);
}
