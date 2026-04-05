import React from "react";
import styled from "styled-components";
import { FaFacebook, FaStore, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { LayoutInner } from "styles/layout";
import colors from "styles/colors";

const FooterContainer = styled.footer`
  background-color: ${colors.backgroundDark};
  color: ${colors.textInverse};
  padding: 40px 0;
  border-top: 1px solid ${colors.borderSubtle};
`;

const FooterInner = styled(LayoutInner)``;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;

  h4 {
    margin: 0 0 12px;
    font-size: 1rem;
    letter-spacing: 0.3px;
    color: ${colors.primary};
  }

  p,
  a {
    margin: 4px 0;
    font-size: 0.92rem;
    line-height: 1.45;
    color: #cccccc;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${colors.primaryLight};
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  margin-top: 10px;

  a {
    color: #f2f2f2;
    font-size: 1.2rem;
    width: 34px;
    height: 34px;
    border-radius: 8px;
    border: 1px solid #313131;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #171717;
    transition: color 0.2s ease, border-color 0.2s ease;

    &:hover {
      color: ${colors.primary};
      border-color: ${colors.primaryDark};
    }
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterInner>
        <FooterGrid>
          <Section>
            <h4>Kontakt</h4>
            <p>Al. Najświętszej Maryi Panny 1, 42-200 Częstochowa</p>
            <p>Telefon: +48 515 671 666</p>
            <p>Email: kontakt@lombard.pl</p>
          </Section>
          <Section>
            <h4>Usługi</h4>
            <p>Skup i sprzedaż biżuterii</p>
            <p>Pożyczki pod zastaw</p>
            <p>Ekspertyzy wartości</p>
          </Section>
          <Section>
            <h4>Godziny otwarcia</h4>
            <p>Poniedziałek - Piątek: 9:00 - 18:30</p>
            <p>Sobota: 9:00 - 15:00</p>
            <p>Niedziela: Nieczynne</p>
          </Section>
          <Section>
            <h4>Informacje prawne</h4>
            <Link href="/legal/privacy">Polityka prywatności</Link>
            <Link href="/legal/cookies">Polityka cookies</Link>
            <Link href="/legal/terms">Regulamin</Link>
          </Section>
          <Section>
            <h4>Śledź nas</h4>
            <SocialIcons>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </Link>
              <Link
                href="https://allegro.pl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaStore />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </Link>
            </SocialIcons>
          </Section>
        </FooterGrid>
        <p
          style={{
            marginTop: "24px",
            fontSize: "0.8rem",
            color: "#777",
            textAlign: "left",
          }}
        >
          Copyright &copy; 2024 - All Rights Reserved | Lombard.pl
        </p>
      </FooterInner>
    </FooterContainer>
  );
}
