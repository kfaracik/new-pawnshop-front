import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { FiSearch, FiX } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { buttonBaseStyle, buttonPrimaryStyle } from "components/Button";
import colors from "styles/colors";
import { useCategories } from "services/api/categoryApi";

const RECENT_SEARCHES_KEY = "recentSearches";
const MAX_RECENT_SEARCHES = 5;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 100%;
  margin: 0;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    padding: 0 12px;
    box-sizing: border-box;
  }
`;

const SearchForm = styled.form`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  flex: 1;
  width: 100%;
  min-width: 0;
`;

const SearchField = styled.div`
  position: relative;
  min-width: 0;
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #8f8f8f;
  pointer-events: none;
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
  width: 100%;
  min-width: 0;
  padding: 12px 44px 12px 42px;
  background-color: #1a1a1a;
  border: 1px solid #2f2f2f;
  border-radius: 8px 0 0 8px;
  color: #fff;
  font-size: 1rem;
  outline: none;
  box-shadow: none;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &:focus {
    background-color: #202020;
    border-color: ${colors.primary};
  }

  &::placeholder {
    color: #8f8f8f;
  }
`;

const ClearButton = styled.button`
  ${buttonBaseStyle}
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%) !important;
  width: 34px;
  height: 34px;
  min-height: 34px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #cfcfcf;

  &:hover {
    background: #282828;
    color: #fff;
  }
`;

const SearchButton = styled.button`
  ${buttonBaseStyle}
  ${buttonPrimaryStyle}
  min-height: auto;
  border-radius: 0 8px 8px 0;
  padding: 12px 18px;
  transform: none !important;
  white-space: nowrap;

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  @media screen and (max-width: 420px) {
    padding-inline: 14px;
  }
`;

const SuggestionMenu = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 1000;
  display: ${(props) => (props.$open ? "grid" : "none")};
  gap: 4px;
  padding: 8px;
  border: 1px solid #2f2f2f;
  border-radius: 8px;
  background: #141414;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.28);
`;

const SuggestionHeader = styled.div`
  padding: 4px 6px;
  color: #8f8f8f;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const SuggestionButton = styled.button`
  ${buttonBaseStyle}
  justify-content: flex-start;
  min-height: 36px;
  padding: 8px 10px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #f1f1f1;
  font-size: 0.92rem;
  text-align: left;

  &:hover {
    background: #1f1f1f;
    color: ${colors.primaryLight};
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const DropdownButton = styled.button`
  ${buttonBaseStyle}
  min-height: 42px;
  padding: 0 8px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: #d2d2d2;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
  box-shadow: none;

  svg {
    width: 16px;
    height: 16px;
    opacity: 0.8;
  }

  &:hover {
    color: ${colors.textInverse};
    background: #1a1a1a;
    border-color: #2f2f2f;
    transform: none;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const CategorySelect = styled.select`
  display: none;
  width: 100%;
  padding: 11px 12px;
  border: 1px solid #2f2f2f;
  border-radius: 8px;
  background: #1a1a1a;
  color: #f1f1f1;
  font-size: 0.95rem;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  background-color: #141414;
  border: 1px solid #2f2f2f;
  border-radius: 8px;
  padding: 8px 0;
  list-style: none;
  z-index: 1000;
  display: ${(props) => (props.$open ? "block" : "none")};
  min-width: 240px;
  max-height: min(420px, calc(100vh - 160px));
  overflow-y: auto;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.28);
`;

const DropdownItem = styled.li`
  display: flex;
`;

const CategoryButton = styled.button`
  width: 100%;
  min-height: 38px;
  padding: 10px 16px;
  color: ${(props) => (props.$active ? colors.primaryLight : "#cfcfcf")};
  cursor: pointer;
  border: 0;
  background: ${(props) => (props.$active ? "#1f1f1f" : "transparent")};
  text-align: left;
  font-weight: ${(props) => (props.$active ? 700 : 500)};

  &:hover {
    background-color: #1f1f1f;
    color: ${colors.primaryLight};
  }
`;

const getQueryParam = (value) => (Array.isArray(value) ? value[0] || "" : value || "");

const normalizeQuery = (value) => String(value || "").trim().slice(0, 80);

const readRecentSearches = () => {
  if (typeof window === "undefined") return [];

  try {
    const value = JSON.parse(window.localStorage.getItem(RECENT_SEARCHES_KEY) || "[]");
    return Array.isArray(value) ? value.filter(Boolean).slice(0, MAX_RECENT_SEARCHES) : [];
  } catch {
    return [];
  }
};

const saveRecentSearch = (query) => {
  if (typeof window === "undefined" || !query) return [];

  const nextSearches = [
    query,
    ...readRecentSearches().filter((item) => item.toLowerCase() !== query.toLowerCase()),
  ].slice(0, MAX_RECENT_SEARCHES);

  window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(nextSearches));
  return nextSearches;
};

export default function SearchWithCategory() {
  const router = useRouter();
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const { data: categoriesData, isLoading: isCategoriesLoading } = useCategories();

  const categories = useMemo(() => {
    if (Array.isArray(categoriesData)) return categoriesData;
    if (Array.isArray(categoriesData?.categories)) return categoriesData.categories;
    return [];
  }, [categoriesData]);

  const selectedCategoryName = useMemo(() => {
    if (!selectedCategory) return "Kategorie";
    return categories.find((category) => String(category._id) === String(selectedCategory))?.name || "Kategorie";
  }, [categories, selectedCategory]);

  const canSearch = Boolean(normalizeQuery(searchQuery) || selectedCategory);
  const shouldShowRecentSearches = suggestionsOpen && recentSearches.length > 0 && !searchQuery.trim();

  useEffect(() => {
    setSearchQuery(getQueryParam(router.query.query));
    setSelectedCategory(getQueryParam(router.query.category));
  }, [router.query.query, router.query.category]);

  useEffect(() => {
    setRecentSearches(readRecentSearches());
  }, []);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setDropdownOpen(false);
        setSuggestionsOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
        setSuggestionsOpen(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const submitSearch = (query = searchQuery, category = selectedCategory) => {
    const normalizedQuery = normalizeQuery(query);
    const params = new URLSearchParams({ page: "1" });

    if (normalizedQuery) {
      params.set("query", normalizedQuery);
      setRecentSearches(saveRecentSearch(normalizedQuery));
    }

    if (category) {
      params.set("category", String(category));
    }

    if (!normalizedQuery && !category) {
      inputRef.current?.focus();
      return;
    }

    setDropdownOpen(false);
    setSuggestionsOpen(false);
    router.push(`/search?${params.toString()}`);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    submitSearch();
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setDropdownOpen(false);
    submitSearch(searchQuery, categoryId);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  return (
    <SearchWrapper ref={rootRef}>
      <SearchForm role="search" onSubmit={handleSearchSubmit}>
        <SearchField>
          <VisuallyHiddenLabel htmlFor="site-search">Wyszukaj produkty</VisuallyHiddenLabel>
          <SearchIcon aria-hidden="true" />
          <SearchInput
            ref={inputRef}
            id="site-search"
            name="query"
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            placeholder="Czego szukasz?"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value.slice(0, 80));
              setSuggestionsOpen(true);
            }}
            onFocus={() => setSuggestionsOpen(true)}
          />
          {searchQuery && (
            <ClearButton
              type="button"
              aria-label="Wyczyść wyszukiwanie"
              onClick={handleClearSearch}
            >
              <FiX />
            </ClearButton>
          )}
          <SuggestionMenu $open={shouldShowRecentSearches}>
            <SuggestionHeader>Ostatnie wyszukiwania</SuggestionHeader>
            {recentSearches.map((item) => (
              <SuggestionButton
                key={item}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  setSearchQuery(item);
                  submitSearch(item);
                }}
              >
                {item}
              </SuggestionButton>
            ))}
          </SuggestionMenu>
        </SearchField>
        <SearchButton type="submit" disabled={!canSearch}>
          Szukaj
        </SearchButton>
      </SearchForm>

      <DropdownWrapper>
        <DropdownButton
          type="button"
          aria-haspopup="menu"
          aria-expanded={dropdownOpen}
          aria-controls="category-menu"
          onClick={() => setDropdownOpen((isOpen) => !isOpen)}
        >
          {selectedCategoryName} <IoIosArrowDown />
        </DropdownButton>
        <CategorySelect
          aria-label="Wybierz kategorię"
          value={selectedCategory}
          disabled={isCategoriesLoading}
          onChange={(event) => handleCategorySelect(event.target.value)}
        >
          <option value="">Wszystkie kategorie</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </CategorySelect>
        <DropdownMenu id="category-menu" role="menu" $open={dropdownOpen}>
          <DropdownItem>
            <CategoryButton
              type="button"
              role="menuitem"
              $active={!selectedCategory}
              onClick={() => handleCategorySelect("")}
            >
              Wszystkie kategorie
            </CategoryButton>
          </DropdownItem>
          {isCategoriesLoading ? (
            <DropdownItem>
              <CategoryButton type="button" disabled>
                Ładowanie kategorii...
              </CategoryButton>
            </DropdownItem>
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <DropdownItem key={category._id}>
                <CategoryButton
                  type="button"
                  role="menuitem"
                  $active={String(category._id) === String(selectedCategory)}
                  onClick={() => handleCategorySelect(category._id)}
                >
                  {category.name}
                </CategoryButton>
              </DropdownItem>
            ))
          ) : (
            <DropdownItem>
              <CategoryButton type="button" disabled>
                Brak kategorii
              </CategoryButton>
            </DropdownItem>
          )}
        </DropdownMenu>
      </DropdownWrapper>
    </SearchWrapper>
  );
}
