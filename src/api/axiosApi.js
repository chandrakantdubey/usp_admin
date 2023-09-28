import axios from "axios";
import { logUserOut } from "src/auth/authUtils";

export const notificationApi = axios.create({
  baseURL: import.meta.env.VITE_NOTIFICATION_BASE_URL,
  withCredentials: true,
});

notificationApi.interceptors.response.use(
  async (response) => {
    if (response.status === 401) {
      await logUserOut();
    }
    return response;
  },
  async (error) => {
    const { response } = error;
    if (response?.status === 401) {
      await logUserOut();
    }
    return Promise.reject(error);
  }
);

export const uspAdminApi = axios.create({
  baseURL: import.meta.env.VITE_USPADMIN_BASE_URL,
  withCredentials: false,
});

export const idApi = axios.create({
  baseURL: import.meta.env.VITE_ID_BASE_URL,
  withCredentials: false,
});
idApi.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";
  return config;
});
