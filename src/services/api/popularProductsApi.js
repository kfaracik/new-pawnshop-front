import axiosInstance from "lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchPopularProducts = async () => {
  const response = await axiosInstance.get("products/popular");
  return response.data;
};

export const usePopularProducts = () => {
  return useQuery({
    queryKey: ["popularProducts"],
    queryFn: fetchPopularProducts,
  });
};
