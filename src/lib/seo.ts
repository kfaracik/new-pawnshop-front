export const SITE_NAME = "Nowy Lombard";
export const DEFAULT_TITLE = `${SITE_NAME} | Lombard online, sprzedaż i licytacje`;
export const DEFAULT_DESCRIPTION =
  "Nowy Lombard oferuje sprzedaż produktów, rezerwacje oraz licytacje online. Sprawdź aktualne oferty i skontaktuj się z najbliższym oddziałem.";

const FALLBACK_SITE_URL = "https://www.twoj-lombard.pl";

export const getSiteUrl = () =>
  (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL).replace(/\/$/, "");

export const getCanonicalUrl = (path = "/") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
};

export const stripHtml = (value = "") =>
  value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export const truncate = (value = "", maxLength = 160) => {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trim()}…`;
};
