import { useQuery } from "@tanstack/react-query";
import axiosInstance from "lib/axiosInstance";
import axios from "axios";

const fetchLocations = async () => {
  try {
    const response = await axiosInstance.get("/locations");
    return Array.isArray(response.data) ? response.data : [];
  } catch (primaryError) {
    try {
      const response = await axiosInstance.get("/v1/locations");
      return Array.isArray(response.data) ? response.data : [];
    } catch (secondaryError) {
      const isLocalDev =
        typeof window !== "undefined" &&
        ["localhost", "127.0.0.1"].includes(window.location.hostname);

      if (!isLocalDev) {
        throw secondaryError;
      }

      const fallbackResponse = await axios.get("http://localhost:8888/api/locations", {
        timeout: 10000,
      });

      return Array.isArray(fallbackResponse.data) ? fallbackResponse.data : [];
    }
  }
};

export const useLocations = () =>
  useQuery({
    queryKey: ["locations"],
    queryFn: fetchLocations,
    staleTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
