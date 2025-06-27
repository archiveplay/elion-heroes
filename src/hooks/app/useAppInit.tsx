import { useEffect } from "react";
import { useAppStore } from "@/store";
import { useGetUser } from "@/hooks/app/useGetUser";

/**
 * Custom React hook to initialize the application user state.
 *
 * - Fetches the current user using `useGetUser`.
 * - Sets the user in the app store on successful fetch.
 * - Logs out the user if an error occurs during fetch.
 *
 */
export function useAppInit() {
  const { setUser, logout } = useAppStore();

  const { isLoading, isError, error, data: user, isSuccess } = useGetUser();

  useEffect(() => {
    if (isSuccess && user) {
      setUser(user);
    }
  }, [isSuccess, user, setUser]);

  useEffect(() => {
    if (isError && error) {
      logout();
    }
  }, [isError, error, logout]);

  return { isLoading, isError, error }
}
