import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import SeoHead from "components/SeoHead";
import PageContainer from "components/PageContainer";
import ProductList from "components/ProductList";
import { useProducts } from "services/api/productApi";
import { useCategories } from "services/api/categoryApi";
import { buttonBaseStyle, buttonSecondaryStyle } from "components/Button";
import { PageHead, PageTitle, PageMeta } from "components/PageHeading";
import colors from "styles/colors";

const PRODUCTS_PER_PAGE = 12;

const FilterScroller = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 2px 2px 12px;
  margin-bottom: 12px;
  scroll-snap-type: x proximity;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterChip = styled.button`
  flex: 0 0 auto;
  scroll-snap-align: start;
  min-height: 40px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid ${(props) => (props.$active ? colors.primary : "#e3e3e3")};
  background: ${(props) => (props.$active ? colors.primary : "#fff")};
  color: ${(props) => (props.$active ? colors.black : colors.textPrimary)};
  font-size: 0.92rem;
  font-weight: ${(props) => (props.$active ? 700 : 500)};
  white-space: nowrap;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, color 0.15s, transform 0.15s;

  &:hover {
    border-color: ${colors.primary};
    background: ${(props) => (props.$active ? colors.primaryLight : "#fff8e8")};
    transform: translateY(-1px);
  }
`;

const SortRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 16px;
`;

const SortLabel = styled.label`
  font-size: 0.88rem;
  color: ${colors.textSecondary};
  font-weight: 500;
`;

const SortSelect = styled.select`
  height: 40px;
  padding: 0 34px 0 14px;
  border-radius: 10px;
  border: 1px solid #e3e3e3;
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  color: ${colors.textPrimary};
  font-size: 0.92rem;
  font-weight: 500;
  cursor: pointer;
  appearance: none;
  transition: border-color 0.15s;

  &:hover,
  &:focus-visible {
    border-color: ${colors.primary};
  }
`;

const ErrorState = styled.div`
  display: grid;
  gap: 10px;
  padding: 40px 20px;
  border: 1px solid #f0d4d4;
  border-radius: 16px;
  background: #fff7f7;
  color: ${colors.textPrimary};

  h2,
  p {
    margin: 0;
  }

  p {
    color: ${colors.textSecondary};
  }
`;

const RetryButton = styled.button`
  ${buttonBaseStyle}
  ${buttonSecondaryStyle}
  justify-self: start;
`;

export default function ProductsPage() {
  const router = useRouter();
  const [page, setPage] = useState(Number(router.query.page) || 1);
  const selectedCategory = router.query.category || "";
  const selectedSort = router.query.sort || "";
  const { data: categoriesData } = useCategories();
  const categories = useMemo(() => {
    if (Array.isArray(categoriesData)) return categoriesData;
    if (Array.isArray(categoriesData?.categories)) return categoriesData.categories;
    return [];
  }, [categoriesData]);

  const { data, isLoading, isError } = useProducts(
    page,
    PRODUCTS_PER_PAGE,
    selectedCategory,
    selectedSort
  );

  const totalPages = Math.ceil((data?.total || 0) / PRODUCTS_PER_PAGE);

  useEffect(() => {
    setPage(Number(router.query.page) || 1);
  }, [router.query.page, selectedCategory, selectedSort]);

  const buildParams = ({ page: nextPage, category, sort }) => {
    const params = new URLSearchParams({ page: String(nextPage) });
    if (category) {
      params.set("category", String(category));
    }
    if (sort) {
      params.set("sort", String(sort));
    }
    return params;
  };

  const navigateWithCategory = (categoryId = "") => {
    setPage(1);
    const params = buildParams({ page: 1, category: categoryId, sort: selectedSort });
    router.push(`/products?${params.toString()}`, undefined, { shallow: true });
  };

  const handleSortChange = (sort) => {
    setPage(1);
    const params = buildParams({ page: 1, category: selectedCategory, sort });
    router.push(`/products?${params.toString()}`, undefined, { shallow: true });
  };

  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      setPage(newPage);
      const params = buildParams({
        page: newPage,
        category: selectedCategory,
        sort: selectedSort,
      });
      router.push(`/products?${params.toString()}`, undefined, { shallow: true });
    }
  };

  const seoPath = `/products${
    router.asPath.includes("?") ? router.asPath.slice("/products".length) : ""
  }`;

  const filterBar = (
    <FilterScroller role="tablist" aria-label="Filtruj po kategorii">
      <FilterChip
        type="button"
        role="tab"
        aria-selected={!selectedCategory}
        $active={!selectedCategory}
        onClick={() => navigateWithCategory("")}
      >
        Wszystkie
      </FilterChip>
      {categories.map((category) => (
        <FilterChip
          key={category._id}
          type="button"
          role="tab"
          aria-selected={String(category._id) === String(selectedCategory)}
          $active={String(category._id) === String(selectedCategory)}
          onClick={() => navigateWithCategory(category._id)}
        >
          {category.name}
        </FilterChip>
      ))}
    </FilterScroller>
  );

  return (
    <PageContainer>
      <SeoHead
        title="Wszystkie produkty | Nowy Lombard"
        description="Przeglądaj wszystkie dostępne produkty Nowego Lombardu. Filtruj oferty i przechodź do szczegółów produktu."
        path={seoPath}
      />
      <PageHead>
        <PageTitle>Wszystkie produkty</PageTitle>
        {!isLoading && !isError && (
          <PageMeta>{data?.total || 0} ofert</PageMeta>
        )}
      </PageHead>
      {filterBar}
      <SortRow>
        <SortLabel htmlFor="product-sort">Sortuj:</SortLabel>
        <SortSelect
          id="product-sort"
          value={selectedSort}
          onChange={(event) => handleSortChange(event.target.value)}
        >
          <option value="">Najnowsze</option>
          <option value="price_asc">Cena: od najniższej</option>
          <option value="price_desc">Cena: od najwyższej</option>
          <option value="popular">Najpopularniejsze</option>
        </SortSelect>
      </SortRow>
      {isError ? (
        <ErrorState>
          <h2>Nie udało się załadować produktów</h2>
          <p>Sprawdź połączenie lub spróbuj ponownie za chwilę.</p>
          <RetryButton type="button" onClick={() => router.reload()}>
            Spróbuj ponownie
          </RetryButton>
        </ErrorState>
      ) : (
        <ProductList
          products={data?.products || []}
          loading={isLoading}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          selectedPage={page}
        />
      )}
    </PageContainer>
  );
}
