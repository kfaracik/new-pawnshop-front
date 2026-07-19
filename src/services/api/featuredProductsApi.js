import axiosInstance from "lib/axiosInstance";
import { versionedApiPath } from "lib/apiPaths";
import { useQuery } from "@tanstack/react-query";

const fetchFeaturedProducts = async () => {
  const response = await axiosInstance.get(versionedApiPath("products/featured"));
  return response.data;
};

export const useFeaturedProducts = (initialData) => {
  return useQuery({
    queryKey: ["featuredProducts"],
    queryFn: fetchFeaturedProducts,
    retry: 1,
    refetchOnWindowFocus: false,
    initialData: initialData ?? undefined,
  });
};
