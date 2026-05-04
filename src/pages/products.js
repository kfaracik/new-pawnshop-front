import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import SeoHead from "components/SeoHead";
import Title from "components/Title";
import PageContainer from "components/PageContainer";
import ProductList from "components/ProductList";
import { useProducts } from "services/api/productApi";
import { useCategories } from "services/api/categoryApi";
import { buttonBaseStyle, buttonSecondaryStyle } from "components/Button";
import colors from "styles/colors";

const PRODUCTS_PER_PAGE = 8;

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 8px 0 12px;
  padding: 14px 16px;
  border: 1px solid #e6e6e6;
  border-radius: 14px;
  background: linear-gradient(180deg, #fafafa, #f1f1f1);
`;

const ToolbarInfo = styled.div`
  display: grid;
  gap: 4px;
`;

const FilterLabel = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${colors.textSecondary};
`;

const FilterValue = styled.strong`
  color: ${colors.textPrimary};
  font-size: 0.98rem;
`;

const FilterButton = styled.button`
  ${buttonBaseStyle}
  ${buttonSecondaryStyle}
`;

const FilterPanel = styled.div`
  display: grid;
  gap: 10px;
  margin-bottom: 18px;
  padding: 14px 16px;
  border: 1px solid #e6e6e6;
  border-radius: 14px;
  background: #fafafa;
`;

const FilterActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FilterChip = styled.button`
  ${buttonBaseStyle}
  min-height: 38px;
  padding: 0 14px;
  border-color: ${(props) => (props.$active ? colors.primary : "#d8d8d8")};
  background: ${(props) => (props.$active ? "#fff4cf" : "#fff")};
  color: ${colors.textPrimary};
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

export default function ProductsPage() {
  const router = useRouter();
  const [page, setPage] = useState(Number(router.query.page) || 1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const selectedCategory = router.query.category || "";
  const { data: categoriesData } = useCategories();
  const categories = useMemo(() => {
    if (Array.isArray(categoriesData)) return categoriesData;
    if (Array.isArray(categoriesData?.categories)) return categoriesData.categories;
    return [];
  }, [categoriesData]);
  const selectedCategoryName =
    categories.find((category) => String(category._id) === String(selectedCategory))?.name ||
    "Wszystkie kategorie";

  const { data, isLoading, isError, error } = useProducts(
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isError) {
    return (
      <PageContainer>
        <SeoHead
          title="Wszystkie produkty | Nowy Lombard"
          description="Przeglądaj wszystkie dostępne produkty Nowego Lombardu. Filtruj oferty i przechodź do szczegółów produktu."
          path={`/products${router.asPath.includes("?") ? router.asPath.slice("/products".length) : ""}`}
        />
        <Title>Wszystkie produkty</Title>
        <Toolbar>
          <ToolbarInfo>
            <FilterLabel>Aktywny filtr</FilterLabel>
            <FilterValue>{selectedCategoryName}</FilterValue>
          </ToolbarInfo>
          <FilterButton type="button" onClick={() => setFiltersOpen((prev) => !prev)}>
            {filtersOpen ? "Ukryj filtry" : "Filtruj"}
          </FilterButton>
        </Toolbar>
        {filtersOpen && (
          <FilterPanel>
            <FilterActions>
              <FilterChip
                type="button"
                $active={!selectedCategory}
                onClick={() => navigateWithCategory("")}
              >
                Wszystkie
              </FilterChip>
              {categories.map((category) => (
                <FilterChip
                  key={category._id}
                  type="button"
                  $active={String(category._id) === String(selectedCategory)}
                  onClick={() => navigateWithCategory(category._id)}
                >
                  {category.name}
                </FilterChip>
              ))}
            </FilterActions>
          </FilterPanel>
        )}
        <ErrorState>
          <h2>Nie udało się załadować produktów</h2>
          <p>
            Sprawdź połączenie lub spróbuj ponownie za chwilę. Szczegóły:{" "}
            {error?.message || "Błąd sieci."}
          </p>
          <FilterButton type="button" onClick={() => router.reload()}>
            Spróbuj ponownie
          </FilterButton>
        </ErrorState>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SeoHead
        title="Wszystkie produkty | Nowy Lombard"
        description="Przeglądaj wszystkie dostępne produkty Nowego Lombardu. Filtruj oferty i przechodź do szczegółów produktu."
        path={`/products${router.asPath.includes("?") ? router.asPath.slice("/products".length) : ""}`}
      />
      <Title>Wszystkie produkty</Title>
      <Toolbar>
        <ToolbarInfo>
          <FilterLabel>Aktywny filtr</FilterLabel>
          <FilterValue>{selectedCategoryName}</FilterValue>
        </ToolbarInfo>
        <FilterButton type="button" onClick={() => setFiltersOpen((prev) => !prev)}>
          {filtersOpen ? "Ukryj filtry" : "Filtruj"}
        </FilterButton>
      </Toolbar>
      {filtersOpen && (
        <FilterPanel>
          <FilterActions>
            <FilterChip
              type="button"
              $active={!selectedCategory}
              onClick={() => navigateWithCategory("")}
            >
              Wszystkie
            </FilterChip>
            {categories.map((category) => (
              <FilterChip
                key={category._id}
                type="button"
                $active={String(category._id) === String(selectedCategory)}
                onClick={() => navigateWithCategory(category._id)}
              >
                {category.name}
              </FilterChip>
            ))}
          </FilterActions>
        </FilterPanel>
      )}
      <ProductList
        products={data?.products || []}
        loading={isLoading}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        selectedPage={page}
      />
    </PageContainer>
  );
}
