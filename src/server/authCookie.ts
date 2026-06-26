import type { NextApiResponse } from "next";

export const AUTH_COOKIE_NAME = "authToken";

const COOKIE_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

export const parseCookies = (cookieHeader = "") =>
  cookieHeader.split(";").reduce<Record<string, string>>((cookies, item) => {
    const [rawName, ...rawValue] = item.trim().split("=");
    if (!rawName) return cookies;

    cookies[rawName] = decodeURIComponent(rawValue.join("="));
    return cookies;
  }, {});

export const getAuthTokenFromCookie = (cookieHeader?: string) =>
  parseCookies(cookieHeader || "")[AUTH_COOKIE_NAME] || "";

export const setAuthTokenCookie = (
  res: NextApiResponse,
  token: string,
  maxAgeSeconds = COOKIE_MAX_AGE_SECONDS
) => {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${AUTH_COOKIE_NAME}=${encodeURIComponent(
      token
    )}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAgeSeconds}${secure}`
  );
};

export const clearAuthTokenCookie = (res: NextApiResponse) => {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${AUTH_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`
  );
};
