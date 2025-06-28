import { Player } from "@/types/app/user";
import { PlayerState } from "playroomkit";

/**
 * Updates the player's state in the game.
 *
 * @param state - The player state object to update (e.g., from playroomkit).
 * @param player - The player data source (e.g., from zustand or other store).
 */
export const updatePlayerState = (state: PlayerState, player: Player) => {
  state.setState("health", player?.maxHealth);
  state.setState("attackRange", player?.attackRange);
  state.setState("movementSpeed", player?.movementSpeed);
  state.setState("attackSpeed", player?.attackSpeed);
  state.setState("damage", player?.damage);
}
