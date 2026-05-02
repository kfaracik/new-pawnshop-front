import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PageContainer from "components/PageContainer";
import ProductList from "components/ProductList";
import SeoHead from "components/SeoHead";
import { useSearchProducts } from "services/api/searchProductApi";

const PRODUCTS_PER_PAGE = 8;

export default function SearchPage() {
  const router = useRouter();
  const [page, setPage] = useState(Number(router.query.page) || 1);
  const searchQuery = router.query.query || "";
  const selectedCategory = router.query.category || "";

  const { data, isLoading } = useSearchProducts(
    searchQuery,
    page,
    PRODUCTS_PER_PAGE,
    selectedCategory
  );

  const totalPages = Math.ceil(
    data?.pagination.totalProducts / PRODUCTS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    setPage(newPage);
    const params = new URLSearchParams({
      page: String(newPage),
      query: String(searchQuery),
    });
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
      <ProductList
        loading={isLoading}
        products={data?.products || []}
        totalPages={totalPages}
        selectedPage={page}
        onPageChange={handlePageChange}
      />
    </PageContainer>
  );
}
