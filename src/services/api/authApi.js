import axiosInstance from "lib/axiosInstance";
import Cookies from "js-cookie";

export const registerUser = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      email,
      password,
    });

    Cookies.set("authToken", response.data.token, {
      httpOnly: false,
      sameSite: "strict",
      expires: 7,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    Cookies.set("authToken", response.data.token, {
      httpOnly: false,
      sameSite: "strict",
      expires: 7,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
