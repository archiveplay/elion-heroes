import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useGetUser } from "./useGetUser";

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
