import { AppStore } from "@/store";

// selectors for the user
export const selectUser = (state: AppStore) => state.user
export const selectUserPlayer = (state: AppStore) => state.user?.player
