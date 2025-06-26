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
 * Generates mock Telegram WebApp initialization data for testing purposes.
 * @returns {string} The mock initialization data as a URL-encoded string.
 */
export function getMockInitData(): string {
  const mockData = {
    user: JSON.stringify({
      id: 123456789,
      first_name: "Test",
      last_name: "User",
      username: "testuser",
      language_code: "en"
    }),
    chat_instance: "test_chat_instance",
    chat_type: "private",
    auth_date: Math.floor(Date.now() / 1000) + '',
    hash: "mock_hash"
  };

  return new URLSearchParams(mockData).toString();
}
