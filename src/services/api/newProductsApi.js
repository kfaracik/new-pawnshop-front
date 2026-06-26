import axiosInstance from "lib/axiosInstance";
import { versionedApiPath } from "lib/apiPaths";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async () => {
  const response = await axiosInstance.get(versionedApiPath("products/new"));
  return response.data;
};

export const useNewProducts = () => {
  return useQuery({
    queryKey: ["newProducts"],
    queryFn: () => fetchProducts(),
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
