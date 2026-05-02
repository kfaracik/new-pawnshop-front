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
