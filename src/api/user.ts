import { api } from "@/api"
import { User } from "@/types"
import { getTelegramInitData } from "@/utils/tgInitData";

const TAG = '[user]'

// TODO: midleware для auth/with initData
export async function authUser(forceMock: boolean = false): Promise<boolean> {
  const initData = getTelegramInitData(forceMock);

  console.log('initData', initData);
  try {
    const response = await api.post("/auth", { initData });
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
  const initData = getTelegramInitData();
  const headers: Record<string, string> = {};

  const token = localStorage.getItem("token");
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  headers['X-Telegram-InitData'] = initData;

  try {
    const response = await api.get("/profile", { headers });
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
