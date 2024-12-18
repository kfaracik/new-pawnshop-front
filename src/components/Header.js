import React, { useState, useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import {
  FaOpencart,
  FaTv,
  FaTshirt,
  FaHome,
  FaFootballBall,
} from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import BarsIcon from "assets/icons/Bars";
import { CartContext } from "./CartContext";
import colors from "styles/colors";

const StyledHeader = styled.header`
  background-color: #111;
  color: #fff;
  padding: 10px 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: padding-right 0.3s ease;
  @media screen and (max-width: 768px) {
    padding-right: 40px;
    flex-wrap: wrap;
  }
`;

// @ts-ignore
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

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 600px;
  margin-right: 40px;
  @media screen and (max-width: 768px) {
    max-width: 100%;
    margin-right: 20px;
    flex-wrap: wrap;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  background-color: #222;
  border: 1px solid #444;
  border-radius: 8px 0 0 8px;
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease, background-color 0.3s ease;
  &:focus {
    background-color: #333;
    border-color: ${colors.primary};
  }
  ::placeholder {
    color: #bbb;
  }
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SearchButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.grayLight};
  border: none;
  border-radius: 0 8px 8px 0;
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  &:hover {
    background-color: #c0392b;
    transform: scale(1.05);
  }
  @media screen and (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const DropdownButton = styled.button`
  background-color: #333;
  color: #fff;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 10px 15px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #222;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 50px;
  left: 0;
  background-color: #111;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 10px 0;
  list-style: none;
  z-index: 1000;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  color: #bbb;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #222;
    color: #fff;
  }
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 20px;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: ${(props) =>
      // @ts-ignore
      props.mobileNavActive ? "block" : "none"};
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

// @ts-ignore
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // @ts-ignore
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
      <Wrapper>
        <LogoLink href="/">
          Nowy <br /> Lombard
        </LogoLink>
        <SearchWrapper>
          <form
            onSubmit={handleSearchSubmit}
            style={{ display: "flex", flex: 1 }}
          >
            <SearchInput
              type="text"
              placeholder="Wyszukaj produkty..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <SearchButton>SZUKAJ</SearchButton>
          </form>
          <DropdownWrapper>
            <DropdownButton onClick={() => setDropdownOpen(!dropdownOpen)}>
              Kategorie <IoIosArrowDown />
            </DropdownButton>
            <DropdownMenu isOpen={dropdownOpen}>
              <DropdownItem>
                <FaTv /> Elektronika
              </DropdownItem>
              <DropdownItem>
                <FaTshirt /> Moda
              </DropdownItem>
              <DropdownItem>
                <FaHome /> Dom i Ogród
              </DropdownItem>
              <DropdownItem>
                <FaFootballBall /> Sport
              </DropdownItem>
            </DropdownMenu>
          </DropdownWrapper>
        </SearchWrapper>
        <CartIconWrapper>
          <CartIcon />
          {cartItemCount > 0 && <Badge>{cartItemCount}</Badge>}
        </CartIconWrapper>
        <StyledNav
          // @ts-ignore
          mobileNavActive={mobileNavActive}
        >
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
      </Wrapper>
    </StyledHeader>
  );
}
