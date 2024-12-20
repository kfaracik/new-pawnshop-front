import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { FaTv, FaTshirt, FaHome, FaFootballBall } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import colors from "styles/colors";

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

export default function SearchWithCategory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
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
  );
}
