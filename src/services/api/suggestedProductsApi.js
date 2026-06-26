import axiosInstance from "lib/axiosInstance";
import { versionedApiPath } from "lib/apiPaths";
import { useQuery } from "@tanstack/react-query";

const fetchSuggestedProducts = async () => {
  const response = await axiosInstance.get(versionedApiPath("products/suggested"));
  return response.data;
};

export const useSuggestedProducts = () => {
  return useQuery({
    queryKey: ["suggestedProducts"],
    queryFn: fetchSuggestedProducts,
  });
};
