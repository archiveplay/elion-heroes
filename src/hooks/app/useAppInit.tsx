import { getUser } from "@/api/user";
import { useAppStore } from "@/store";
// import { useEffect } from "react";
// import { useGetUser } from "./useGetUser";

export async function useAppInit() {
  const { setUser, logout } = useAppStore();

  const userData = await getUser();

  console.log('useAppInit', userData)

  return userData;

  // useEffect(() => {
  //   if (isSuccess && user) {
  //     setUser(user);
  //   }
  // }, [isSuccess, user, setUser]);
  //
  // useEffect(() => {
  //   if (isError && error) {
  //     logout();
  //   }
  // }, [isError, error, logout]);
  //
  // return { isLoading, isError, error }
}
