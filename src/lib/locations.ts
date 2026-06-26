export type FrontLocation = {
  _id?: string;
  name?: string;
  city?: string;
  addressLine1?: string;
  addressLine2?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  description?: string;
};

const LOCATION_BUILD_TIMEOUT_MS = Number(
  process.env.LOCATIONS_BUILD_TIMEOUT_MS || 1500
);

export const getLocationLabel = (location?: FrontLocation | null) =>
  location?.name ||
  [location?.city, location?.addressLine1].filter(Boolean).join(" - ") ||
  "Punkt";

export const getLocationAddress = (location?: FrontLocation | null) =>
  [location?.addressLine1, location?.addressLine2, location?.postalCode, location?.city]
    .filter(Boolean)
    .join(", ");

export const getLocationMapUrl = (location?: FrontLocation | null) => {
  const address = getLocationAddress(location);
  return address
    ? `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`
    : "";
};

export async function fetchLocationsForBuild() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    return [];
  }

  const normalizedBaseUrl = baseUrl.replace(/\/+$/, "");
  const apiVersion = (process.env.NEXT_PUBLIC_API_VERSION || "v1").replace(/^\/+|\/+$/g, "");
  const baseUrlAlreadyVersioned = apiVersion
    ? new RegExp(`/${apiVersion}$`).test(normalizedBaseUrl)
    : false;
  const versionPrefix = apiVersion && !baseUrlAlreadyVersioned ? `/${apiVersion}` : "";
  const url = `${normalizedBaseUrl}${versionPrefix}/locations`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), LOCATION_BUILD_TIMEOUT_MS);
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (_error) {
    return [];
  }
}
