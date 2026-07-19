import LegalLayout from "components/legal/LegalLayout";
import { COMPANY } from "lib/companyInfo";

const sections = [
  {
    id: "czym-sa-cookies",
    title: "Czym są pliki cookies",
    content: (
      <p>
        Pliki cookies to niewielkie pliki tekstowe zapisywane na Twoim urządzeniu
        końcowym podczas korzystania ze Sklepu. Umożliwiają one m.in. utrzymanie sesji,
        zapamiętanie preferencji oraz — za zgodą — pomiary statystyczne. Podobne
        funkcje pełnią technologie takie jak localStorage.
      </p>
    ),
  },
  {
    id: "administrator",
    title: "Administrator",
    content: (
      <p>
        Podmiotem zamieszczającym cookies na urządzeniu użytkownika oraz uzyskującym
        do nich dostęp jest {COMPANY.legalName}, prowadzący sklep pod adresem{" "}
        {COMPANY.url}. Kontakt: {COMPANY.email}.
      </p>
    ),
  },
  {
    id: "rodzaje",
    title: "Rodzaje wykorzystywanych cookies",
    content: (
      <>
        <ul>
          <li>
            <strong>Niezbędne</strong> — konieczne do prawidłowego działania Sklepu
            (np. utrzymanie sesji, koszyk, bezpieczeństwo). Nie wymagają zgody.
          </li>
          <li>
            <strong>Funkcjonalne</strong> — zapamiętują ustawienia i preferencje
            użytkownika, aby zwiększyć wygodę korzystania.
          </li>
          <li>
            <strong>Analityczne / statystyczne</strong> — pomagają zrozumieć, w jaki
            sposób użytkownicy korzystają ze Sklepu; instalowane są za zgodą.
          </li>
          <li>
            <strong>Marketingowe</strong> — służą prezentowaniu dopasowanych treści i
            reklam; instalowane są wyłącznie za zgodą.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cele",
    title: "Cele wykorzystywania cookies",
    content: (
      <ul>
        <li>zapewnienie prawidłowego i bezpiecznego działania Sklepu,</li>
        <li>utrzymanie sesji użytkownika oraz zawartości koszyka,</li>
        <li>zapamiętywanie preferencji i wyboru zgód,</li>
        <li>tworzenie anonimowych statystyk (za zgodą),</li>
        <li>działania marketingowe (za zgodą).</li>
      </ul>
    ),
  },
  {
    id: "podmioty-trzecie",
    title: "Cookies podmiotów trzecich",
    content: (
      <p>
        W Sklepie mogą być wykorzystywane cookies pochodzące od zaufanych partnerów,
        np. operatora płatności (Stripe) w celu bezpiecznej realizacji transakcji, a
        także — za zgodą — narzędzi analitycznych. Partnerzy ci działają na podstawie
        własnych polityk prywatności.
      </p>
    ),
  },
  {
    id: "zgoda",
    title: "Zgoda i zarządzanie preferencjami",
    content: (
      <p>
        Przy pierwszej wizycie prezentujemy baner umożliwiający wyrażenie lub odmowę
        zgody na cookies inne niż niezbędne. Swój wybór możesz w każdej chwili zmienić,
        czyszcząc dane przeglądarki lub kontaktując się z nami. Cookies niezbędne są
        zawsze aktywne, ponieważ warunkują działanie Sklepu.
      </p>
    ),
  },
  {
    id: "przegladarka",
    title: "Zarządzanie cookies w przeglądarce",
    content: (
      <>
        <p>
          Ustawienia dotyczące cookies możesz zmienić w swojej przeglądarce, w tym
          zablokować ich zapisywanie lub usunąć już zapisane pliki. Ograniczenie
          cookies może wpłynąć na niektóre funkcje Sklepu.
        </p>
        <p>
          Instrukcje dostępne są w dokumentacji popularnych przeglądarek (Chrome,
          Firefox, Safari, Edge) w sekcjach dotyczących prywatności i cookies.
        </p>
      </>
    ),
  },
  {
    id: "zmiany",
    title: "Zmiany Polityki cookies",
    content: (
      <p>
        Niniejsza Polityka może być aktualizowana w związku ze zmianami technologii
        lub przepisów. Aktualna wersja wraz z datą aktualizacji jest zawsze dostępna w
        Sklepie.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalLayout
      title="Polityka cookies"
      description="Polityka cookies sklepu Nowy Lombard — rodzaje plików cookies, cele, zgody i zarządzanie preferencjami."
      updatedAt="19 lipca 2026"
      path="/legal/cookies"
      lead={
        <p>
          Poniżej wyjaśniamy, czym są pliki cookies, w jakich celach je wykorzystujemy
          oraz jak możesz zarządzać swoimi preferencjami.
        </p>
      }
      sections={sections}
    />
  );
}
