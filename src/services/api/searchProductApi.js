import axiosInstance from "lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchSearchProducts = async (query, page, limit, category) => {
  const response = await axiosInstance.get(`/products/search`, {
    params: { query, page, limit, category },
  });
  return response.data;
};

export const useSearchProducts = (query, page, limit, category = "") => {
  return useQuery({
    queryKey: ["products/search", query, page, limit, category],
    queryFn: () => fetchSearchProducts(query, page, limit, category),
  });
};
