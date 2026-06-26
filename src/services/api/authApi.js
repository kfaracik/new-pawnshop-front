import axios from "axios";

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
    const response = await axios.post("/api/auth/register", {
      email: email.trim().toLowerCase(),
      password,
    });

    return response.data;
  } catch (error) {
    throw new Error(parseAuthError(error, "Rejestracja nieudana"));
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post("/api/auth/login", {
      email: email.trim().toLowerCase(),
      password,
    });

    return response.data;
  } catch (error) {
    throw new Error(parseAuthError(error, "Logowanie nieudane"));
  }
};

export const logoutUser = async () => {
  await axios.post("/api/auth/logout");
};
