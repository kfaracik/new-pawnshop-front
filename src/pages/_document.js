import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="pl">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="author" content="Nowy Lombard" />
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
                  addressLocality: "Częstochowa",
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
}
