import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import PageContainer from "components/PageContainer";
import ProductList from "components/ProductList";
import SeoHead from "components/SeoHead";
import { useSearchProducts } from "services/api/searchProductApi";
import { useCategories } from "services/api/categoryApi";

const PRODUCTS_PER_PAGE = 8;

export default function SearchPage() {
  const router = useRouter();
  const [page, setPage] = useState(Number(router.query.page) || 1);
  const searchQuery = router.query.query || "";
  const selectedCategory = router.query.category || "";
  const { data: categoriesData } = useCategories();

  const categories = useMemo(() => {
    if (Array.isArray(categoriesData)) return categoriesData;
    if (Array.isArray(categoriesData?.categories)) return categoriesData.categories;
    return [];
  }, [categoriesData]);

  const categoryName = useMemo(
    () =>
      categories.find((category) => String(category._id) === String(selectedCategory))?.name ||
      "",
    [categories, selectedCategory]
  );

  const hasSearchInput = Boolean(String(searchQuery).trim() || selectedCategory);
  const { data, isLoading, isError, error } = useSearchProducts(
    searchQuery,
    page,
    PRODUCTS_PER_PAGE,
    selectedCategory
  );

  const totalPages = Math.ceil(
    (data?.pagination?.totalProducts || 0) / PRODUCTS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    setPage(newPage);
    const params = new URLSearchParams({
      page: String(newPage),
    });
    if (searchQuery) {
      params.set("query", String(searchQuery));
    }
    if (selectedCategory) {
      params.set("category", String(selectedCategory));
    }
    router.push(`/search?${params.toString()}`, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    setPage(Number(router.query.page) || 1);
  }, [router.query.page, selectedCategory, searchQuery]);

  return (
    <PageContainer>
      <SeoHead
        title={
          searchQuery
            ? `Wyszukiwanie: ${searchQuery} | Nowy Lombard`
            : "Wyszukiwanie | Nowy Lombard"
        }
        description="Wewnętrzna wyszukiwarka produktów Nowego Lombardu."
        path={router.asPath}
        noindex
      />
      {searchQuery && (
        <h2>
          Wyniki wyszukiwania dla: <strong>{searchQuery}</strong>
        </h2>
      )}
      {!searchQuery && categoryName && (
        <h2>
          Produkty w kategorii: <strong>{categoryName}</strong>
        </h2>
      )}
      {searchQuery && categoryName && (
        <p>
          Kategoria: <strong>{categoryName}</strong>
        </p>
      )}
      {!hasSearchInput && (
        <p>Wpisz szukaną frazę albo wybierz kategorię, aby zobaczyć produkty.</p>
      )}
      {isError && (
        <p>
          Nie udało się załadować wyników:{" "}
          {error?.response?.data?.message || error?.message || "spróbuj ponownie."}
        </p>
      )}
      <ProductList
        loading={hasSearchInput && isLoading}
        products={data?.products || []}
        totalPages={totalPages}
        selectedPage={page}
        onPageChange={handlePageChange}
      />
    </PageContainer>
  );
}
