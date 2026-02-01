import axios, { AxiosInstance } from "axios";
import { config } from "./config";
import { useAuthStore } from "./store/authStore";

let apiClient: AxiosInstance;

export const initializeApiClient = (): AxiosInstance => {
  apiClient = axios.create({
    baseURL: config.baseURL,
    timeout: 30000,
  });

  // Add request interceptor to attach token dynamically
  apiClient.interceptors.request.use(
    (requestConfig) => {
      const authStore = useAuthStore.getState(); // Get current token from store
      const token = authStore.token;

      console.log("Token from store:", token); // Debug

      if (token) {
        requestConfig.headers.Authorization = `Bearer ${token}`;
      }

      return requestConfig;
    },
    (error) => Promise.reject(error),
  );

  // Response interceptor for 401 handling
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error("Unauthorized - token may be expired");
        const authStore = useAuthStore.getState();
        authStore.logout(); // Clear auth state
      }
      return Promise.reject(error);
    },
  );

  return apiClient;
};

export const getApiClient = (): AxiosInstance => {
  if (!apiClient) {
    initializeApiClient();
  }
  return apiClient;
};

// export default apiClient;
