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
  const candidates = normalizedBaseUrl.endsWith("/v1")
    ? [`${normalizedBaseUrl}/locations`, normalizedBaseUrl.replace(/\/v1$/, "/locations")]
    : [`${normalizedBaseUrl}/locations`, `${normalizedBaseUrl}/v1/locations`];

  for (const url of candidates) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        continue;
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (_error) {
      continue;
    }
  }

  return [];
}
