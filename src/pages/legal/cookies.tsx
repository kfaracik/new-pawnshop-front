import LegalLayout from "components/legal/LegalLayout";

export default function CookiesPage() {
  return (
    <LegalLayout title="Polityka cookies" updatedAt="28 kwietnia 2026">
      <section>
        <h2>Cookies niezbędne</h2>
        <p>
          Serwis wykorzystuje cookies i podobne technologie do utrzymania sesji, bezpieczeństwa,
          koszyka, preferencji użytkownika i poprawnego działania kluczowych funkcji.
        </p>
      </section>
      <section>
        <h2>Cookies opcjonalne</h2>
        <p>
          Narzędzia analityczne, marketingowe lub służące personalizacji powinny być aktywowane
          dopiero po uzyskaniu zgody użytkownika. W obecnej wersji baner zapisuje wybór użytkownika
          w pamięci lokalnej przeglądarki.
        </p>
      </section>
      <section>
        <h2>Zarządzanie zgodą</h2>
        <p>
          Użytkownik może ograniczyć działanie cookies w ustawieniach przeglądarki, przy czym może
          to wpłynąć na dostępność części funkcji. Zgoda na cookies opcjonalne powinna być
          możliwa do wycofania równie łatwo jak jej udzielenie.
        </p>
      </section>
      <section>
        <h2>Co wymaga domknięcia</h2>
        <p>
          Przed produkcją należy spiąć baner z rzeczywistymi skryptami analitycznymi, rejestrem
          zgód i finalną listą dostawców zewnętrznych.
        </p>
      </section>
    </LegalLayout>
  );
}
