import axiosInstance from "lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchSearchProducts = async (query, page, limit) => {
  const response = await axiosInstance.get(`/products/search`, {
    params: { query, page, limit },
  });
  return response.data;
};

export const useSearchProducts = (query, page, limit) => {
  return useQuery({
    queryKey: ["products/search", query, page, limit],
    queryFn: () => fetchSearchProducts(query, page, limit),
  });
};
