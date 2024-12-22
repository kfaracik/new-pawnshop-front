import React from "react";
import Link from "next/link";
import styled from "styled-components";

const LogoLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-right: 10px;
  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    margin-right: 20px;
  }
`;

export default function Logo() {
  return (
    <LogoLink href="/">
      Nowy <br /> Lombard
    </LogoLink>
  );
}
