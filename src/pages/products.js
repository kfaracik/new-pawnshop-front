import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import SeoHead from "components/SeoHead";
import PageContainer from "components/PageContainer";
import ProductList from "components/ProductList";
import { useProducts } from "services/api/productApi";
import { useCategories } from "services/api/categoryApi";
import { buttonBaseStyle, buttonSecondaryStyle } from "components/Button";
import colors from "styles/colors";

const PRODUCTS_PER_PAGE = 8;

const HeaderRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
  margin: 8px 0 16px;
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.01em;
  color: ${colors.textPrimary};
`;

const OfferCount = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${colors.primaryDark};
`;

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
  const { data: categoriesData } = useCategories();
  const categories = useMemo(() => {
    if (Array.isArray(categoriesData)) return categoriesData;
    if (Array.isArray(categoriesData?.categories)) return categoriesData.categories;
    return [];
  }, [categoriesData]);

  const { data, isLoading, isError } = useProducts(
    page,
    PRODUCTS_PER_PAGE,
    selectedCategory
  );

  const totalPages = Math.ceil((data?.total || 0) / PRODUCTS_PER_PAGE);

  useEffect(() => {
    setPage(Number(router.query.page) || 1);
  }, [router.query.page, selectedCategory]);

  const navigateWithCategory = (categoryId = "") => {
    const params = new URLSearchParams({ page: "1" });
    if (categoryId) {
      params.set("category", String(categoryId));
    }
    setPage(1);
    router.push(`/products?${params.toString()}`, undefined, { shallow: true });
  };

  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      setPage(newPage);
      const params = new URLSearchParams({ page: String(newPage) });
      if (selectedCategory) {
        params.set("category", String(selectedCategory));
      }
      router.push(`/products?${params.toString()}`, undefined, { shallow: true });
      const scroller = document.getElementById("__next");
      (scroller || window).scrollTo({ top: 0, behavior: "smooth" });
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
      <HeaderRow>
        <PageTitle>Wszystkie produkty</PageTitle>
        {!isLoading && !isError && (
          <OfferCount>{data?.total || 0} ofert</OfferCount>
        )}
      </HeaderRow>
      {filterBar}
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
