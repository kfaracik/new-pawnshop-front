import { useQuery } from "@tanstack/react-query";
import axiosInstance from "lib/axiosInstance";

const fetchProductById = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);

  console.log({ response });
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
