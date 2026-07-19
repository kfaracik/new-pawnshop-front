import axiosInstance from "lib/axiosInstance";
import { versionedApiPath } from "lib/apiPaths";
import { useQuery } from "@tanstack/react-query";

const fetchPopularProducts = async () => {
  const response = await axiosInstance.get(versionedApiPath("products/popular"));
  return response.data;
};

export const usePopularProducts = (initialData) => {
  return useQuery({
    queryKey: ["popularProducts"],
    queryFn: fetchPopularProducts,
    retry: 1,
    refetchOnWindowFocus: false,
    initialData: initialData ?? undefined,
  });
};
