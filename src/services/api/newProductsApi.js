import axiosInstance from "lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async () => {
  const response = await axiosInstance.get(`/newProducts`);
  return response.data;
};

export const useNewProducts = () => {
  return useQuery({
    queryKey: ["newProducts"],
    queryFn: () => fetchProducts(),
  });
};