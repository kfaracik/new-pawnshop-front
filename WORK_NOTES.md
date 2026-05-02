# Zakres Prac

## Accessibility

- Dodano skip link do treści.
- Dodano globalne stany `focus-visible`.
- Dodano wsparcie dla `prefers-reduced-motion`.
- Poprawiono dostępność wyszukiwarki i dropdownu kategorii.
- Poprawiono semantykę i dostępność części nawigacji oraz modali.

## Technical Debt

- Projekt nadal nie jest w pełni feature-based.
- W kodzie pozostały legacy pliki JS wymagające migracji do TS.
- Wciąż istnieją miejsca z bezpośrednim użyciem `<img>` zamiast `next/image`.
- Część logiki stron nadal jest zbyt duża i powinna zostać wydzielona do feature modules.

## Animations

- Animacje są wystarczające dla MVP, ale powinny pozostać oszczędne.
- Najważniejsze było dodanie obsługi `prefers-reduced-motion`, aby nie obciążać użytkowników wrażliwych na ruch.
- Dalsze prace: ujednolicić motion tokens i ograniczyć dekoracyjne animacje na stronach produktowych.

## Dalsze kroki

- Migracja `ProductItem`, `Menu`, `SearchWithCategory` i stron produktowych do pełnego TS.
- Dokończenie wymiany pozostałych obrazów na `next/image`.
- Dalszy podział na `features/catalog`, `features/search`, `features/cart`, `features/account`.
- Dokończenie integracji checkoutu ze Stripe po stronie API, webhooków i statusów płatności.

## Postęp refaktoru dużych plików

- Strona `src/pages/product/[id].js` została częściowo rozbita:
  - SEO/schema do `src/features/product/lib/seo.js`
  - panel aukcji do `src/features/product/components/AuctionPanel.js`
  - galeria produktu do `src/features/product/components/ProductGallery.js`
- `src/components/ProductItem.js` i `src/pages/cart.js` mają już zoptymalizowane renderowanie obrazów przez `next/image`.
- `src/pages/cart.js` ma już wizualne etapy checkoutu, wybór dostawy i warstwę UX przygotowaną pod Stripe.
- Kolejni kandydaci do dalszego zmniejszania:
  - `src/pages/cart.js`
  - `src/components/Menu.js`
  - `src/components/ProductItem.js`

## Plan Stripe

- Dodać backendowy `paymentIntent` lub sesję Stripe Checkout generowaną z finalnej kwoty i metody dostawy.
- Przeniesiono koszt dostawy i wybraną metodę z UI do modelu zamówienia oraz walidacji backendu.
- Dodać webhook Stripe do potwierdzania płatności i aktualizacji `paymentStatus`.
- Rozdzielić statusy: `draft`, `pending_payment`, `paid`, `payment_failed`, `fulfilled`.
- Dla wyboru `stripe_card` zapisujemy już `paymentSessionStatus: sandbox_ready`, ale bez tworzenia realnej sesji.
