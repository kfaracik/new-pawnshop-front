import { useQuery } from "@tanstack/react-query";
import axiosInstance from "lib/axiosInstance";
import { versionedApiPath } from "lib/apiPaths";

export const createOrder = async ({
  name,
  email,
  city,
  postalCode,
  streetAddress,
  country,
  products,
  deliveryMethod,
  deliveryPrice,
  paymentMethod,
}) => {
  const response = await axiosInstance.post(versionedApiPath("orders"), {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    products,
    deliveryMethod,
    deliveryPrice,
    paymentMethod,
  });

  return response.data;
};

const fetchMyOrders = async () => {
  const response = await axiosInstance.get(versionedApiPath("orders/my"));
  return Array.isArray(response.data) ? response.data : [];
};

export const useMyOrders = (enabled = true) => {
  return useQuery({
    queryKey: ["myOrders"],
    queryFn: fetchMyOrders,
    enabled,
    staleTime: 60 * 1000,
  });
};
