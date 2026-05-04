import { useQuery } from "@tanstack/react-query";
import axiosInstance from "lib/axiosInstance";

const fetchLocations = async () => {
  const response = await axiosInstance.get("/locations");
  return Array.isArray(response.data) ? response.data : [];
};

export const useLocations = () =>
  useQuery({
    queryKey: ["locations"],
    queryFn: fetchLocations,
    staleTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
