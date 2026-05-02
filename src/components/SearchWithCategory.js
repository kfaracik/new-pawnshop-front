import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import {
  buttonBaseStyle,
  buttonDarkStyle,
  buttonPrimaryStyle,
} from "components/Button";
import colors from "styles/colors";
import { useCategories } from "services/api/categoryApi";

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    max-width: 100%;
    margin: 0;
    flex-wrap: wrap;
    padding: 0 12px;
    box-sizing: border-box;
  }
`;

const SearchForm = styled.form`
  display: flex;
  flex: 1;
  width: 100%;
  min-width: 0;
`;

const VisuallyHiddenLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  padding: 12px 15px;
  background-color: #1a1a1a;
  border: 1px solid #2f2f2f;
  border-radius: 8px 0 0 8px;
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease, background-color 0.2s ease;
  &:focus {
    background-color: #202020;
    border-color: ${colors.primary};
  }
  ::placeholder {
    color: #8f8f8f;
  }
  @media screen and (max-width: 768px) {
    font-size: 1rem;
    width: 100%;
  }
`;

const SearchButton = styled.button`
  ${buttonBaseStyle}
  ${buttonPrimaryStyle}
  min-height: auto;
  border-radius: 0 8px 8px 0;
  padding: 12px 20px;
  transform: none !important;
  @media screen and (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const DropdownButton = styled.button`
  ${buttonBaseStyle}
  ${buttonDarkStyle}
  min-height: auto;
  border-radius: 8px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 50px;
  left: 0;
  background-color: #141414;
  border: 1px solid #2f2f2f;
  border-radius: 8px;
  padding: 10px 0;
  list-style: none;
  z-index: 1000;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  min-width: 220px;
`;

const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: #cfcfcf;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 0;
  width: 100%;
  background: transparent;
  text-align: left;
  &:hover {
    background-color: #1f1f1f;
    color: ${colors.primaryLight};
  }
`;

export default function SearchWithCategory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const { data: categoriesData, isLoading: isCategoriesLoading } = useCategories();

  const categories = useMemo(() => {
    if (Array.isArray(categoriesData)) return categoriesData;
    if (Array.isArray(categoriesData?.categories)) return categoriesData.categories;
    return [];
  }, [categoriesData]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams({
        query: searchQuery.trim(),
      });
      if (router.query.category) {
        params.set("category", String(router.query.category));
      }
      router.push(`/search?${params.toString()}`);
    }
  };

  const handleCategorySelect = (categoryId) => {
    setDropdownOpen(false);
    router.push(`/products?category=${encodeURIComponent(categoryId)}&page=1`);
  };

  return (
    <SearchWrapper>
      <SearchForm onSubmit={handleSearchSubmit}>
        <VisuallyHiddenLabel htmlFor="site-search">
          Wyszukaj produkty
        </VisuallyHiddenLabel>
        <SearchInput
          id="site-search"
          name="query"
          type="text"
          placeholder="Wyszukaj produkty..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <SearchButton type="submit">SZUKAJ</SearchButton>
      </SearchForm>
      <DropdownWrapper>
        <DropdownButton
          type="button"
          aria-haspopup="menu"
          aria-expanded={dropdownOpen}
          aria-controls="category-menu"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          Kategorie <IoIosArrowDown />
        </DropdownButton>
        <DropdownMenu id="category-menu" role="menu" isOpen={dropdownOpen}>
          {isCategoriesLoading ? (
            <DropdownItem as="div" aria-live="polite">Ładowanie kategorii...</DropdownItem>
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <DropdownItem
                as="button"
                type="button"
                role="menuitem"
                key={category._id}
                onClick={() => handleCategorySelect(category._id)}
              >
                {category.name}
              </DropdownItem>
            ))
          ) : (
            <DropdownItem as="div">Brak kategorii</DropdownItem>
          )}
        </DropdownMenu>
      </DropdownWrapper>
    </SearchWrapper>
  );
}
