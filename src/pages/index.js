import React from "react";
import styled from "styled-components";
import {
  buttonBaseStyle,
  buttonPillStyle,
  buttonPrimaryStyle,
} from "components/Button";
import PageContainer from "components/PageContainer";
import SeoHead from "components/SeoHead";
import { useNewProducts } from "services/api/newProductsApi";
import { usePopularProducts } from "services/api/popularProductsApi";
import Slogan from "components/Slogan";
import HorizontalProductList from "components/HorizontalProductList";
import colors from "styles/colors";
import { getCanonicalUrl } from "lib/seo";

const FACEBOOK_AUCTIONS_URL =
  process.env.NEXT_PUBLIC_FACEBOOK_AUCTIONS_URL || "https://www.facebook.com/";

const AuctionsBanner = styled.section`
  margin: 24px 0 28px;
  padding: 22px;
  border-radius: 18px;
  background:
    linear-gradient(135deg, rgba(17, 17, 17, 0.96), rgba(36, 36, 36, 0.94)),
    radial-gradient(circle at top right, rgba(201, 162, 39, 0.25), transparent 42%);
  color: ${colors.textInverse};
  display: grid;
  gap: 12px;
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.16);
`;

const BannerEyebrow = styled.span`
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${colors.primaryLight};
`;

const BannerTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.4rem, 3vw, 2rem);
  line-height: 1.1;
`;

const BannerText = styled.p`
  margin: 0;
  max-width: 720px;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.6;
`;

const BannerButton = styled.a`
  ${buttonBaseStyle}
  ${buttonPrimaryStyle}
  ${buttonPillStyle}
  width: fit-content;
  margin-top: 4px;
  min-height: 46px;
  padding: 0 18px;
  text-decoration: none;
`;

export default function HomePage() {
  const { data: newProducts, isLoading: isLoadingNew } = useNewProducts();
  const { data: popularProducts, isLoading: isLoadingPopular } =
    usePopularProducts();
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Nowy Lombard",
    url: getCanonicalUrl("/"),
    areaServed: "PL",
    sameAs: [FACEBOOK_AUCTIONS_URL],
  };

  return (
    <PageContainer>
      <SeoHead
        title="Nowy Lombard | Produkty, licytacje i kontakt"
        description="Sprawdź aktualne produkty, oferty specjalne i licytacje Nowego Lombardu. Sprzedaż online, kontakt do oddziałów i szybki dostęp do aktualnych ofert."
        path="/"
        schema={organizationSchema}
      />
      <Slogan />
      <AuctionsBanner>
        <BannerEyebrow>Licytacje</BannerEyebrow>
        <BannerTitle>Aktualne licytacje znajdziesz na naszym Facebooku.</BannerTitle>
        <BannerText>
          Przeglądaj aktywne oferty, śledź nowe wystawienia i przejdź bezpośrednio do
          profilu z licytacjami.
        </BannerText>
        <BannerButton href={FACEBOOK_AUCTIONS_URL} target="_blank" rel="noreferrer">
          Przejdź do licytacji na Facebooku
        </BannerButton>
      </AuctionsBanner>
      <HorizontalProductList
        title="Nowości"
        products={newProducts}
        loading={isLoadingNew}
      />
      <HorizontalProductList
        title="Popularne"
        products={popularProducts}
        loading={isLoadingPopular}
      />
    </PageContainer>
  );
}
