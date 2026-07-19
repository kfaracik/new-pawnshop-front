import { useQuery } from "@tanstack/react-query";
import axiosInstance from "lib/axiosInstance";
import { versionedApiPath } from "lib/apiPaths";

const fetchCategories = async () => {
  const response = await axiosInstance.get(versionedApiPath("categories"));
  return response.data;
};

export const useCategories = (initialData) =>
  useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
    initialData: initialData ?? undefined,
  });
