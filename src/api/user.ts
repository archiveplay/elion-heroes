import { api } from "@/api"
import { User } from "@/types"
import { withAuthHeader, withInitDataHeader } from "@/api/utils/headers"

const TAG = '[user]'

export async function authUser(forceMock: boolean = false): Promise<boolean> {
  try {
    const response = await withInitDataHeader(api, forceMock).post("/auth");
    const { token } = response.data;

    if (token) {
      localStorage.setItem("token", token);
      console.info(`${TAG}: Authentication successful`);
      return true;
    }
  } catch (err) {
    console.error(`${TAG}: Auth failed`, err);
  }

  return false;
}

export async function getUser(): Promise<User> {
  try {
    const response = await
      withInitDataHeader(
        withAuthHeader(api)
      ).get("/profile");

    console.info(`${TAG}: get user data`, response.data);

    if (!response.data) {
      console.error(`${TAG}: cannot get user data - empty response`);
      throw new Error('Empty user data received');
    }

    return response.data;
  } catch (error) {
    console.error(`${TAG}: failed to get user data`, error);
    throw error;
  }
}
