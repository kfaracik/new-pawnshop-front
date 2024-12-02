import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:8888/api", // develop
  baseURL: "https://new-pawnshop-backend.onrender.com/api", // prod
  timeout: 10000,
});

export default axiosInstance;
