import React from "react";
import Image from "next/image";
import Center from "components/Center";
import styled from "styled-components";
import ButtonLink from "components/ButtonLink";
import { FaDollarSign } from "react-icons/fa"; // Ikona pieniędzy

const Bg = styled.div`
  margin-top: 20px;
  background-color: #222;
  border-radius: 8px;
  color: #fff;
  padding: 50px 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.6);
`;

const Title = styled.h1`
  margin: 0;
  font-weight: bold;
  font-size: 1.8rem;
  color: #fff;
  @media screen and (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Desc = styled.p`
  color: #bbb;
  font-size: 1rem;
  margin-top: 15px;
  line-height: 1.5;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  width: 100%;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.5fr 1fr;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  /* Zmienione na center, aby ikona była wyśrodkowana */
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;  /* Zmniejszyłem margines */
  display: flex;
  justify-content: center; /* Wyrównanie przycisku do środka */
  width: 100%;
`;

const IconWrapper = styled.div`
  font-size: 5rem;  /* Zwiększyłem rozmiar ikony */
  color: #ffcc00;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; /* Dodano margines między ikoną a tytułem */
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
            </IconWrapper>
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
