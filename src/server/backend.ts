import type { NextApiRequest, NextApiResponse } from "next";
import { getAuthTokenFromCookie } from "./authCookie";

const resolveBackendBaseUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || "";
  return baseUrl.replace(/\/+$/, "");
};

export const versionedBackendPath = (path: string) => {
  const baseUrl = resolveBackendBaseUrl();
  const apiVersion = (process.env.NEXT_PUBLIC_API_VERSION || "v1").replace(/^\/+|\/+$/g, "");
  const normalizedPath = path.replace(/^\/+/, "");

  if (!apiVersion || new RegExp(`/${apiVersion}$`).test(baseUrl)) {
    return normalizedPath;
  }

  return `${apiVersion}/${normalizedPath}`;
};

export const buildBackendUrl = (path: string, query: NextApiRequest["query"] = {}) => {
  const baseUrl = resolveBackendBaseUrl();
  if (!baseUrl) {
    throw new Error("Missing NEXT_PUBLIC_API_BASE_URL or API_BASE_URL.");
  }

  const targetUrl = new URL(`${baseUrl}/${path.replace(/^\/+/, "")}`);
  for (const [key, value] of Object.entries(query)) {
    if (key === "path") continue;
    if (Array.isArray(value)) {
      value.forEach((item) => targetUrl.searchParams.append(key, item));
    } else if (typeof value === "string") {
      targetUrl.searchParams.set(key, value);
    }
  }

  return targetUrl.toString();
};

export const readBackendJson = async (response: Response) => {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

export const proxyBackendRequest = async (
  req: NextApiRequest,
  res: NextApiResponse,
  path: string
) => {
  const token = getAuthTokenFromCookie(req.headers.cookie);
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (req.headers["content-type"]) {
    headers["Content-Type"] = String(req.headers["content-type"]);
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(buildBackendUrl(path, req.query), {
    method: req.method,
    headers,
    body: req.method === "GET" || req.method === "HEAD" ? undefined : JSON.stringify(req.body || {}),
  });
  const payload = await readBackendJson(response);
  const contentType = response.headers.get("content-type");

  if (contentType) {
    res.setHeader("Content-Type", contentType);
  }

  return res.status(response.status).send(payload);
};
