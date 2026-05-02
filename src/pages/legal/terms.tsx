import LegalLayout from "components/legal/LegalLayout";

export default function TermsPage() {
  return (
    <LegalLayout title="Regulamin" updatedAt="28 kwietnia 2026">
      <section>
        <h2>Postanowienia ogólne</h2>
        <p>
          Regulamin określa zasady korzystania z serwisu, tworzenia kont, składania zamówień,
          rezerwacji produktów i kontaktu z obsługą. Przed produkcją należy uzupełnić dane
          przedsiębiorcy i kanały kontaktowe.
        </p>
      </section>
      <section>
        <h2>Konto użytkownika</h2>
        <p>
          Użytkownik odpowiada za prawdziwość danych oraz bezpieczeństwo dostępu do konta. Serwis
          może blokować konto lub zamówienia w przypadku nadużyć, naruszenia prawa albo prób
          obejścia zabezpieczeń.
        </p>
      </section>
      <section>
        <h2>Zamówienia, ceny i dostępność</h2>
        <p>
          Informacje o cenie, dostępności, kosztach dostawy i sposobie płatności powinny być
          prezentowane przed złożeniem zamówienia. Umowa sprzedaży zostaje zawarta zgodnie z
          procesem checkoutu i potwierdzeniem przyjęcia zamówienia.
        </p>
      </section>
      <section>
        <h2>Produkty używane i lombardowe</h2>
        <p>
          Dla produktów używanych lub pochodzących z obrotu lombardowego należy jasno wskazywać
          stan, pochodzenie, ograniczenia odpowiedzialności w granicach prawa oraz zasady
          weryfikacji legalności pochodzenia towaru.
        </p>
      </section>
      <section>
        <h2>Reklamacje, odstąpienie i zwroty</h2>
        <p>
          Regulamin produkcyjny powinien zawierać pełne pouczenia konsumenckie, procedurę
          reklamacyjną, terminy odpowiedzi oraz przypadki, w których prawo odstąpienia jest
          wyłączone lub ograniczone zgodnie z przepisami.
        </p>
      </section>
      <section>
        <h2>Zakres dalszych prac</h2>
        <p>
          Jeśli model biznesowy obejmuje pożyczki pod zastaw, windykację, sprzedaż po terminie
          wykupu lub scoring klienta, zakres prawny wymaga odrębnego opracowania. Tę listę
          zapisałem również w README jako plan dalszych prac przed pełnym wdrożeniem.
        </p>
      </section>
    </LegalLayout>
  );
}
