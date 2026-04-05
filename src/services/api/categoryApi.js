import { useQuery } from "@tanstack/react-query";
import axiosInstance from "lib/axiosInstance";

const fetchCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10,
  });
