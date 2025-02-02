import React, { useState } from "react";
import { useRouter } from "next/router";
import PageContainer from "components/PageContainer";
import ProductList from "components/ProductList";
import { useSearchProducts } from "services/api/searchProductApi";

const PRODUCTS_PER_PAGE = 8;

export default function SearchPage() {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const searchQuery = router.query.query || "";

  const { data, isLoading } = useSearchProducts(
    searchQuery,
    page,
    PRODUCTS_PER_PAGE
  );

  const totalPages = Math.ceil(
    data?.pagination.totalProducts / PRODUCTS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    setPage(newPage);
    router.push(`/search?page=${newPage}&query=${searchQuery}`, undefined, {
      shallow: true,
    });
  };

  return (
    <PageContainer>
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
