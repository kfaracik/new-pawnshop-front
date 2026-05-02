import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html lang="pl">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="author" content="Nowy Lombard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PawnShop",
              name: "Nowy Lombard",
              description:
                "Nowy Lombard oferuje szybkie pożyczki pod zastaw oraz usługi związane z handlem produktami. Szeroka oferta i indywidualne podejście do klienta.",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                telephone: "+48 515 671 666",
                areaServed: "PL",
                availableLanguage: "Polish",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Al. Najświętszej Maryi Panny 1",
                addressLocality: "Cęstochowa",
                postalCode: "42-200",
                addressCountry: "PL",
              },
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
