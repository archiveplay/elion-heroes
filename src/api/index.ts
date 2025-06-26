import axios from "axios";

import { setupAuthInterceptor } from '@/api/interceptors/authInterceptor';

export const api = axios.create({
  baseURL: import.meta.env.VITE_TWA_API_SERVER,
});

// attach auth interceptor to handle 401/403 and token refresh
setupAuthInterceptor(api);
