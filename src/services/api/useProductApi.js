import { useQuery } from "@tanstack/react-query";
import axiosInstance from "lib/axiosInstance";

export const fetchProductById = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);

  return response.data;
};

export const useProduct = (id) => {
  return useQuery({
    enabled: !!id,
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    staleTime: 1000 * 60 * 5,
  });
};
