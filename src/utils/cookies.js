import Cookies from "js-cookie";

export const clearAuthToken = () => {
  Cookies.remove("authToken", { path: "/" });
};
