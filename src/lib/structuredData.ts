import { getCanonicalUrl, getSiteUrl, SITE_NAME } from "./seo";
import { getLocationAddress, type FrontLocation } from "./locations";

const FACEBOOK_URL =
  process.env.NEXT_PUBLIC_FACEBOOK_AUCTIONS_URL || "https://www.facebook.com/";

// All branches share the same opening hours.
const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:30",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Saturday",
    opens: "09:00",
    closes: "15:00",
  },
];

// Flagship branch used for the site-wide Organization schema.
const MAIN_BRANCH = {
  name: "Nowy Lombard NMP 6",
  streetAddress: "Aleja Najświętszej Maryi Panny 6",
  city: "Częstochowa",
  postalCode: "42-200",
};

const PHONE = "+48515671666";
const EMAIL = "kontakt@lombard.pl";

const normalizePhone = (phone?: string) => {
  if (!phone) return PHONE;
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  return digits.length === 9 ? `+48${digits}` : digits;
};

const postalAddress = (opts: {
  streetAddress?: string;
  city?: string;
  postalCode?: string;
}) => ({
  "@type": "PostalAddress",
  streetAddress: opts.streetAddress,
  addressLocality: opts.city,
  postalCode: opts.postalCode,
  addressCountry: "PL",
});

/** Site-wide PawnShop / LocalBusiness (homepage). */
export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "PawnShop",
  name: SITE_NAME,
  description:
    "Lombard w Częstochowie i Katowicach — pożyczki pod zastaw, skup złota oraz sprzedaż i licytacje sprawdzonych przedmiotów.",
  url: getCanonicalUrl("/"),
  image: `${getSiteUrl()}/og-image.png`,
  logo: `${getSiteUrl()}/icon-512.png`,
  telephone: PHONE,
  email: EMAIL,
  priceRange: "$$",
  currenciesAccepted: "PLN",
  address: postalAddress(MAIN_BRANCH),
  areaServed: [
    { "@type": "City", name: "Częstochowa" },
    { "@type": "City", name: "Katowice" },
  ],
  openingHoursSpecification: OPENING_HOURS,
  sameAs: [FACEBOOK_URL],
});

/** WebSite + sitelinks search box. */
export const getWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: getSiteUrl(),
  inLanguage: "pl-PL",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${getSiteUrl()}/search?query={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
});

/** One LocalBusiness per physical branch (contact page). */
export const getBranchSchema = (location: FrontLocation) => ({
  "@context": "https://schema.org",
  "@type": "PawnShop",
  name: `${SITE_NAME} — ${location.name || location.city || "Oddział"}`,
  url: getCanonicalUrl("/contact"),
  image: `${getSiteUrl()}/og-image.png`,
  telephone: normalizePhone(location.phone),
  email: location.email || EMAIL,
  priceRange: "$$",
  currenciesAccepted: "PLN",
  address: postalAddress({
    streetAddress: getLocationAddress(location) ? location.addressLine1 : undefined,
    city: location.city,
    postalCode: location.postalCode,
  }),
  openingHoursSpecification: OPENING_HOURS,
  sameAs: [FACEBOOK_URL],
});

export const getBranchesGraph = (locations: FrontLocation[] = []) =>
  locations.filter(Boolean).map(getBranchSchema);

/** BreadcrumbList — pass [{name, path}] in order (Home first). */
export const getBreadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: getCanonicalUrl(item.path),
  })),
});
