import { useQuery } from "@tanstack/react-query";
import axiosInstance from "lib/axiosInstance";

const fetchProductById = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);

  return response.data;
};

export const fetchProductsByIds = async (ids) => {
  const responses = await Promise.allSettled(
    ids.map(async (id) => {
      const response = await axiosInstance.get(`/products/${id}`);
      return response.data;
    })
  );

  return responses
    .map((result) => (result.status === "fulfilled" ? result.value : null))
    .filter(Boolean);
};

export const useProduct = (id, initialData) => {
  return useQuery({
    enabled: !!id,
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    initialData,
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
