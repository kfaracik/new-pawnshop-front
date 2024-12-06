import React, { useState, useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import Center from "components/Center";
import { FaOpencart } from "react-icons/fa";
import BarsIcon from "assets/icons/Bars";
import { CartContext } from "./CartContext";

const StyledHeader = styled.header`
  background-color: #111;
  color: #fff;
  padding: 20px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
  transition: padding-right 0.3s ease;
  @media screen and (max-width: 768px) {
    padding-right: 40px;
  }
`;

const LogoLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-right: 40px;
  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    margin-right: 20px;
  }
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 400px;
  margin-right: 40px;
  @media screen and (max-width: 768px) {
    margin-right: 20px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  min-width: 200px;
  padding: 10px 20px;
  padding-left: 35px;
  background-color: #333;
  border: 2px solid #444;
  border-radius: 30px;
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease, background-color 0.3s ease;
  &:focus {
    background-color: #222;
    border-color: #e74c3c;
  }
  ::placeholder {
    color: #bbb;
  }
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
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
  }
`;

const NavLink = styled(Link)`
  color: #bbb;
  text-decoration: none;
  font-size: 1rem;
  padding: 10px;
  text-transform: uppercase;
  border-bottom: ${(props) => (props.active ? "2px solid #e74c3c" : "none")};
  transition: color 0.3s ease, border-color 0.3s ease;
  &:hover {
    color: #e74c3c;
  }
  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
    padding: 15px;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: none;
  color: #fff;
  cursor: pointer;
  z-index: 10;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const CartIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-width: 30px;
  height: 30px;
  color: #fff;
`;

const CartIcon = styled(FaOpencart)`
  font-size: 24px;
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

export default function Header() {
  const router = useRouter();
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getCartItemCount } = useContext(CartContext);

  const cartItemCount = getCartItemCount();

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <LogoLink href="/">
            Nowy <br /> Lombard
          </LogoLink>
          <SearchInputWrapper>
            <form onSubmit={handleSearchSubmit}>
              <SearchInput
                type="text"
                placeholder="Wyszukaj produkty..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </form>
          </SearchInputWrapper>
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
            <NavLink href="/cart" active={router.pathname === "/cart"}>
              <CartIconWrapper>
                <CartIcon />
                {cartItemCount > 0 && <Badge>{cartItemCount}</Badge>}
              </CartIconWrapper>
            </NavLink>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
