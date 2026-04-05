import Cookies from "js-cookie";

export const AUTH_COOKIE_NAME = "authToken";

export const getAuthToken = () => Cookies.get(AUTH_COOKIE_NAME);

export const setAuthToken = (token) => {
  Cookies.set(AUTH_COOKIE_NAME, token, {
    sameSite: "strict",
    expires: 7,
    path: "/",
  });
};

export const clearAuthToken = () => {
  Cookies.remove(AUTH_COOKIE_NAME, { path: "/" });
};
