import LegalLayout from "components/legal/LegalLayout";

export default function PrivacyPage() {
  return (
    <LegalLayout title="Polityka prywatności" updatedAt="28 kwietnia 2026">
      <section>
        <h2>Administrator danych</h2>
        <p>
          Administratorem danych jest operator serwisu prowadzący działalność lombardową i
          sprzedażową. Przed wdrożeniem produkcyjnym należy uzupełnić pełne dane firmy, adres,
          NIP oraz dedykowany adres kontaktowy ds. prywatności.
        </p>
      </section>
      <section>
        <h2>Zakres danych</h2>
        <p>
          Serwis może przetwarzać dane konta użytkownika, dane kontaktowe, dane zamówień,
          historię operacji, identyfikatory sesji, logi bezpieczeństwa oraz dane niezbędne do
          obsługi reklamacji i rozliczeń.
        </p>
      </section>
      <section>
        <h2>Cele i podstawy przetwarzania</h2>
        <p>
          Dane są przetwarzane w celu realizacji umowy, prowadzenia konta, obsługi płatności,
          spełnienia obowiązków podatkowych i rachunkowych, dochodzenia roszczeń oraz ochrony
          przed nadużyciami. Dla działań marketingowych i analitycznych należy uzyskiwać odrębne
          zgody tam, gdzie są wymagane.
        </p>
      </section>
      <section>
        <h2>Odbiorcy danych</h2>
        <p>
          Dane mogą być powierzane dostawcom hostingu, operatorom płatności, firmom kurierskim,
          dostawcom poczty elektronicznej, narzędziom analitycznym i podmiotom wspierającym
          bezpieczeństwo oraz utrzymanie systemu.
        </p>
      </section>
      <section>
        <h2>Okres przechowywania</h2>
        <p>
          Dane powinny być przechowywane przez okres niezbędny do realizacji celu, a następnie
          przez czas wynikający z obowiązków podatkowych, rachunkowych, konsumenckich i
          przedawnienia roszczeń.
        </p>
      </section>
      <section>
        <h2>Konto użytkownika</h2>
        <p>
          Zakładając konto przechowujemy Twój adres e-mail oraz — jeśli je
          podasz — dane profilu (imię i nazwisko, telefon, adres dostawy), aby
          przyspieszyć składanie zamówień. Możesz je w każdej chwili edytować w
          panelu konta, zmienić adres e-mail i hasło, a także trwale usunąć
          konto (zakładka „Prywatność”). Po usunięciu konta dane logowania są
          kasowane; złożone zamówienia pozostają przez okres wymagany
          przepisami podatkowymi i rachunkowymi.
        </p>
      </section>
      <section>
        <h2>Dane przechowywane lokalnie w przeglądarce</h2>
        <p>
          Dla wygody zakupów część danych zapisujemy wyłącznie w pamięci lokalnej Twojej
          przeglądarki (localStorage), a nie na naszych serwerach. Dotyczy to zawartości koszyka,
          ostatnich wyszukiwań, wyboru dotyczącego cookies oraz danych do formularza zamówienia
          (imię i nazwisko, adres e-mail, adres dostawy i wybrana metoda dostawy) — te ostatnie
          zapamiętujemy po złożeniu zamówienia, aby móc podpowiedzieć je przy kolejnych zakupach.
          Dane te pozostają na Twoim urządzeniu do czasu ich wyczyszczenia i są wysyłane do nas
          dopiero w chwili złożenia zamówienia. Możesz je w każdej chwili usunąć przyciskiem
          „Wyczyść” w formularzu zamówienia lub czyszcząc dane przeglądarki.
        </p>
      </section>
      <section>
        <h2>Prawa użytkownika</h2>
        <p>
          Użytkownik ma prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia
          przetwarzania, przenoszenia danych, wniesienia sprzeciwu oraz złożenia skargi do
          właściwego organu nadzorczego.
        </p>
      </section>
      <section>
        <h2>Wdrożenie produkcyjne</h2>
        <p>
          Ten dokument jest technicznym szkicem pod wdrożenie. W README projektu opisano zakres
          prac, które wymagają finalnej weryfikacji prawnej, w szczególności dla działalności
          lombardowej, AML/KYC, retencji danych i treści obowiązków informacyjnych.
        </p>
      </section>
    </LegalLayout>
  );
}
