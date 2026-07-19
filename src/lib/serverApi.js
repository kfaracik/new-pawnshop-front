const buildApiUrl = (resource) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBaseUrl) {
    return null;
  }

  const apiVersion = (process.env.NEXT_PUBLIC_API_VERSION || "v1").replace(
    /^\/+|\/+$/g,
    ""
  );
  const normalizedBaseUrl = apiBaseUrl.replace(/\/+$/, "");
  const path = resource.replace(/^\/+/, "");
  const hasVersion = new RegExp(`/${apiVersion}$`).test(normalizedBaseUrl);

  return hasVersion
    ? `${normalizedBaseUrl}/${path}`
    : `${normalizedBaseUrl}/${apiVersion}/${path}`;
};

export const fetchApiResource = async (resource, fallback = null) => {
  const url = buildApiUrl(resource);
  if (!url) {
    return fallback;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return fallback;
    }
    return await response.json();
  } catch (_error) {
    return fallback;
  }
};
