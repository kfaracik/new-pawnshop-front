import React from "react";
import styled from "styled-components";
import {
  buttonPillStyle,
  buttonPrimaryStyle,
} from "components/Button";
import ButtonLink from "components/ButtonLink";
import colors from "styles/colors";

const BannerShell = styled.section`
  margin: 24px 0 28px;
  padding: 24px;
  border-radius: 18px;
  background:
    linear-gradient(135deg, rgba(17, 17, 17, 0.96), rgba(36, 36, 36, 0.94)),
    radial-gradient(circle at top right, rgba(201, 162, 39, 0.25), transparent 42%);
  color: ${colors.textInverse};
  display: grid;
  gap: 12px;
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.16);

  @media screen and (min-width: 768px) {
    padding: 28px;
  }
`;

const BannerLayout = styled.div`
  display: grid;
  gap: 18px;
  align-items: center;

  @media screen and (min-width: 960px) {
    grid-template-columns: minmax(0, 1.3fr) minmax(220px, 320px);
    gap: 24px;
  }
`;

const BannerContent = styled.div`
  display: grid;
  gap: 12px;
  min-width: 0;
`;

const Eyebrow = styled.span`
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${colors.primaryLight};
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(1.4rem, 3vw, 2rem);
  line-height: 1.1;
  color: ${colors.textInverse};

  @media screen and (min-width: 768px) {
    text-align: left;
  }
`;

const Desc = styled.p`
  margin: 0;
  max-width: 720px;
  color: rgba(255, 255, 255, 0.82);
  font-size: 1rem;
  line-height: 1.6;
`;

const ButtonWrapper = styled.div`
  margin-top: 4px;
`;

const BannerButton = styled(ButtonLink)`
  ${buttonPrimaryStyle}
  ${buttonPillStyle}
  width: fit-content;
  min-height: 46px;
  padding: 0 18px;
`;

const BannerIllustration = styled.img`
  display: none;
  width: 100%;
  max-width: 320px;
  justify-self: end;
  border-radius: 18px;

  @media screen and (min-width: 960px) {
    display: block;
  }
`;

export default function Slogan() {
  return (
    <BannerShell>
      <BannerLayout>
        <BannerContent>
          <Eyebrow>Oferta</Eyebrow>
          <Title>Gotówka od ręki. Sprawdzone okazje.</Title>
          <Desc>
            Szybka wycena, minimum formalności i uczciwe warunki. Sprawdź
            ofertę produktów w cenach, które mają sens.
          </Desc>
          <ButtonWrapper>
            <BannerButton href="/products">Zobacz oferty</BannerButton>
          </ButtonWrapper>
        </BannerContent>
        <BannerIllustration
          src="/cash-offer-illustration.svg"
          alt="Ilustracja banknotów symbolizująca szybką gotówkę i ofertę lombardu."
        />
      </BannerLayout>
    </BannerShell>
  );
}
