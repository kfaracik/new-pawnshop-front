import React from "react";
import Center from "components/Center";
import styled, { keyframes } from "styled-components";
import ButtonLink from "components/ButtonLink";
import { FaDollarSign } from "react-icons/fa";

const Bg = styled.div`
  margin: 20px 0;
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  border-radius: 12px;
  color: #fff;
  padding: 40px 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  overflow: hidden;

  @media screen and (min-width: 768px) {
    padding: 60px;
  }
`;

const fadeIn = keyframes`
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
`;

const Title = styled.h1`
  margin: 0;
  font-weight: 700;
  font-size: 2rem;
  line-height: 1.2;
  color: #fff;
  text-align: center;
  animation: ${fadeIn} 0.8s ease-out;

  @media screen and (min-width: 768px) {
    font-size: 3rem;
    text-align: left;
  }
`;

const Desc = styled.p`
  color: #fff;
  font-size: 1rem;
  margin-top: 20px;
  line-height: 1.6;
  text-align: center;
  animation: ${fadeIn} 1s ease-out;

  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    text-align: left;
  }
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
    gap: 50px;
  }
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
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
  animation: ${fadeIn} 1.2s ease-out;

  @media screen and (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const IconAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const IconWrapper = styled.div`
  font-size: 4rem;
  color: #ffd700;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  animation: ${IconAnimation} 1.5s infinite;

  @media screen and (min-width: 768px) {
    font-size: 5rem;
  }
`;

export default function Slogan() {
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <Title>Pożyczki i zakupy w jednym!</Title>
            <Desc>
              Potrzebujesz gotówki? Zajrzyj do naszego lombardu i zyskaj szybki
              dostęp do gotówki lub skorzystaj z wyjątkowych ofert na produkty.
              Zakupy nigdy nie były prostsze!
            </Desc>
            <ButtonWrapper>
              <ButtonLink
                href={"/products"}
                outline={0}
                style={{
                  background: "#ffd700",
                  color: "#000",
                  fontWeight: "bold",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f4c10f")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#ffd700")
                }
              >
                Sprawdź ofertę
              </ButtonLink>
            </ButtonWrapper>
          </Column>
          <Column>
            <IconWrapper>
              <FaDollarSign />
              <FaDollarSign />
              <FaDollarSign />
            </IconWrapper>
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
