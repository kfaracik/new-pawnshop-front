import axiosInstance from "lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async (page, limit, category) => {
  const response = await axiosInstance.get(`/products`, {
    params: { page, limit, category },
  });

  return response.data;
};

export const useProducts = (page, limit, category = "") => {
  return useQuery({
    queryKey: ["products", page, limit, category],
    queryFn: () => fetchProducts(page, limit, category),
  });
};
