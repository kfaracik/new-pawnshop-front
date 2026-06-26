const API_VERSION = (process.env.NEXT_PUBLIC_API_VERSION || "v1").replace(/^\/+|\/+$/g, "");
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");
const baseUrlAlreadyVersioned = API_VERSION
  ? new RegExp(`/${API_VERSION}$`).test(API_BASE_URL)
  : false;

const trimSlashes = (value: string) => value.replace(/^\/+|\/+$/g, "");

export const versionedApiPath = (path: string) => {
  const normalizedPath = trimSlashes(path);
  return API_VERSION && !baseUrlAlreadyVersioned
    ? `/${API_VERSION}/${normalizedPath}`
    : `/${normalizedPath}`;
};

export const absoluteVersionedApiUrl = (path: string) => {
  if (!API_BASE_URL) return "";

  return `${API_BASE_URL}${versionedApiPath(path)}`;
};
