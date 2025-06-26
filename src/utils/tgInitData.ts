import WebApp from "@twa-dev/sdk"

/**
 * Retrieves the Telegram WebApp initialization data from the global context.
 * @returns {string} The initialization data string if available, otherwise mock data.
 */
export function getTelegramInitData(forceMock: boolean = false): string {
  if (forceMock) {
    return getMockInitData();
  }

  const realInitData = WebApp.initData ||
    window.Telegram?.WebApp?.initData;

  if (realInitData) {
    return realInitData;
  }

  return getMockInitData();
}

/**
<<<<<<< HEAD
 * Returns the mock initialization data for Telegram from environment variables.
 * @returns {string} The mock init data string from VITE_TG_INIT_DATA_MOCK.
 */
export function getMockInitData(): string {
  return import.meta.env.VITE_TG_INIT_DATA_MOCK
}
