import React, { useEffect, useState, useContext } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { CartContext } from "../context/CartContext";
import { buttonBaseStyle, buttonGhostStyle } from "components/Button";
import colors from "styles/colors";
import { useCategories } from "services/api/categoryApi";

const FACEBOOK_AUCTIONS_URL =
  process.env.NEXT_PUBLIC_FACEBOOK_AUCTIONS_URL || "https://www.facebook.com/";

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

const ExternalNavLink = styled.a`
  color: #d0d0d0;
  text-decoration: none;
  font-size: 0.95rem;
  padding: 8px 10px;
  text-transform: none;
  border-bottom: 2px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: ${colors.grayLight};
    border-bottom-color: ${colors.primary};
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
  min-width: 44px;
  height: 44px;
  color: ${colors.textPrimary};
  border: 1px solid #e0e0e0;
  border-radius: 11px;
  background: #fff;
  transition: border-color 0.15s ease, background 0.15s ease;
  &:hover {
    border-color: ${colors.primary};
    background: #fff8e8;
  }
`;

const CartIcon = styled(FiShoppingCart)`
  font-size: 20px;
  color: ${colors.textPrimary};
  cursor: pointer;
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
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(86vw, 340px);
  background-color: #0f0f0f;
  border-left: 1px solid #232323;
  padding: 24px 18px 24px;
  z-index: 2001;
  overflow-y: auto;
  box-shadow: -24px 0 60px rgba(0, 0, 0, 0.5);
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
  transform: ${(props) =>
    props.mobileNavActive ? "translateX(0)" : "translateX(101%)"};
`;

const DrawerBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 4px 8px 18px;
  margin-bottom: 8px;
  border-bottom: 1px solid #232323;
  color: ${colors.primary};
  font-weight: 800;
  font-size: 16px;

  span {
    color: #f5f5f5;
  }
`;

const MenuButton = styled.button`
  ${buttonBaseStyle}
  ${buttonGhostStyle}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: 11px;
  font-size: 22px;
  color: ${colors.textSecondary};

  &:hover {
    background: #f2f2f2;
    color: ${colors.primaryDark};
  }

  @media screen and (min-width: 1024px) {
    display: none;
  }
`;

const DesktopNav = styled.nav`
  display: none;

  @media screen and (min-width: 1024px) {
    display: flex;
    align-items: center;
    gap: 2px;
    margin-right: 6px;
  }
`;

const DesktopNavLink = styled(Link)`
  color: ${colors.textSecondary};
  text-decoration: none;
  font-size: 0.94rem;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 9px;
  white-space: nowrap;
  transition: color 0.15s ease, background 0.15s ease;
  color: ${(props) => (props.$active ? colors.primaryDark : colors.textSecondary)};
  background: ${(props) => (props.$active ? "#fff8e8" : "transparent")};

  &:hover {
    color: ${colors.primaryDark};
    background: #f6f6f6;
  }
`;

const DesktopExternalLink = styled.a`
  color: ${colors.textSecondary};
  text-decoration: none;
  font-size: 0.94rem;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 9px;
  white-space: nowrap;
  transition: color 0.15s ease, background 0.15s ease;

  &:hover {
    color: ${colors.primaryDark};
    background: #f6f6f6;
  }
`;

const IconButton = styled.button`
  ${buttonBaseStyle}
  ${buttonGhostStyle}
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: 11px;
  border: 1px solid #e0e0e0;
  background: #fff;
  font-size: 19px;
  color: ${colors.textPrimary};

  &:hover {
    border-color: ${colors.primary};
    background: #fff8e8;
    color: ${colors.primaryDark};
  }

  @media screen and (min-width: 1024px) {
    display: inline-flex;
  }
`;

const MobileBackdrop = styled.button`
  display: block;
  position: fixed;
  inset: 0;
  border: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  z-index: 2000;
  opacity: ${(props) => (props.mobileNavActive ? 1 : 0)};
  pointer-events: ${(props) => (props.mobileNavActive ? "auto" : "none")};
  transition: opacity 0.28s ease;
`;

const CloseButton = styled.button`
  ${buttonBaseStyle}
  ${buttonGhostStyle}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 18px;
  right: 14px;
  min-height: 36px;
  width: 36px;
  padding: 0;
  border-radius: 10px;
  color: #f2f2f2;
  font-size: 20px;

  &:hover {
    background: #1c1c1c;
    color: ${colors.primaryLight};
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MobileCategorySection = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    width: 100%;
    margin-top: 6px;
    border-top: 1px solid #2b2b2b;
    padding-top: 10px;
  }
`;

const MobileCategoryTitle = styled.p`
  margin: 0 0 8px;
  padding: 0 15px;
  color: #a7a7a7;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const MobileCategoryLink = styled(Link)`
  display: block;
  color: #d0d0d0;
  text-decoration: none;
  font-size: 1rem;
  padding: 10px 15px;

  &:hover {
    color: ${colors.grayLight};
  }
`;

export default function Menu() {
  const router = useRouter();
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { getCartItemCount } = useContext(CartContext);
  const { data: categoriesData } = useCategories();
  const categories = Array.isArray(categoriesData)
    ? categoriesData
    : Array.isArray(categoriesData?.categories)
      ? categoriesData.categories
      : [];

  const cartItemCount = getCartItemCount();

  const toggleMobileNav = () => setMobileNavActive((prev) => !prev);
  const closeMobileNav = () => setMobileNavActive(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    closeMobileNav();
  }, [router.asPath]);

  useEffect(() => {
    if (!mobileNavActive) return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavActive]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMobileNav();
      }
    };

    if (mobileNavActive) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileNavActive]);

  const drawer = (
    <>
      <MobileBackdrop
        type="button"
        aria-label="Zamknij menu"
        mobileNavActive={mobileNavActive}
        onClick={closeMobileNav}
        tabIndex={mobileNavActive ? 0 : -1}
      />
      <StyledNav
        aria-label="Nawigacja główna"
        aria-hidden={!mobileNavActive}
        mobileNavActive={mobileNavActive}
      >
        <DrawerBrand>
          Nowy <span>Lombard</span>
        </DrawerBrand>
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
        <ExternalNavLink
          href={FACEBOOK_AUCTIONS_URL}
          target="_blank"
          rel="noreferrer"
          onClick={closeMobileNav}
        >
          Licytacje FB
        </ExternalNavLink>
        <NavLink
          href="/account"
          $active={router.pathname === "/account"}
          onClick={closeMobileNav}
        >
          Konto
        </NavLink>
        <MobileCategorySection>
          <MobileCategoryTitle>Kategorie</MobileCategoryTitle>
          {categories.map((category) => (
            <MobileCategoryLink
              key={category._id}
              href={`/products?category=${encodeURIComponent(category._id)}&page=1`}
              onClick={closeMobileNav}
            >
              {category.name}
            </MobileCategoryLink>
          ))}
        </MobileCategorySection>
      </StyledNav>
    </>
  );

  return (
    <>
      <HeaderActions>
        <DesktopNav aria-label="Nawigacja główna">
          <DesktopNavLink href="/products" $active={router.pathname === "/products"}>
            Produkty
          </DesktopNavLink>
          <DesktopExternalLink
            href={FACEBOOK_AUCTIONS_URL}
            target="_blank"
            rel="noreferrer"
          >
            Licytacje
          </DesktopExternalLink>
          <DesktopNavLink href="/contact" $active={router.pathname === "/contact"}>
            Kontakt
          </DesktopNavLink>
        </DesktopNav>
        <Link href="/account" aria-label="Twoje konto">
          <IconButton as="span">
            <FiUser />
          </IconButton>
        </Link>
        <Link href="/cart" aria-label={`Koszyk, liczba produktów: ${cartItemCount}`}>
          <CartIconWrapper>
            <CartIcon />
            {cartItemCount > 0 && <Badge>{cartItemCount}</Badge>}
          </CartIconWrapper>
        </Link>
        <MenuButton
          type="button"
          aria-label={mobileNavActive ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={mobileNavActive}
          onClick={toggleMobileNav}
        >
          <FaBars />
        </MenuButton>
      </HeaderActions>
      {mounted ? createPortal(drawer, document.body) : null}
    </>
  );
}
