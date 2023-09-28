import axios from "axios";
import { logUserOut } from "src/auth/authUtils";
import { getToken } from "src/auth/getToken";
import { UNAUTHORIZED_USER } from "src/constants/statusCodes";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SOCKET_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";
  return config;
});

axiosInstance.interceptors.response.use(
  async (response) => {
    if (response.status === UNAUTHORIZED_USER) {
      await logUserOut();
    }
    return response;
  },
  async (error) => {
    const { response } = error;
    if (response?.status === UNAUTHORIZED_USER) {
      await logUserOut();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
