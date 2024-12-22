import axios from "axios";

// baseURL: "http://127.0.0.1:8888/api", // develop
// baseURL: "https://new-pawnshop-backend.onrender.com/api", // prod
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
});

export default axiosInstance;
