import React from "react";
import Link from "next/link";
import styled from "styled-components";
import PageContainer from "components/PageContainer";
import SeoHead from "components/SeoHead";
import { useNewProducts } from "services/api/newProductsApi";
import { usePopularProducts } from "services/api/popularProductsApi";
import { useCategories } from "services/api/categoryApi";
import HorizontalProductList from "components/HorizontalProductList";
import colors from "styles/colors";
import { getCanonicalUrl } from "lib/seo";

const FACEBOOK_AUCTIONS_URL =
  process.env.NEXT_PUBLIC_FACEBOOK_AUCTIONS_URL || "https://www.facebook.com/";

const Hero = styled.section`
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  background: ${colors.black};
  color: #f5f5f5;
  padding: clamp(32px, 5vw, 64px);
  min-height: 380px;
  display: flex;
  align-items: center;
  margin: 8px 0 0;
`;

const HeroPattern = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.55;
`;

const HeroGlow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    80% 100% at 90% 10%,
    rgba(225, 199, 106, 0.24) 0%,
    rgba(225, 199, 106, 0) 55%
  );
`;

const HeroInner = styled.div`
  position: relative;
  max-width: 640px;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border: 1px solid #2c2c2c;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${colors.primaryLight};
  margin-bottom: 22px;

  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${colors.primary};
  }
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-size: clamp(34px, 5vw, 58px);
  line-height: 1.04;
  font-weight: 800;
  letter-spacing: -0.02em;

  span {
    color: ${colors.primaryLight};
  }
`;

const HeroText = styled.p`
  margin: 20px 0 0;
  max-width: 48ch;
  font-size: clamp(15px, 1.5vw, 18px);
  line-height: 1.6;
  color: #bdbdbd;
`;

const HeroActions = styled.div`
  display: flex;
  gap: 13px;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const HeroPrimary = styled(Link)`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  min-height: 50px;
  padding: 0 26px;
  border-radius: 11px;
  font-weight: 700;
  font-size: 1rem;
  background: ${colors.primary};
  border: 1px solid ${colors.primaryDark};
  color: ${colors.black};
  transition: all 0.2s;

  &:hover {
    background: ${colors.primaryLight};
    transform: translateY(-1px);
    box-shadow: 0 12px 28px rgba(201, 162, 39, 0.3);
  }
`;

const HeroGhost = styled.a`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  min-height: 50px;
  padding: 0 26px;
  border-radius: 11px;
  font-weight: 700;
  font-size: 1rem;
  background: transparent;
  border: 1px solid #3a3a3a;
  color: #f5f5f5;
  transition: all 0.2s;

  &:hover {
    border-color: ${colors.primary};
    color: ${colors.primaryLight};
  }
`;

const Section = styled.section`
  margin-top: clamp(36px, 5vw, 52px);
`;

const SectionHead = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 800;
  letter-spacing: -0.01em;
  color: ${colors.textPrimary};
`;

const SectionLink = styled(Link)`
  text-decoration: none;
  color: ${colors.primaryDark};
  font-weight: 700;
  font-size: 14px;
  white-space: nowrap;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 14px;
`;

const CategoryChip = styled(Link)`
  text-decoration: none;
  background: ${colors.backgroundPaper};
  border: 1px solid #ececec;
  border-radius: 14px;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: ${colors.textPrimary};
  transition: all 0.18s;

  &:hover {
    border-color: ${colors.primary};
    color: ${colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(201, 162, 39, 0.14);
  }
`;

const CategoryIcon = styled.span`
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: #fff8e8;
  color: ${colors.primaryDark};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategoryName = styled.span`
  font-weight: 700;
  font-size: 15px;
`;

const TrustGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
`;

const TrustCard = styled.div`
  background: ${colors.backgroundPaper};
  border: 1px solid #ececec;
  border-radius: 16px;
  padding: 22px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TrustIcon = styled.span`
  width: 46px;
  height: 46px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #fff8e8;
  color: ${colors.primaryDark};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TrustTitle = styled.div`
  font-weight: 700;
  font-size: 15px;
  color: ${colors.textPrimary};
`;

const TrustSub = styled.div`
  font-size: 13px;
  color: ${colors.grayDark};
  margin-top: 2px;
`;

const AuctionsBanner = styled.section`
  position: relative;
  overflow: hidden;
  margin-top: clamp(36px, 5vw, 52px);
  border-radius: 20px;
  background: ${colors.black};
  padding: clamp(28px, 4vw, 44px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
`;

const AuctionsRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  flex-wrap: wrap;
`;

const AuctionsInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  min-width: 0;
`;

const FbTile = styled.span`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 16px;
  background: #1877f2;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(24, 119, 242, 0.4);
`;

const AuctionsBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px;
  border: 1px solid #2c2c2c;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${colors.primaryLight};
  margin-bottom: 10px;

  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${colors.primary};
    animation: pulseDot 1.8s ease-in-out infinite;
  }

  @keyframes pulseDot {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }
`;

const AuctionsTitle = styled.h3`
  margin: 0;
  font-size: clamp(20px, 2.4vw, 28px);
  line-height: 1.15;
  font-weight: 800;
  color: #f5f5f5;
  letter-spacing: -0.01em;
`;

const AuctionsText = styled.p`
  margin: 8px 0 0;
  font-size: 14.5px;
  color: #bdbdbd;
  max-width: 52ch;
  line-height: 1.5;
`;

const AuctionsButton = styled.a`
  flex-shrink: 0;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 52px;
  padding: 0 26px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  background: ${colors.primary};
  border: 1px solid ${colors.primaryDark};
  color: ${colors.black};
  transition: all 0.2s;

  &:hover {
    background: ${colors.primaryLight};
    transform: translateY(-1px);
    box-shadow: 0 12px 28px rgba(201, 162, 39, 0.32);
  }
`;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const CloverPattern = () => (
  <HeroPattern preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 500" fill="none">
    <defs>
      <pattern id="hero-clover" width="60" height="60" patternUnits="userSpaceOnUse">
        <path
          d="M30 6 L54 30 L30 54 L6 30 Z"
          fill="none"
          stroke={colors.primary}
          strokeWidth="0.9"
          strokeOpacity="0.32"
        />
        <g transform="translate(30 30) scale(0.44)" fill={colors.primary} fillOpacity="0.36">
          {[0, 90, 180, 270].map((deg) => (
            <path
              key={deg}
              d="M0,0 C0,0 -9,-7.5 -9,-12.5 C-9,-15.5 -6.5,-17 -4,-17 C-2,-17 -0.5,-15.5 0,-14.5 C0.5,-15.5 2,-17 4,-17 C6.5,-17 9,-15.5 9,-12.5 C9,-7.5 0,0 0,0 Z"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>
      </pattern>
    </defs>
    <rect width="1200" height="500" fill="url(#hero-clover)" />
  </HeroPattern>
);

const GemIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" {...stroke}>
    <path d="M6 3h12l3 6-9 12L3 9z" />
    <path d="M3 9h18" />
    <path d="M12 3l4 6-4 12-4-12z" />
  </svg>
);

const TRUST = [
  {
    title: "Bezpieczna transakcja",
    sub: "Umowa i gwarancja odkupu",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...stroke}>
        <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Gotówka od ręki",
    sub: "Wypłata w 15 minut",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...stroke}>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M6 9v6M18 9v6" />
      </svg>
    ),
  },
  {
    title: "20 lat doświadczenia",
    sub: "Zaufany od 2004 roku",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...stroke}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
];

const FacebookGlyph = ({ size = 30, fill = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
  </svg>
);

export default function HomePage() {
  const { data: newProducts, isLoading: isLoadingNew } = useNewProducts();
  const { data: popularProducts, isLoading: isLoadingPopular } = usePopularProducts();
  const { data: categories } = useCategories();

  const categoryList = Array.isArray(categories) ? categories.slice(0, 8) : [];

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

      <Hero>
        <CloverPattern />
        <HeroGlow />
        <HeroInner>
          <Badge>
            <span /> Oferta
          </Badge>
          <HeroTitle>
            Gotówka od ręki.
            <br />
            <span>Sprawdzone okazje.</span>
          </HeroTitle>
          <HeroText>
            Szybka wycena, minimum formalności i uczciwe warunki. Sprawdź ofertę
            produktów w cenach, które mają sens.
          </HeroText>
          <HeroActions>
            <HeroPrimary href="/products">Przeglądaj ofertę</HeroPrimary>
            <HeroGhost href={FACEBOOK_AUCTIONS_URL} target="_blank" rel="noreferrer">
              Zobacz licytacje
            </HeroGhost>
          </HeroActions>
        </HeroInner>
      </Hero>

      {categoryList.length > 0 && (
        <Section>
          <SectionHead>
            <SectionTitle>Kategorie</SectionTitle>
            <SectionLink href="/products">Zobacz wszystko →</SectionLink>
          </SectionHead>
          <CategoryGrid>
            {categoryList.map((category) => (
              <CategoryChip
                key={category._id}
                href={`/products?category=${category._id}&page=1`}
              >
                <CategoryIcon>
                  <GemIcon />
                </CategoryIcon>
                <CategoryName>{category.name}</CategoryName>
              </CategoryChip>
            ))}
          </CategoryGrid>
        </Section>
      )}

      <Section>
        <HorizontalProductList
          title="Polecane okazje"
          products={newProducts}
          loading={isLoadingNew}
        />
      </Section>

      <Section>
        <HorizontalProductList
          title="Popularne"
          products={popularProducts}
          loading={isLoadingPopular}
        />
      </Section>

      <AuctionsBanner>
        <CloverPattern />
        <HeroGlow />
        <AuctionsRow>
          <AuctionsInfo>
            <FbTile>
              <FacebookGlyph />
            </FbTile>
            <div style={{ minWidth: 0 }}>
              <AuctionsBadge>
                <span /> Aukcje na żywo
              </AuctionsBadge>
              <AuctionsTitle>
                Aktualne licytacje znajdziesz na naszym Facebooku
              </AuctionsTitle>
              <AuctionsText>
                Nowe przedmioty, licytacje na żywo i najlepsze okazje ogłaszamy w
                naszej społeczności.
              </AuctionsText>
            </div>
          </AuctionsInfo>
          <AuctionsButton href={FACEBOOK_AUCTIONS_URL} target="_blank" rel="noreferrer">
            <FacebookGlyph size={20} fill={colors.black} />
            Przejdź do licytacji
          </AuctionsButton>
        </AuctionsRow>
      </AuctionsBanner>

      <Section>
        <TrustGrid>
          {TRUST.map((item) => (
            <TrustCard key={item.title}>
              <TrustIcon>{item.icon}</TrustIcon>
              <div>
                <TrustTitle>{item.title}</TrustTitle>
                <TrustSub>{item.sub}</TrustSub>
              </div>
            </TrustCard>
          ))}
        </TrustGrid>
      </Section>
    </PageContainer>
  );
}
