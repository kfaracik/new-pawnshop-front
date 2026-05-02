# New Pawnshop Front

Customer storefront built with Next.js.

## Current state

- TypeScript foundation added with incremental migration support.
- Core app shell, cart context, axios client, cookie banner and legal pages are migrated to TS.
- Legal pages and consent banner were expanded to cover production placeholders and compliance gaps.
- Current app still uses the `pages` router and contains legacy JS modules that should be migrated gradually.

## Architecture

- The project is not fully feature-based yet.
- Current structure is mostly layer-based: `components`, `pages`, `services`, `styles`, `utils`.
- A minimal design-system layer now exists in `src/design-system`.
- For scalable growth, new work should prefer feature slices such as `features/catalog`, `features/checkout`, `features/account`, with shared UI staying in `components`.

## Required environment variables

```env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com/api/v1
```

## Scripts

```bash
npm run dev
npm run build
npm run start
```

## Production checklist

- Replace placeholder legal company data with real entity details.
- Connect cookie choices to actual analytics/marketing tags.
- Review remaining image optimization gaps and replace raw `<img>` where still needed.
- Add error boundaries, monitoring and checkout analytics.
- Finish TypeScript migration of remaining pages/components/services.

Current implementation notes:

- Product grid cards and cart items now use optimized Next image rendering with lazy loading semantics.
- Checkout has a visual payment and delivery flow prepared for future Stripe integration, without enabling live payment yet.
- Orders now persist delivery method, delivery price, payment method and checkout session preparation state.

## Planned legal work

The storefront now has baseline privacy, cookies and terms pages, but pawnshop-specific production release still needs legal review for:

- consumer disclosures for used and pawn-origin goods,
- withdrawal and complaint rules for remote sales,
- wording around item condition, provenance and liability,
- GDPR notices for account, order and anti-fraud processing,
- optional AML/KYC notices if checkout or reservation flow collects identity data.
