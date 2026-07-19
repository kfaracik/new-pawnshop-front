import LegalLayout from "components/legal/LegalLayout";
import { COMPANY, fullAddress } from "lib/companyInfo";

const sections = [
  {
    id: "postanowienia-ogolne",
    title: "Postanowienia ogólne i definicje",
    content: (
      <>
        <p>
          Niniejszy Regulamin określa zasady korzystania ze sklepu internetowego
          dostępnego pod adresem <strong>{COMPANY.url}</strong> (dalej „Sklep”),
          zasady zawierania umów sprzedaży, świadczenia usług drogą elektroniczną,
          a także prawa i obowiązki Klientów oraz Sprzedawcy.
        </p>
        <p>Użyte w Regulaminie pojęcia oznaczają:</p>
        <ul>
          <li>
            <strong>Sprzedawca / Usługodawca</strong> — {COMPANY.legalName}
            {" "}({COMPANY.legalForm}), z siedzibą pod adresem {fullAddress()}, NIP{" "}
            {COMPANY.nip}, REGON {COMPANY.regon}.
          </li>
          <li>
            <strong>Klient</strong> — osoba fizyczna, osoba prawna lub jednostka
            organizacyjna nieposiadająca osobowości prawnej, korzystająca ze Sklepu.
          </li>
          <li>
            <strong>Konsument</strong> — Klient będący konsumentem w rozumieniu
            art. 22¹ Kodeksu cywilnego.
          </li>
          <li>
            <strong>Przedsiębiorca na prawach konsumenta</strong> — osoba fizyczna
            zawierająca umowę bezpośrednio związaną z jej działalnością gospodarczą,
            gdy umowa nie ma dla niej charakteru zawodowego.
          </li>
          <li>
            <strong>Produkt / Towar</strong> — rzecz ruchoma prezentowana w Sklepie,
            będąca przedmiotem umowy sprzedaży.
          </li>
          <li>
            <strong>Umowa sprzedaży</strong> — umowa zawierana pomiędzy Klientem a
            Sprzedawcą za pośrednictwem Sklepu.
          </li>
          <li>
            <strong>Konto</strong> — usługa elektroniczna, oznaczony indywidualną
            nazwą (loginem) i hasłem zbiór zasobów w systemie teleinformatycznym.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "dane-sprzedawcy",
    title: "Dane Sprzedawcy i kontakt",
    content: (
      <>
        <p>Podmiotem prowadzącym Sklep jest:</p>
        <address>
          {COMPANY.legalName} ({COMPANY.legalForm})<br />
          {fullAddress()}<br />
          NIP: {COMPANY.nip} · REGON: {COMPANY.regon} · KRS: {COMPANY.krs}<br />
          Organ rejestrowy: {COMPANY.registryAuthority}
        </address>
        <p>
          Kontakt: e-mail <strong>{COMPANY.email}</strong>, tel.{" "}
          <strong>{COMPANY.phone}</strong> (godziny kontaktu: {COMPANY.contactHours}).
        </p>
      </>
    ),
  },
  {
    id: "wymagania-techniczne",
    title: "Wymagania techniczne",
    content: (
      <>
        <p>
          Do korzystania ze Sklepu niezbędne są: urządzenie z dostępem do sieci
          Internet, aktualna przeglądarka internetowa z obsługą JavaScript i plików
          cookies oraz aktywne konto poczty elektronicznej.
        </p>
        <p>
          Sprzedawca podejmuje działania w celu zapewnienia prawidłowego działania
          Sklepu i informuje, że korzystanie z sieci Internet wiąże się z typowymi
          zagrożeniami (np. złośliwe oprogramowanie), przed którymi Klient powinien
          się zabezpieczać.
        </p>
      </>
    ),
  },
  {
    id: "konto",
    title: "Usługi elektroniczne i Konto Klienta",
    content: (
      <>
        <p>
          Sprzedawca świadczy nieodpłatnie usługi elektroniczne: prowadzenie Konta,
          udostępnienie formularza zamówienia oraz — w zależności od funkcji Sklepu —
          wyszukiwarki i newslettera.
        </p>
        <p>
          Rejestracja Konta jest dobrowolna i bezpłatna. Klient zobowiązany jest do
          podania danych prawdziwych i aktualnych oraz do zachowania w poufności
          danych logowania. Umowa o prowadzenie Konta zawierana jest na czas
          nieoznaczony; Klient może w każdej chwili usunąć Konto, korzystając z opcji
          w panelu „Twoje konto” lub kontaktując się ze Sprzedawcą.
        </p>
        <p>
          Zakazane jest dostarczanie przez Klienta treści o charakterze bezprawnym
          oraz korzystanie ze Sklepu w sposób zakłócający jego funkcjonowanie.
        </p>
      </>
    ),
  },
  {
    id: "zamowienia",
    title: "Składanie zamówień i zawarcie umowy",
    content: (
      <>
        <p>
          Prezentacja Produktów w Sklepie stanowi zaproszenie do zawarcia umowy w
          rozumieniu art. 71 Kodeksu cywilnego, a nie ofertę.
        </p>
        <ul>
          <li>Klient dodaje wybrane Produkty do koszyka.</li>
          <li>
            Klient wypełnia formularz zamówienia (dane odbiorcy, adres, sposób
            dostawy i płatności) i potwierdza zamówienie przyciskiem oznaczonym jako
            wiążący się z obowiązkiem zapłaty.
          </li>
          <li>
            Złożenie zamówienia stanowi ofertę zawarcia umowy sprzedaży. Sprzedawca
            niezwłocznie potwierdza otrzymanie zamówienia na wskazany adres e-mail;
            umowa zostaje zawarta z chwilą potwierdzenia przyjęcia zamówienia do
            realizacji.
          </li>
        </ul>
        <p>
          Ze względu na charakter oferty (m.in. produkty jednostkowe) dostępność
          Produktu jest weryfikowana w chwili składania zamówienia. Nieopłacone
          zamówienie może rezerwować Produkt przez ograniczony czas, po upływie
          którego rezerwacja wygasa.
        </p>
      </>
    ),
  },
  {
    id: "ceny-platnosci",
    title: "Ceny, metody i termin płatności",
    content: (
      <>
        <p>
          Ceny Produktów podane są w złotych polskich (PLN) i zawierają podatki. Cena
          nie obejmuje kosztów dostawy, które wskazywane są w trakcie składania
          zamówienia. Całkowita kwota do zapłaty prezentowana jest przed
          potwierdzeniem zamówienia.
        </p>
        <p>Sklep udostępnia następujące metody płatności:</p>
        <ul>
          <li>
            <strong>Płatność online</strong> — realizowana przez zewnętrznego
            operatora płatności (Stripe): karta płatnicza, BLIK, Apple Pay, Google
            Pay. Płatność należy wykonać niezwłocznie po złożeniu zamówienia.
          </li>
          <li>
            <strong>Przelew tradycyjny</strong> — na rachunek bankowy Sprzedawcy:
            {" "}{COMPANY.bankName}, nr {COMPANY.bankAccount}. Termin płatności wynosi
            do 3 dni roboczych od zawarcia umowy.
          </li>
        </ul>
        <p>
          Brak zapłaty w wymaganym terminie może skutkować anulowaniem zamówienia i
          zwolnieniem rezerwacji Produktu.
        </p>
      </>
    ),
  },
  {
    id: "dostawa",
    title: "Dostawa i odbiór Produktu",
    content: (
      <>
        <p>
          Dostawa realizowana jest na terytorium {COMPANY.country}, w sposób wybrany
          przez Klienta spośród opcji dostępnych w Sklepie (m.in. kurier, automat
          paczkowy, odbiór osobisty). Koszt i przewidywany czas dostawy prezentowane
          są przy składaniu zamówienia.
        </p>
        <p>
          Termin realizacji liczony jest od zaksięgowania płatności (dla płatności z
          góry) i wynosi zwykle 1–2 dni robocze, o ile w opisie Produktu nie wskazano
          inaczej. Sprzedawca informuje Klienta o statusie realizacji.
        </p>
      </>
    ),
  },
  {
    id: "odstapienie",
    title: "Prawo odstąpienia od umowy (14 dni)",
    content: (
      <>
        <p>
          Konsument oraz Przedsiębiorca na prawach konsumenta, który zawarł umowę na
          odległość, może w terminie <strong>14 dni</strong> odstąpić od niej bez
          podawania przyczyny i bez ponoszenia kosztów, z wyjątkiem kosztów
          wskazanych w ustawie.
        </p>
        <p>
          Termin biegnie od objęcia Produktu w posiadanie przez Konsumenta lub
          wskazaną przez niego osobę trzecią. Do zachowania terminu wystarczy wysłanie
          oświadczenia przed jego upływem — np. za pomocą formularza stanowiącego
          załącznik do niniejszego Regulaminu lub w innej jednoznacznej formie na
          adres {COMPANY.email}.
        </p>
        <p>
          Sprzedawca niezwłocznie, nie później niż w terminie 14 dni, zwraca
          Konsumentowi wszystkie dokonane płatności, w tym koszty dostawy (do
          wysokości najtańszego zwykłego sposobu dostawy). Zwrotu płatności dokonuje
          się przy użyciu takiego samego sposobu zapłaty, jakiego użył Konsument.
          Konsument ponosi bezpośrednie koszty zwrotu Produktu.
        </p>
        <p>
          Prawo odstąpienia nie przysługuje m.in. w przypadkach wskazanych w art. 38
          ustawy o prawach konsumenta (np. rzeczy nieprefabrykowane wykonane wg
          specyfikacji Konsumenta, rzeczy ulegające szybkiemu zepsuciu, zapieczętowane
          nagrania/oprogramowanie po usunięciu opakowania).
        </p>
      </>
    ),
  },
  {
    id: "reklamacje",
    title: "Reklamacje — niezgodność Towaru z umową",
    content: (
      <>
        <p>
          Sprzedawca ma obowiązek dostarczyć Produkt zgodny z umową. W przypadku
          niezgodności Towaru z umową Konsumentowi przysługują uprawnienia określone
          w ustawie o prawach konsumenta (naprawa, wymiana, obniżenie ceny lub
          odstąpienie od umowy na zasadach ustawowych).
        </p>
        <p>
          Reklamację można złożyć na adres {COMPANY.email} lub korespondencyjnie na
          adres siedziby Sprzedawcy. Zaleca się podanie danych Klienta, opisu wady,
          żądania oraz danych kontaktowych. Sprzedawca ustosunkuje się do reklamacji
          niezwłocznie, nie później niż w terminie <strong>14 dni</strong> od jej
          otrzymania.
        </p>
        <p>
          W odniesieniu do Klientów niebędących Konsumentami odpowiedzialność z tytułu
          rękojmi może zostać zmodyfikowana zgodnie z postanowieniami dla
          przedsiębiorców poniżej.
        </p>
      </>
    ),
  },
  {
    id: "reklamacje-uslugi",
    title: "Reklamacje dotyczące usług elektronicznych",
    content: (
      <p>
        Reklamacje związane z działaniem Sklepu (usług elektronicznych) Klient może
        zgłaszać na adres {COMPANY.email}. Zaleca się wskazanie rodzaju i daty
        wystąpienia nieprawidłowości oraz danych kontaktowych. Sprzedawca rozpatruje
        reklamację w terminie do 14 dni.
      </p>
    ),
  },
  {
    id: "pozasadowe",
    title: "Pozasądowe sposoby rozpatrywania reklamacji i dochodzenia roszczeń",
    content: (
      <>
        <p>
          Konsument może skorzystać z pozasądowych sposobów rozpatrywania reklamacji
          i dochodzenia roszczeń, m.in. za pośrednictwem stałych polubownych sądów
          konsumenckich, wojewódzkich inspektoratów Inspekcji Handlowej oraz miejskich
          (powiatowych) rzeczników konsumentów. Informacje dostępne są na stronie
          Urzędu Ochrony Konkurencji i Konsumentów (UOKiK).
        </p>
        <p>
          Pod adresem{" "}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
            ec.europa.eu/consumers/odr
          </a>{" "}
          dostępna jest unijna platforma internetowego rozstrzygania sporów (ODR).
        </p>
      </>
    ),
  },
  {
    id: "dane-osobowe",
    title: "Ochrona danych osobowych",
    content: (
      <p>
        Administratorem danych osobowych jest Sprzedawca. Zasady przetwarzania danych
        osobowych oraz wykorzystywania plików cookies opisane są w{" "}
        <a href="/legal/privacy">Polityce prywatności</a> oraz{" "}
        <a href="/legal/cookies">Polityce cookies</a>.
      </p>
    ),
  },
  {
    id: "wlasnosc-intelektualna",
    title: "Własność intelektualna",
    content: (
      <p>
        Treści udostępniane w Sklepie (znaki towarowe, logotypy, teksty, grafiki,
        układ) podlegają ochronie prawnej i stanowią własność Sprzedawcy lub podmiotów
        trzecich. Ich wykorzystywanie bez zgody uprawnionego jest niedozwolone.
      </p>
    ),
  },
  {
    id: "przedsiebiorcy",
    title: "Postanowienia dotyczące Klientów niebędących Konsumentami",
    content: (
      <>
        <p>
          Poniższe postanowienia dotyczą wyłącznie Klientów niebędących Konsumentami
          ani Przedsiębiorcami na prawach konsumenta:
        </p>
        <ul>
          <li>
            Odpowiedzialność Sprzedawcy z tytułu rękojmi za wady Produktu może zostać
            wyłączona w zakresie dopuszczalnym przez prawo.
          </li>
          <li>
            Odpowiedzialność Sprzedawcy ograniczona jest do wysokości ceny Produktu i
            nie obejmuje utraconych korzyści.
          </li>
          <li>Wszelkie spory rozstrzyga sąd właściwy dla siedziby Sprzedawcy.</li>
        </ul>
      </>
    ),
  },
  {
    id: "postanowienia-koncowe",
    title: "Postanowienia końcowe",
    content: (
      <>
        <p>
          W sprawach nieuregulowanych stosuje się przepisy prawa polskiego, w
          szczególności Kodeksu cywilnego, ustawy o prawach konsumenta oraz ustawy o
          świadczeniu usług drogą elektroniczną.
        </p>
        <p>
          Sprzedawca może zmienić Regulamin z ważnych przyczyn (np. zmiana przepisów,
          zmiana metod płatności lub dostawy). Do zamówień złożonych przed zmianą
          stosuje się Regulamin w brzmieniu dotychczasowym. O zmianach Klienci
          posiadający Konto informowani są z odpowiednim wyprzedzeniem.
        </p>
      </>
    ),
  },
  {
    id: "formularz-odstapienia",
    title: "Załącznik — wzór formularza odstąpienia od umowy",
    content: (
      <>
        <p>
          (formularz należy wypełnić i odesłać tylko w przypadku chęci odstąpienia od
          umowy)
        </p>
        <p>
          Adresat: {COMPANY.legalName}, {fullAddress()}, e-mail {COMPANY.email}.
        </p>
        <p>
          Ja/My niniejszym informuję/informujemy o moim/naszym odstąpieniu od umowy
          sprzedaży następujących rzeczy: ____________________ <br />
          Data zawarcia umowy / odbioru: ____________________ <br />
          Imię i nazwisko konsumenta(ów): ____________________ <br />
          Adres konsumenta(ów): ____________________ <br />
          Data: ____________________ <br />
          Podpis (tylko dla wersji papierowej): ____________________
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      title="Regulamin sklepu internetowego"
      description="Regulamin sklepu internetowego Nowy Lombard — zasady zakupów, płatności, dostawy, odstąpienia od umowy i reklamacji."
      updatedAt="19 lipca 2026"
      path="/legal/terms"
      lead={
        <p>
          Regulamin określa zasady korzystania ze sklepu internetowego Nowy Lombard,
          składania zamówień, płatności, dostawy oraz prawa konsumenta (odstąpienie od
          umowy, reklamacje). Prosimy o zapoznanie się z jego treścią przed złożeniem
          zamówienia.
        </p>
      }
      sections={sections}
    />
  );
}
