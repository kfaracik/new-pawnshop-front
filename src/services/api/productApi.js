import axiosInstance from "lib/axiosInstance";
import { versionedApiPath } from "lib/apiPaths";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async (page, limit, category, sort) => {
  const response = await axiosInstance.get(versionedApiPath("products"), {
    params: { page, limit, category, sort: sort || undefined },
  });

  return response.data;
};

export const useProducts = (page, limit, category = "", sort = "") => {
  return useQuery({
    queryKey: ["products", page, limit, category, sort],
    queryFn: () => fetchProducts(page, limit, category, sort),
  });
};
