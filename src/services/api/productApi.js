import axiosInstance from "lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async (page, limit) => {
  const response = await axiosInstance.get(`/products`, {
    params: { page, limit },
  });
  return response.data;
};

export const useProducts = (page, limit) => {
  return useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => fetchProducts(page, limit),
  });
};
