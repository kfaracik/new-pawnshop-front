import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { FaClover } from "react-icons/fa6";
import colors from "styles/colors";

const LogoLink = styled(Link)`
  color: ${colors.textInverse};
  text-decoration: none;
  font-size: 1.85rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-right: 10px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  @media screen and (max-width: 768px) {
    font-size: 1.4rem;
    margin-right: 20px;
  }
`;

const CloverIcon = styled(FaClover)`
  color: ${colors.primary};
  font-size: 1.25em;
  flex-shrink: 0;
  transform: rotate(45deg);
`;

const LogoText = styled.span`
  line-height: 1.05;
`;

export default function Logo() {
  return (
    <LogoLink href="/">
      <CloverIcon aria-hidden="true" />
      <LogoText>
        Nowy <br /> Lombard
      </LogoText>
    </LogoLink>
  );
}
