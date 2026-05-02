import { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import {
  buttonBaseStyle,
  buttonDarkStyle,
  buttonPrimaryStyle,
} from "components/Button";
import colors from "styles/colors";

const STORAGE_KEY = "cookie-consent-v1";

type ConsentValue = "accepted" | "essential";

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

const Btn = styled.button<{ $primary?: boolean }>`
  ${buttonBaseStyle}
  ${({ $primary }) => ($primary ? buttonPrimaryStyle : buttonDarkStyle)}
  min-height: 40px;
  padding: 0 14px;
  font-size: 0.86rem;
`;

const saveConsent = (value: ConsentValue) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      value,
      analytics: value === "accepted",
      updatedAt: new Date().toISOString(),
    })
  );
};

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const consent = window.localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleConsent = (value: ConsentValue) => {
    saveConsent(value);
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <Banner role="dialog" aria-live="polite" aria-label="Ustawienia cookies">
      <Text>
        Używamy plików cookie niezbędnych do działania serwisu oraz opcjonalnych narzędzi
        analitycznych po uzyskaniu zgody. Szczegóły znajdziesz w{" "}
        <Link href="/legal/cookies">Polityce cookies</Link> i{" "}
        <Link href="/legal/privacy">Polityce prywatności</Link>.
      </Text>
      <Actions>
        <Btn type="button" $primary onClick={() => handleConsent("accepted")}>
          Akceptuję wszystkie
        </Btn>
        <Btn type="button" onClick={() => handleConsent("essential")}>
          Tylko niezbędne
        </Btn>
      </Actions>
    </Banner>
  );
}
