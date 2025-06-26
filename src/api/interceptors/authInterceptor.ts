import { AxiosInstance } from "axios";
import { authUser } from "@/api/user";

const TAG = '[authInterceptor]';
let isAuthenticating = false;

export function setupAuthInterceptor(api: AxiosInstance) {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        (error.response?.status === 401 || error.response?.status === 403) &&
        originalRequest.url?.includes('/profile') &&
        !originalRequest._retry &&
        !isAuthenticating
      ) {
        originalRequest._retry = true;
        isAuthenticating = true;

        try {
          console.info(`${TAG}: Received ${error.response.status}, attempting re-authentication`);

          const authSuccess = await authUser();

          if (authSuccess) {
            const token = localStorage.getItem("token");
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }

            console.info(`${TAG}: Re-authentication successful, retrying original request`);
            return api(originalRequest);
          }
        } catch (authError) {
          console.error(`${TAG}: Re-authentication failed`, authError);
        } finally {
          isAuthenticating = false;
        }
      }

      return Promise.reject(error);
    }
  );
}


