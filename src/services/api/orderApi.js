import axiosInstance from "lib/axiosInstance";

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
