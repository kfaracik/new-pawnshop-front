import axiosInstance from "lib/axiosInstance";
import { setAuthToken } from "utils/authToken";

const parseAuthError = (error, fallbackMessage) => {
  if (error.code === "ECONNABORTED") {
    return "Przekroczono czas oczekiwania na serwer. Spróbuj ponownie.";
  }
  if (!error.response) {
    return "Brak połączenia z serwerem. Sprawdź internet i spróbuj ponownie.";
  }
  return error.response?.data?.message || fallbackMessage;
};

export const registerUser = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      email: email.trim().toLowerCase(),
      password,
    });

    if (response.data?.token) {
      setAuthToken(response.data.token);
    }

    return response.data;
  } catch (error) {
    throw new Error(parseAuthError(error, "Rejestracja nieudana"));
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email: email.trim().toLowerCase(),
      password,
    });

    if (response.data?.token) {
      setAuthToken(response.data.token);
    }

    return response.data;
  } catch (error) {
    throw new Error(parseAuthError(error, "Logowanie nieudane"));
  }
};
