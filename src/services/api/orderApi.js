import { useQuery } from "@tanstack/react-query";
import axiosInstance from "lib/axiosInstance";
import { getAuthToken } from "utils/authToken";

export const createOrder = async ({
  name,
  email,
  city,
  postalCode,
  streetAddress,
  country,
  products,
}) => {
  const response = await axiosInstance.post("/v1/orders", {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    products,
  });

  return response.data;
};

const fetchMyOrders = async () => {
  const response = await axiosInstance.get("/v1/orders/my");
  return Array.isArray(response.data) ? response.data : [];
};

export const useMyOrders = () => {
  const token = getAuthToken();

  return useQuery({
    queryKey: ["myOrders"],
    queryFn: fetchMyOrders,
    enabled: !!token,
    staleTime: 60 * 1000,
  });
};
