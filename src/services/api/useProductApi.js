import { useQuery } from "@tanstack/react-query";
import axiosInstance from "lib/axiosInstance";

const fetchProductById = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);

  return response.data;
};

export const fetchProductsByIds = async (ids) => {
  const responses = await Promise.all(
    ids.map((id) => axiosInstance.get(`/products/${id}`))
  );

  return responses.map(({ data }) => data);
};

export const useProduct = (id) => {
  return useQuery({
    enabled: !!id,
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    staleTime: 1000 * 60 * 5,
  });
};

export const useProducts = (ids) => {
  return useQuery({
    enabled: ids.length > 0,
    queryKey: ["products", ids],
    queryFn: () => fetchProductsByIds(ids),
    staleTime: 1000 * 60 * 5,
  });
};
