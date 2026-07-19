import LegalLayout from "components/legal/LegalLayout";
import { COMPANY, fullAddress } from "lib/companyInfo";

const sections = [
  {
    id: "administrator",
    title: "Administrator danych osobowych",
    content: (
      <>
        <p>
          Administratorem Twoich danych osobowych jest {COMPANY.legalName}
          {" "}({COMPANY.legalForm}) z siedzibą pod adresem {fullAddress()}, NIP{" "}
          {COMPANY.nip}, REGON {COMPANY.regon} (dalej „Administrator”).
        </p>
        <p>
          W sprawach dotyczących danych osobowych możesz skontaktować się z
          Administratorem: e-mail <strong>{COMPANY.email}</strong>, tel.{" "}
          {COMPANY.phone}, lub listownie na adres siedziby.
        </p>
        <p>
          Inspektor Ochrony Danych: {COMPANY.dpoContact} (o ile został powołany — w
          przeciwnym razie kontakt jak wyżej).
        </p>
      </>
    ),
  },
  {
    id: "cele-podstawy",
    title: "Cele i podstawy prawne przetwarzania",
    content: (
      <>
        <p>Dane osobowe przetwarzamy w następujących celach i na podstawach:</p>
        <ul>
          <li>
            <strong>Realizacja zamówień i umów sprzedaży</strong> — art. 6 ust. 1
            lit. b RODO (wykonanie umowy).
          </li>
          <li>
            <strong>Prowadzenie Konta</strong> — art. 6 ust. 1 lit. b RODO.
          </li>
          <li>
            <strong>Obsługa płatności</strong> — art. 6 ust. 1 lit. b oraz lit. c
            RODO (obowiązki prawne).
          </li>
          <li>
            <strong>Obowiązki podatkowe i rachunkowe</strong> (wystawianie i
            przechowywanie dokumentów księgowych) — art. 6 ust. 1 lit. c RODO.
          </li>
          <li>
            <strong>Rozpatrywanie reklamacji i odstąpień, dochodzenie roszczeń</strong>{" "}
            — art. 6 ust. 1 lit. c oraz lit. f RODO (prawnie uzasadniony interes).
          </li>
          <li>
            <strong>Zapewnienie bezpieczeństwa i przeciwdziałanie nadużyciom</strong>{" "}
            — art. 6 ust. 1 lit. f RODO.
          </li>
          <li>
            <strong>Marketing bezpośredni, newsletter</strong> — art. 6 ust. 1 lit. a
            RODO (zgoda) lub lit. f RODO, tam gdzie dozwolone.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "zakres-danych",
    title: "Zakres przetwarzanych danych",
    content: (
      <p>
        W zależności od celu możemy przetwarzać: imię i nazwisko, adres e-mail,
        numer telefonu, adres dostawy i rozliczeniowy, dane zamówień i płatności,
        identyfikatory sesji oraz dane techniczne (np. adres IP, logi
        bezpieczeństwa). Podanie danych niezbędnych do realizacji zamówienia jest
        dobrowolne, ale konieczne do zawarcia i wykonania umowy.
      </p>
    ),
  },
  {
    id: "odbiorcy",
    title: "Odbiorcy danych i podmioty przetwarzające",
    content: (
      <>
        <p>
          Dane mogą być powierzane zaufanym podmiotom przetwarzającym je na zlecenie
          Administratora, w szczególności:
        </p>
        <ul>
          <li>dostawcom hostingu i infrastruktury IT,</li>
          <li>operatorom płatności (np. Stripe),</li>
          <li>firmom kurierskim i operatorom logistycznym,</li>
          <li>dostawcom poczty elektronicznej i narzędzi komunikacji,</li>
          <li>dostawcom narzędzi analitycznych (za zgodą, jeśli wymagana),</li>
          <li>
            podmiotom świadczącym obsługę księgową, prawną oraz wsparcie techniczne.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "panstwa-trzecie",
    title: "Przekazywanie danych poza EOG",
    content: (
      <p>
        Co do zasady dane przetwarzane są na terenie Europejskiego Obszaru
        Gospodarczego. Jeżeli w wyniku korzystania z narzędzi dostawców spoza EOG
        dojdzie do przekazania danych do państwa trzeciego, nastąpi to wyłącznie z
        zapewnieniem odpowiednich zabezpieczeń (np. standardowe klauzule umowne
        zatwierdzone przez Komisję Europejską).
      </p>
    ),
  },
  {
    id: "okres",
    title: "Okres przechowywania danych",
    content: (
      <ul>
        <li>
          dane związane z umową — przez okres jej realizacji, a następnie przez czas
          przedawnienia roszczeń;
        </li>
        <li>
          dane rozliczeniowe (dokumenty księgowe) — przez okres wymagany przepisami
          podatkowymi (co do zasady 5 lat);
        </li>
        <li>dane Konta — do czasu jego usunięcia przez użytkownika;</li>
        <li>
          dane przetwarzane na podstawie zgody — do czasu jej wycofania;
        </li>
        <li>
          dane przetwarzane na podstawie prawnie uzasadnionego interesu — do czasu
          skutecznego wniesienia sprzeciwu lub ustania celu.
        </li>
      </ul>
    ),
  },
  {
    id: "prawa",
    title: "Prawa osoby, której dane dotyczą",
    content: (
      <>
        <p>Przysługują Ci następujące prawa:</p>
        <ul>
          <li>dostępu do danych oraz otrzymania ich kopii,</li>
          <li>sprostowania (poprawienia) danych,</li>
          <li>usunięcia danych („prawo do bycia zapomnianym”),</li>
          <li>ograniczenia przetwarzania,</li>
          <li>przenoszenia danych,</li>
          <li>
            wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym
            interesie,
          </li>
          <li>cofnięcia zgody w dowolnym momencie (bez wpływu na zgodność z prawem
            przetwarzania sprzed cofnięcia).</li>
        </ul>
        <p>
          Masz również prawo wniesienia skargi do organu nadzorczego — Prezesa Urzędu
          Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).
        </p>
      </>
    ),
  },
  {
    id: "profilowanie",
    title: "Profilowanie i zautomatyzowane decyzje",
    content: (
      <p>
        Administrator nie podejmuje decyzji opierających się wyłącznie na
        zautomatyzowanym przetwarzaniu, które wywoływałyby wobec Ciebie skutki prawne
        lub w podobny sposób istotnie na Ciebie wpływały. Ewentualne profilowanie w
        celach marketingowych odbywa się wyłącznie za zgodą.
      </p>
    ),
  },
  {
    id: "konto-uzytkownika",
    title: "Konto użytkownika",
    content: (
      <p>
        Zakładając Konto, przechowujemy Twój adres e-mail oraz — jeśli je podasz —
        dane profilu (imię i nazwisko, telefon, adres dostawy), aby przyspieszyć
        składanie zamówień. Możesz je edytować, zmienić adres e-mail i hasło, a także
        trwale usunąć Konto w panelu „Twoje konto” (zakładka „Prywatność”). Po
        usunięciu Konta dane logowania są kasowane; dane złożonych zamówień pozostają
        przez okres wymagany przepisami podatkowymi i rachunkowymi.
      </p>
    ),
  },
  {
    id: "dane-lokalne",
    title: "Dane przechowywane lokalnie w przeglądarce",
    content: (
      <p>
        Dla wygody zakupów część danych zapisujemy wyłącznie w pamięci lokalnej Twojej
        przeglądarki (localStorage), a nie na naszych serwerach. Dotyczy to zawartości
        koszyka, ostatnich wyszukiwań, wyboru dotyczącego cookies oraz danych do
        formularza zamówienia zapamiętywanych po złożeniu zamówienia. Dane te
        pozostają na Twoim urządzeniu do czasu ich wyczyszczenia i wysyłane są do nas
        dopiero w chwili złożenia zamówienia.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Pliki cookies",
    content: (
      <p>
        Sklep korzysta z plików cookies i podobnych technologii. Szczegółowe
        informacje o rodzajach cookies, celach i zarządzaniu zgodami znajdują się w{" "}
        <a href="/legal/cookies">Polityce cookies</a>.
      </p>
    ),
  },
  {
    id: "zmiany",
    title: "Zmiany Polityki prywatności",
    content: (
      <p>
        Administrator może aktualizować niniejszą Politykę w związku ze zmianami
        przepisów, technologii lub zakresu usług. Aktualna wersja jest zawsze dostępna
        w Sklepie, wraz z datą ostatniej aktualizacji.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Polityka prywatności"
      description="Polityka prywatności sklepu Nowy Lombard — administrator danych, cele i podstawy przetwarzania, prawa użytkownika (RODO)."
      updatedAt="19 lipca 2026"
      path="/legal/privacy"
      lead={
        <p>
          Niniejsza Polityka prywatności wyjaśnia, jak przetwarzamy Twoje dane
          osobowe w związku z korzystaniem ze sklepu internetowego Nowy Lombard,
          zgodnie z Rozporządzeniem (UE) 2016/679 (RODO).
        </p>
      }
      sections={sections}
    />
  );
}
