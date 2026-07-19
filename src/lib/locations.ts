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

// Shown on /contact when the backend returns no locations at build time —
// e.g. the free Render instance is cold-starting and the fetch times out. Keeps
// the contact page from rendering empty. This is a SNAPSHOT of the locations
// published in the admin; as soon as the backend responds (build or ISR
// revalidate) the live list is used instead and these are ignored.
//
// Keep in sync with the admin "Lokalizacje" if branches/hours change.
export const FALLBACK_LOCATIONS: FrontLocation[] = [
  {
    _id: "69fb40e92dcac56e3194869b",
    name: "Częstochowa Raków",
    city: "Częstochowa",
    addressLine1: "ul. Brzozowa 16",
    addressLine2: "Częstochowa - Raków",
    postalCode: "42-216",
    phone: "515671666",
    email: "kontakt@lombard.pl",
    description: "Pon-Pt 9:00-18:30, Sob 9:00-15:00",
  },
  {
    _id: "69fb41482dcac56e319486a2",
    name: "Katowice",
    city: "Katowice",
    addressLine1: "ul. Warszawska 13",
    postalCode: "40-009",
    phone: "515671666",
    email: "kontakt@lombard.pl",
    description: "Pon-Pt 9:00-18:30, Sob 9:00-15:00",
  },
  {
    _id: "69f923e2edbec9bc375ca573",
    name: "Nowy Lombard NMP 6",
    city: "Częstochowa",
    addressLine1: "Aleja Najświętszej Maryi Panny 6",
    postalCode: "42-200",
    phone: "515671666",
    email: "kontakt@lombard.pl",
    description: "Pon-Pt 9:00-18:30, Sob 9:00-15:00",
  },
];

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

async function fetchLocationsFromApi(): Promise<FrontLocation[]> {
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

export async function fetchLocationsForBuild(): Promise<FrontLocation[]> {
  const locations = await fetchLocationsFromApi();
  // If the backend returned nothing (cold-start timeout, error, or none
  // published yet), fall back to the default location so /contact is never empty.
  return locations.length > 0 ? locations : FALLBACK_LOCATIONS;
}
