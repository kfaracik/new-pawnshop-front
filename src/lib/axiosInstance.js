import axios from "axios";
import { clearAuthToken, getAuthToken } from "utils/authToken";

// baseURL: "http://127.0.0.1:8888/api", // develop
// baseURL: "https://new-pawnshop-backend.onrender.com/api", // prod
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthToken();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
