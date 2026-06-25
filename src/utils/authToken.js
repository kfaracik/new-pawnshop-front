import Cookies from "js-cookie";

export const AUTH_COOKIE_NAME = "authToken";

const decodeBase64Url = (value) => {
  if (typeof window === "undefined") return "";

  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "="
  );

  return window.atob(padded);
};

export const getTokenPayload = (token) => {
  try {
    const [, payload] = String(token || "").split(".");
    if (!payload) return null;
    return JSON.parse(decodeBase64Url(payload));
  } catch {
    return null;
  }
};

export const isAuthTokenExpired = (token) => {
  const payload = getTokenPayload(token);
  if (!payload?.exp) return true;

  return Number(payload.exp) * 1000 <= Date.now();
};

export const getAuthToken = () => {
  const token = Cookies.get(AUTH_COOKIE_NAME);

  if (!token) return undefined;

  if (isAuthTokenExpired(token)) {
    clearAuthToken();
    return undefined;
  }

  return token;
};

export const setAuthToken = (token, expiresInSeconds) => {
  const expires = Number.isFinite(Number(expiresInSeconds))
    ? new Date(Date.now() + Number(expiresInSeconds) * 1000)
    : 7;

  Cookies.set(AUTH_COOKIE_NAME, token, {
    sameSite: "strict",
    secure: typeof window !== "undefined" && window.location.protocol === "https:",
    expires,
    path: "/",
  });
};

export const clearAuthToken = () => {
  Cookies.remove(AUTH_COOKIE_NAME, { path: "/" });
};
