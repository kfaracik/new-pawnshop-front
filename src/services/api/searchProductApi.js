import axiosInstance from "lib/axiosInstance";
import { versionedApiPath } from "lib/apiPaths";
import { useQuery } from "@tanstack/react-query";

const fetchSearchProducts = async (query, page, limit, category) => {
  const response = await axiosInstance.get(versionedApiPath("products/search"), {
    params: { query, page, limit, category },
  });
  return response.data;
};

export const useSearchProducts = (query, page, limit, category = "") => {
  const hasSearchInput = Boolean(String(query || "").trim() || category);

  return useQuery({
    queryKey: ["products/search", query, page, limit, category],
    queryFn: () => fetchSearchProducts(query, page, limit, category),
    enabled: hasSearchInput,
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });
};
