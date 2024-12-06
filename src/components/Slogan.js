import React from "react";
import Image from "next/image";
import Center from "components/Center";
import styled from "styled-components";
import ButtonLink from "components/ButtonLink";
import { FaDollarSign } from "react-icons/fa";

const Bg = styled.div`
  margin-top: 20px;
  background-color: #222;
  border-radius: 8px;
  color: #fff;
  padding: 20px;
  width: 100%;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.6);
`;

const Title = styled.h1`
  margin: 0;
  font-weight: bold;
  font-size: 1.5rem;
  color: #fff;
  text-align: center;

  @media screen and (min-width: 768px) {
    font-size: 2.5rem;
    text-align: left;
  }
`;

const Desc = styled.p`
  color: #bbb;
  font-size: 0.9rem;
  margin-top: 15px;
  line-height: 1.4;
  text-align: center;

  @media screen and (min-width: 768px) {
    font-size: 1rem;
    text-align: left;
  }
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.5fr 1fr;
    gap: 40px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 10px;

  @media screen and (min-width: 768px) {
    align-items: flex-start;
    padding: 0;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  width: 100%;

  @media screen and (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: #ffcc00;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    font-size: 5rem;
    margin-top: 20px;
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
              <ButtonLink href={"/products"} outline={1} white={1}>
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
