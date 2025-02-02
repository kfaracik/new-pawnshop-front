import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { FaOpencart, FaBars } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import colors from "styles/colors";

const NavLink = styled(Link)`
  color: #bbb;
  text-decoration: none;
  font-size: 1rem;
  padding: 10px;
  text-transform: uppercase;
  border-bottom: ${(props) =>
    props.active ? `2px solid ${colors.primary}` : "none"};
  transition: color 0.3s ease, border-color 0.3s ease;
  &:hover {
    color: ${colors.primary};
  }
  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
    padding: 15px;
  }
`;

const CartIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-width: 40px;
  height: 40px;
  color: #fff;
`;

const CartIcon = styled(FaOpencart)`
  font-size: 32px;
  color: #fff;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #e74c3c;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  padding: 5px;
  font-size: 12px;
  font-weight: bold;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 20px;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: ${(props) => (props.mobileNavActive ? "block" : "none")};
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #111;
    padding: 60px 20px;
    z-index: 999;
    overflow-y: auto;
    transition: transform 0.3s ease;
    transform: ${(props) =>
      props.mobileNavActive ? "translateX(0)" : "translateX(100%)"};
  }
`;

const MobileMenuButton = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    font-size: 30px;
    color: #fff;
    cursor: pointer;
  }
`;

export default function Menu() {
  const router = useRouter();
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const { getCartItemCount } = useContext(CartContext);

  const cartItemCount = getCartItemCount();

  const toggleMobileNav = () => setMobileNavActive((prev) => !prev);

  return (
    <>
      <StyledNav mobileNavActive={mobileNavActive}>
        <NavLink href="/" active={router.pathname === "/"}>
          Home
        </NavLink>
        <NavLink href="/products" active={router.pathname === "/products"}>
          Produkty
        </NavLink>
        <NavLink href="/contact" active={router.pathname === "/contact"}>
          Kontakt
        </NavLink>
        <NavLink href="/account" active={router.pathname === "/account"}>
          Konto
        </NavLink>
      </StyledNav>
      <Link href="/cart">
        <CartIconWrapper>
          <CartIcon />
          {cartItemCount > 0 && <Badge>{cartItemCount}</Badge>}
        </CartIconWrapper>
      </Link>
      <MobileMenuButton onClick={toggleMobileNav}>
        <FaBars />
      </MobileMenuButton>
    </>
  );
}
