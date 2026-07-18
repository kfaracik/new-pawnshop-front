import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { LayoutInner } from "styles/layout";
import colors from "styles/colors";
import CloverMark from "./CloverMark";

const FACEBOOK_AUCTIONS_URL =
  process.env.NEXT_PUBLIC_FACEBOOK_AUCTIONS_URL || "https://www.facebook.com/";

const FooterContainer = styled.footer`
  margin-top: clamp(44px, 6vw, 72px);
  background: ${colors.black};
  color: #bdbdbd;
`;

const FooterGrid = styled(LayoutInner)`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
  gap: 32px;
  padding-top: clamp(36px, 5vw, 56px);
  padding-bottom: clamp(28px, 4vw, 40px);

  @media (max-width: 820px) {
    grid-template-columns: 1fr 1fr;
    gap: 26px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 16px;
`;

const BrandTile = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: #171717;
  border: 1px solid #2a2a2a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.primary};
`;

const BrandName = styled.div`
  font-weight: 800;
  font-size: 16px;
  color: #f5f5f5;
`;

const BrandText = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  max-width: 34ch;
  color: #8f8f8f;
`;

const ColTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${colors.primaryLight};
  margin-bottom: 14px;
`;

const ColList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;

  a {
    color: #bdbdbd;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${colors.primaryLight};
    }
  }

  span {
    color: #8f8f8f;
  }
`;

const BottomBar = styled.div`
  border-top: 1px solid #1f1f1f;
`;

const BottomInner = styled(LayoutInner)`
  padding-top: 18px;
  padding-bottom: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 13px;
  color: #6f6f6f;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterGrid>
        <div>
          <Brand>
            <BrandTile aria-hidden="true">
              <CloverMark size={20} />
            </BrandTile>
            <BrandName>Nowy Lombard</BrandName>
          </Brand>
          <BrandText>
            Uczciwe wyceny i sprawdzone okazje. Gotówka od ręki, bez zbędnych
            formalności.
          </BrandText>
        </div>

        <div>
          <ColTitle>Sklep</ColTitle>
          <ColList>
            <Link href="/products">Oferta</Link>
            <Link href="/search">Szukaj</Link>
            <a href={FACEBOOK_AUCTIONS_URL} target="_blank" rel="noreferrer">
              Licytacje
            </a>
            <Link href="/account">Konto</Link>
          </ColList>
        </div>

        <div>
          <ColTitle>Informacje</ColTitle>
          <ColList>
            <Link href="/contact">Kontakt</Link>
            <Link href="/legal/terms">Regulamin</Link>
            <Link href="/legal/privacy">Polityka prywatności</Link>
            <Link href="/legal/cookies">Polityka cookies</Link>
          </ColList>
        </div>

        <div>
          <ColTitle>Kontakt</ColTitle>
          <ColList>
            <span>Al. NMP 1, 42-200 Częstochowa</span>
            <a href="tel:+48515671666">+48 515 671 666</a>
            <a href="mailto:kontakt@lombard.pl">kontakt@lombard.pl</a>
            <span>pon–pt 9:00–18:30 · sob 9:00–15:00</span>
          </ColList>
        </div>
      </FooterGrid>

      <BottomBar>
        <BottomInner>
          <span>© 2026 Nowy Lombard. Wszystkie prawa zastrzeżone.</span>
          <span>Bezpieczne płatności · Szybka gotówka</span>
        </BottomInner>
      </BottomBar>
    </FooterContainer>
  );
}
