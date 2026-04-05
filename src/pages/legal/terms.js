import React from "react";
import LegalLayout from "components/legal/LegalLayout";

export default function TermsPage() {
  return (
    <LegalLayout title="Regulamin" updatedAt="5 kwietnia 2026">
      <section>
        <h2>Postanowienia ogólne</h2>
        <p>Regulamin określa zasady korzystania z serwisu, zakupu produktów oraz kontaktu z obsługą.</p>
      </section>
      <section>
        <h2>Konto użytkownika</h2>
        <p>Użytkownik odpowiada za poprawność danych konta oraz bezpieczeństwo dostępu do hasła.</p>
      </section>
      <section>
        <h2>Zamówienia i płatności</h2>
        <p>Złożenie zamówienia oznacza akceptację ceny i warunków realizacji. Szczegóły płatności i dostawy są podawane przed finalizacją zamówienia.</p>
      </section>
      <section>
        <h2>Reklamacje i zwroty</h2>
        <p>Reklamacje i zgłoszenia są obsługiwane drogą e-mailową pod adresem kontakt@lombard.pl.</p>
      </section>
    </LegalLayout>
  );
}
