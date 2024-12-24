import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaFacebook, FaStore, FaInstagram } from "react-icons/fa";
import Link from "next/link";

const FooterContainer = styled.footer`
  background-color: #111;
  color: #fff;
  padding: 40px 20px;
  text-align: center;
  position: relative;
  max-height: ${(props) => (props.isVisible ? "500px" : "0")};
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  transition: max-height 0.8s ease-in-out, opacity 0.7s ease-in-out;
  overflow: hidden; /* Ukrywa nadmiar treści, gdy max-height = 0 */
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h4 {
    margin-bottom: 15px;
    font-size: 1.2rem;
    color: #fff;
    text-transform: uppercase;
  }

  p,
  a {
    margin: 5px 0;
    font-size: 0.9rem;
    color: #ccc;
    text-decoration: none;

    &:hover {
      color: #e74c3c;
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;

  a {
    color: #fff;
    font-size: 1.5rem;

    &:hover {
      color: #e74c3c;
    }
  }
`;

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <FooterContainer ref={footerRef} isVisible={isVisible}>
      <FooterGrid>
        <Section>
          <h4>Kontakt</h4>
          <p>ul. Główna 123, 00-001 Miasto</p>
          <p>Telefon: +48 123 456 789</p>
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
      <p style={{ marginTop: "20px", fontSize: "0.8rem", color: "#666" }}>
        Copyright &copy; 2024 - All Rights Reserved | Lombard.pl
      </p>
    </FooterContainer>
  );
}
