import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
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
  display: none;

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

const DesktopMenuWrap = styled.div`
  position: relative;
  display: none;

  @media screen and (min-width: 769px) {
    display: block;
  }
`;

const DesktopMenuButton = styled.button`
  ${buttonBaseStyle}
  min-height: 38px;
  padding: 0 14px;
  background: transparent;
  border-color: #2b2b2b;
  color: #efefef;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: #3a3a3a;
  }
`;

const DesktopMenuPanel = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 260px;
  padding: 10px;
  border-radius: 14px;
  border: 1px solid #2b2b2b;
  background: rgba(18, 18, 18, 0.98);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
  display: ${(props) => (props.$open ? "grid" : "none")};
  gap: 4px;
  z-index: 1002;
`;

const DesktopMenuLabel = styled.p`
  margin: 6px 8px 2px;
  color: #8f8f8f;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const DesktopMenuLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  color: #ebebeb;
  text-decoration: none;
  border-radius: 10px;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: ${colors.primaryLight};
  }
`;

const DesktopExternalLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  color: #ebebeb;
  text-decoration: none;
  border-radius: 10px;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: ${colors.primaryLight};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  ${buttonBaseStyle}
  ${buttonGhostStyle}
  min-height: 36px;
  padding: 0;
  border-radius: 8px;

  @media screen and (max-width: 768px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    font-size: 24px;
    color: #fff;
    color: #fff;
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
    ${buttonBaseStyle}
    ${buttonGhostStyle}
    display: inline-flex;
    position: absolute;
    top: 16px;
    right: 14px;
    min-height: 36px;
    width: 36px;
    padding: 0;
    color: #f2f2f2;
    font-size: 20px;
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
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
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
  const closeDesktopMenu = () => setDesktopMenuOpen(false);

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
        closeDesktopMenu();
      }
    };

    if (mobileNavActive || desktopMenuOpen) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileNavActive, desktopMenuOpen]);

  useEffect(() => {
    if (!desktopMenuOpen) return undefined;

    const handleClickOutside = (event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (target.closest("[data-desktop-menu]")) return;
      setDesktopMenuOpen(false);
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [desktopMenuOpen]);

  return (
    <>
      <MobileBackdrop
        type="button"
        aria-label="Zamknij menu"
        mobileNavActive={mobileNavActive}
        onClick={closeMobileNav}
      />
      <HeaderActions>
        <DesktopMenuWrap data-desktop-menu>
          <DesktopMenuButton
            type="button"
            aria-haspopup="menu"
            aria-expanded={desktopMenuOpen}
            onClick={() => setDesktopMenuOpen((prev) => !prev)}
          >
            Menu <IoIosArrowDown />
          </DesktopMenuButton>
          <DesktopMenuPanel $open={desktopMenuOpen}>
            <DesktopMenuLink href="/" onClick={closeDesktopMenu}>Start</DesktopMenuLink>
            <DesktopMenuLink href="/products" onClick={closeDesktopMenu}>Produkty</DesktopMenuLink>
            <DesktopMenuLink href="/contact" onClick={closeDesktopMenu}>Kontakt</DesktopMenuLink>
            <DesktopMenuLink href="/account" onClick={closeDesktopMenu}>Konto</DesktopMenuLink>
            <DesktopExternalLink
              href={FACEBOOK_AUCTIONS_URL}
              target="_blank"
              rel="noreferrer"
              onClick={closeDesktopMenu}
            >
              Licytacje FB
            </DesktopExternalLink>
            {categories.length > 0 && (
              <>
                <DesktopMenuLabel>Kategorie</DesktopMenuLabel>
                {categories.slice(0, 6).map((category) => (
                  <DesktopMenuLink
                    key={category._id}
                    href={`/products?category=${encodeURIComponent(category._id)}&page=1`}
                    onClick={closeDesktopMenu}
                  >
                    {category.name}
                  </DesktopMenuLink>
                ))}
              </>
            )}
          </DesktopMenuPanel>
        </DesktopMenuWrap>
        <StyledNav
          aria-label="Nawigacja główna"
          mobileNavActive={mobileNavActive}
        >
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
        <Link href="/cart" aria-label={`Koszyk, liczba produktów: ${cartItemCount}`}>
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
