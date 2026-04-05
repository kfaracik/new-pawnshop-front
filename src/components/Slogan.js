import React from "react";
import styled from "styled-components";
import ButtonLink from "components/ButtonLink";

const Bg = styled.div`
  margin: 20px 0;
  background: #0f0f0f;
  border: 1px solid #2c2c2c;
  border-radius: 10px;
  color: #f5f5f5;
  padding: 36px 20px;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.35);

  @media screen and (min-width: 768px) {
    padding: 48px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-weight: 700;
  font-size: 1.85rem;
  line-height: 1.2;
  color: #d4af37;
  text-align: center;

  @media screen and (min-width: 768px) {
    font-size: 2.3rem;
    text-align: left;
  }
`;

const Desc = styled.p`
  color: #d6d6d6;
  font-size: 1rem;
  margin-top: 16px;
  line-height: 1.6;
  text-align: center;

  @media screen and (min-width: 768px) {
    font-size: 1.08rem;
    text-align: left;
  }
`;

const ColumnsWrapper = styled.div`
  display: block;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    align-items: flex-start;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 18px;
  display: flex;
  justify-content: center;
  width: 100%;

  @media screen and (min-width: 768px) {
    justify-content: flex-start;
  }
`;

export default function Slogan() {
  return (
    <Bg>
      <ColumnsWrapper>
        <Column>
          <Title>Gotówka od ręki. Sprawdzone okazje.</Title>
          <Desc>
            Szybka wycena, minimum formalności i uczciwe warunki. Sprawdź
            ofertę produktów w cenach, które mają sens.
          </Desc>
          <ButtonWrapper>
            <ButtonLink
              href={"/products"}
              outline={0}
              style={{
                background: "#d4af37",
                color: "#111",
                fontWeight: 700,
                padding: "12px 24px",
                borderRadius: "8px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#e6c45f")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#d4af37")
              }
            >
              Zobacz oferty
            </ButtonLink>
          </ButtonWrapper>
        </Column>
      </ColumnsWrapper>
    </Bg>
  );
}
