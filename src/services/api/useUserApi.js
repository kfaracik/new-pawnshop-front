import axiosInstance from "lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

const fetchUserData = async () => {
  const token = Cookies.get("authToken");

  if (!token) {
    throw new Error("No token found");
  }

  const response = await axiosInstance.get("/auth/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const useUserData = () => {
  return useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData,
  });
};
