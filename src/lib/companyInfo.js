// Central placeholder for the operator's legal/company data.
// Fill these in ONE place before going live; every legal page reads from here.
// Values wrapped in [ ] are placeholders that must be replaced.
export const COMPANY = {
  storeName: "Nowy Lombard",
  domain: "nowylombard.com",
  url: "https://nowylombard.com",

  // --- TO FILL BEFORE LAUNCH ---
  legalName: "[PEŁNA NAZWA FIRMY / SPÓŁKI]",
  legalForm: "[FORMA PRAWNA, np. spółka z o.o. / jednoosobowa działalność gospodarcza]",
  street: "[ULICA I NUMER]",
  postalCode: "[KOD POCZTOWY]",
  city: "[MIEJSCOWOŚĆ]",
  country: "Polska",
  nip: "[NIP]",
  regon: "[REGON]",
  krs: "[KRS — jeśli dotyczy]",
  registryAuthority: "[ORGAN REJESTROWY, np. Sąd Rejonowy ... / CEIDG]",
  shareCapital: "[KAPITAŁ ZAKŁADOWY — jeśli dotyczy]",

  email: "[ADRES E-MAIL, np. kontakt@nowylombard.com]",
  phone: "[NUMER TELEFONU]",
  contactHours: "[GODZINY KONTAKTU, np. pon.–pt. 9:00–17:00]",

  // Optional — leave placeholder if not appointed
  dpoContact: "[DANE KONTAKTOWE IOD — jeśli powołano Inspektora Ochrony Danych]",

  // Bank account for traditional transfer payments
  bankAccount: "[NUMER RACHUNKU BANKOWEGO]",
  bankName: "[NAZWA BANKU]",
};

export const fullAddress = () =>
  `${COMPANY.street}, ${COMPANY.postalCode} ${COMPANY.city}, ${COMPANY.country}`;

// True while any required company field is still a placeholder — used to show a
// visible "draft" notice and to keep the pages out of the search index.
export const COMPANY_DATA_INCOMPLETE = Object.values(COMPANY).some(
  (value) => typeof value === "string" && value.includes("[")
);
