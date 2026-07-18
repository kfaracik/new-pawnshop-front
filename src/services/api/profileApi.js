import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const getProfile = async () => {
  const response = await axios.get("/api/account");
  return response.data;
};

export const updateProfile = async (payload) => {
  const response = await axios.put("/api/account", payload);
  return response.data;
};

export const changePassword = async (payload) => {
  const response = await axios.put("/api/account/password", payload);
  return response.data;
};

export const changeEmail = async (payload) => {
  const response = await axios.put("/api/account/email", payload);
  return response.data;
};

export const deleteAccount = async (payload) => {
  const response = await axios.delete("/api/account/delete", { data: payload });
  return response.data;
};

export const useProfile = (enabled = true) =>
  useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled,
    retry: false,
    staleTime: 2 * 60 * 1000,
  });
