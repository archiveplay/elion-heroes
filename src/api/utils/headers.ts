import { AxiosInstance } from "axios";
import { getTelegramInitData } from "@/utils/tgInitData";

/**
 * Attach the Telegram InitData header to all requests made by this Axios instance.
 *
 * @param api - Existing Axios instance
 * @param forceMock - If true, mock init data will be used
 * @returns The same Axios instance with the InitData header set
 */
export function withInitDataHeader(api: AxiosInstance, forceMock: boolean = false): AxiosInstance {
  const initData = getTelegramInitData(forceMock);
  Object.assign(api.defaults.headers, {
    'X-Telegram-InitData': initData,
  });
  return api;
}

/**
 * Attach the Authorization header to all requests made by this Axios instance.
 *
 * @param api - Existing Axios instance
 * @returns The same Axios instance with the Authorization header set (if token found)
 */
export function withAuthHeader(api: AxiosInstance): AxiosInstance {
  const token = localStorage.getItem("token");
  if (token) {
    Object.assign(api.defaults.headers, {
      Authorization: `Bearer ${token}`,
    });
  }
  return api;
}

