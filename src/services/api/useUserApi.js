import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchUserData = async () => {
  const response = await axios.get("/api/auth/user");

  return response.data;
};

export const useUserData = () => {
  return useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
