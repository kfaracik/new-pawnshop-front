import React from "react";
import Link from "next/link";
import styled from "styled-components";
import colors from "styles/colors";
import CloverMark from "./CloverMark";

const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 11px;
  text-decoration: none;
  flex-shrink: 0;
`;

const Tile = styled.span`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${colors.black};
  border: 1px solid #232323;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.primary};
  flex-shrink: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  ${LogoLink}:hover & {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(201, 162, 39, 0.25);
  }
`;

const Name = styled.span`
  font-weight: 800;
  font-size: 18px;
  letter-spacing: -0.02em;
  color: ${colors.textPrimary};
  white-space: nowrap;
`;

export default function Logo() {
  return (
    <LogoLink href="/" aria-label="Nowy Lombard — strona główna">
      <Tile aria-hidden="true">
        <CloverMark size={22} />
      </Tile>
      <Name>Nowy Lombard</Name>
    </LogoLink>
  );
}
