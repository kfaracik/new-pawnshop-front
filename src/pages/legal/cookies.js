import React from "react";
import LegalLayout from "components/legal/LegalLayout";

export default function CookiesPage() {
  return (
    <LegalLayout title="Polityka cookies" updatedAt="5 kwietnia 2026">
      <section>
        <h2>Czym są cookies</h2>
        <p>Cookies to małe pliki zapisywane w przeglądarce, które pomagają utrzymać sesję i poprawiają działanie serwisu.</p>
      </section>
      <section>
        <h2>Rodzaje cookies</h2>
        <p>Stosujemy cookies niezbędne do działania strony oraz opcjonalne cookies analityczne, jeśli użytkownik wyrazi zgodę.</p>
      </section>
      <section>
        <h2>Zarządzanie zgodą</h2>
        <p>Ustawienia cookies możesz zmienić w przeglądarce. Brak zgody na cookies opcjonalne nie blokuje korzystania z podstawowych funkcji serwisu.</p>
      </section>
    </LegalLayout>
  );
}
