import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import colors from "styles/colors";

const STORAGE_KEY = "cookie-consent-v1";

const Banner = styled.aside`
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 16px;
  z-index: 1200;
  background: ${colors.backgroundDark};
  border: 1px solid #2f2f2f;
  color: ${colors.textInverse};
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);

  @media (min-width: 768px) {
    left: auto;
    width: min(560px, calc(100vw - 32px));
  }
`;

const Text = styled.p`
  margin: 0;
  line-height: 1.45;
  color: #dddddd;
  font-size: 0.9rem;

  a {
    color: ${colors.primaryLight};
    text-decoration: underline;
  }
`;

const Actions = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Btn = styled.button`
  border: 1px solid ${(props) => (props.primary ? colors.primaryDark : "#3a3a3a")};
  background: ${(props) => (props.primary ? colors.primary : "#1b1b1b")};
  color: ${(props) => (props.primary ? colors.primaryContrastText : "#e8e8e8")};
  border-radius: 9px;
  padding: 8px 12px;
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
`;

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const consent = window.localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const saveConsent = (value) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ value, updatedAt: new Date().toISOString() })
    );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Banner role="dialog" aria-live="polite" aria-label="Ustawienia cookies">
      <Text>
        Używamy plików cookie, aby zapewnić prawidłowe działanie serwisu i poprawiać jakość usług.
        Szczegóły znajdziesz w <Link href="/legal/cookies">Polityce cookies</Link>.
      </Text>
      <Actions>
        <Btn type="button" primary onClick={() => saveConsent("accepted")}>Akceptuję</Btn>
        <Btn type="button" onClick={() => saveConsent("essential")}>Tylko niezbędne</Btn>
      </Actions>
    </Banner>
  );
}
