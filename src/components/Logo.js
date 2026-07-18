import React from "react";
import Link from "next/link";
import styled from "styled-components";
import colors from "styles/colors";

const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 11px;
  text-decoration: none;
  flex-shrink: 0;
`;

const Tile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(
    135deg,
    ${colors.primaryLight},
    ${colors.primary} 60%,
    ${colors.primaryDark}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.black};
  font-weight: 800;
  font-size: 20px;
  flex-shrink: 0;
`;

const LogoText = styled.div`
  line-height: 1;
`;

const Name = styled.div`
  font-weight: 800;
  font-size: 17px;
  letter-spacing: -0.01em;
  color: ${colors.textPrimary};
`;

const Sub = styled.div`
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${colors.primaryDark};
  margin-top: 3px;
  white-space: nowrap;

  @media screen and (max-width: 1080px) {
    display: none;
  }
`;

export default function Logo() {
  return (
    <LogoLink href="/" aria-label="Nowy Lombard — strona główna">
      <Tile aria-hidden="true">L</Tile>
      <LogoText>
        <Name>Nowy Lombard</Name>
        <Sub>Złoto · Zegarki · Elektronika</Sub>
      </LogoText>
    </LogoLink>
  );
}
