import React from "react";
import LegalLayout from "components/legal/LegalLayout";

export default function PrivacyPage() {
  return (
    <LegalLayout title="Polityka prywatności" updatedAt="5 kwietnia 2026">
      <section>
        <h2>Administrator danych</h2>
        <p>Administratorem danych jest Nowy Lombard. W sprawach prywatności skontaktuj się pod adresem: kontakt@lombard.pl.</p>
      </section>
      <section>
        <h2>Zakres danych</h2>
        <p>Przetwarzamy dane podane podczas zakładania konta, składania zamówienia i kontaktu, w szczególności e-mail, dane adresowe i historię zamówień.</p>
      </section>
      <section>
        <h2>Cel i podstawa</h2>
        <p>Dane przetwarzamy w celu realizacji zamówień, obsługi konta oraz wypełnienia obowiązków prawnych, zgodnie z RODO.</p>
      </section>
      <section>
        <h2>Prawa użytkownika</h2>
        <p>Masz prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania oraz wniesienia sprzeciwu.</p>
      </section>
    </LegalLayout>
  );
}
