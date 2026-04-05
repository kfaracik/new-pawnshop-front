import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { CartContext } from "../context/CartContext";
import colors from "styles/colors";

const NavLink = styled(Link)`
  color: #d0d0d0;
  text-decoration: none;
  font-size: 0.95rem;
  padding: 8px 10px;
  text-transform: none;
  border-bottom: ${(props) =>
    props.$active ? `2px solid ${colors.primary}` : "2px solid transparent"};
  transition: color 0.2s ease, border-color 0.2s ease;
  white-space: nowrap;
  &:hover {
    color: ${colors.grayLight};
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
  min-width: 36px;
  height: 36px;
  color: #fff;
  border: 1px solid #2f2f2f;
  border-radius: 8px;
  background: #171717;
`;

const CartIcon = styled(FiShoppingCart)`
  font-size: 20px;
  color: #f1f1f1;
  cursor: pointer;
  transition: color 0.2s ease;
  &:hover {
    color: ${colors.primaryLight};
  }
`;

const Badge = styled.div`
  position: absolute;
  top: -4px;
  right: -6px;
  background-color: ${colors.primary};
  color: #111;
  border-radius: 50%;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 8px;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(82vw, 320px);
    background-color: #121212;
    border-left: 1px solid #2b2b2b;
    padding: 72px 18px 18px;
    z-index: 1001;
    overflow-y: auto;
    transition: transform 0.25s ease;
    transform: ${(props) =>
      props.mobileNavActive ? "translateX(0)" : "translateX(100%)"};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;

  @media screen and (max-width: 768px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    font-size: 24px;
    color: #fff;
    cursor: pointer;
  }
`;

const MobileBackdrop = styled.button`
  display: none;

  @media screen and (max-width: 768px) {
    display: ${(props) => (props.mobileNavActive ? "block" : "none")};
    position: fixed;
    inset: 0;
    border: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 1000;
  }
`;

const CloseButton = styled.button`
  display: none;

  @media screen and (max-width: 768px) {
    display: inline-flex;
    position: absolute;
    top: 16px;
    right: 14px;
    border: 0;
    background: transparent;
    color: #f2f2f2;
    font-size: 20px;
    cursor: pointer;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default function Menu() {
  const router = useRouter();
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const { getCartItemCount } = useContext(CartContext);

  const cartItemCount = getCartItemCount();

  const toggleMobileNav = () => setMobileNavActive((prev) => !prev);
  const closeMobileNav = () => setMobileNavActive(false);

  useEffect(() => {
    if (!mobileNavActive) return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavActive]);

  return (
    <>
      <MobileBackdrop
        type="button"
        aria-label="Zamknij menu"
        mobileNavActive={mobileNavActive}
        onClick={closeMobileNav}
      />
      <HeaderActions>
        <StyledNav mobileNavActive={mobileNavActive}>
          <CloseButton type="button" aria-label="Zamknij menu" onClick={closeMobileNav}>
            <FaTimes />
          </CloseButton>
          <NavLink href="/" $active={router.pathname === "/"} onClick={closeMobileNav}>
            Home
          </NavLink>
          <NavLink
            href="/products"
            $active={router.pathname === "/products"}
            onClick={closeMobileNav}
          >
            Produkty
          </NavLink>
          <NavLink
            href="/contact"
            $active={router.pathname === "/contact"}
            onClick={closeMobileNav}
          >
            Kontakt
          </NavLink>
          <NavLink
            href="/account"
            $active={router.pathname === "/account"}
            onClick={closeMobileNav}
          >
            Konto
          </NavLink>
        </StyledNav>
        <Link href="/cart">
          <CartIconWrapper>
            <CartIcon />
            {cartItemCount > 0 && <Badge>{cartItemCount}</Badge>}
          </CartIconWrapper>
        </Link>
        <MobileMenuButton
          type="button"
          aria-label={mobileNavActive ? "Zamknij menu" : "Otwórz menu"}
          onClick={toggleMobileNav}
        >
          <FaBars />
        </MobileMenuButton>
      </HeaderActions>
    </>
  );
}
