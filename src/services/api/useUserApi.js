import axiosInstance from "lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { getAuthToken } from "utils/authToken";

const fetchUserData = async () => {
  const response = await axiosInstance.get("/auth/user");

  return response.data;
};

export const useUserData = () => {
  const token = getAuthToken();

  return useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData,
    enabled: !!token,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
