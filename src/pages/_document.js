import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html lang="pl">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Lombard oferujący szybkie pożyczki pod zastaw, sprzedaż i skup produktów, oraz usługi dla osób potrzebujących szybkiej gotówki. Zaufaj doświadczeniu!"
        />
        <meta
          name="keywords"
          content="lombard, pożyczki pod zastaw, szybkie pożyczki, sprzedaż, skup, lombard online, gotówka"
        />
        <meta name="author" content="Nowy Lombard" />
        <meta property="og:title" content="Nowy Lombard" />
        <meta
          property="og:description"
          content="Skorzystaj z oferty naszego lombardu, gdzie oferujemy szybkie pożyczki pod zastaw i inne usługi finansowe."
        />
        <meta property="og:image" content="/images/lombard-og-image.jpg" />
        <meta property="og:url" content="https://www.twoj-lombard.pl" />
        <meta property="og:type" content="website" />
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
