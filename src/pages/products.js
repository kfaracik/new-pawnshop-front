import React, { useState } from "react";
import { useRouter } from "next/router";
import Title from "components/Title";
import PageContainer from "components/PageContainer";
import ProductList from "components/ProductList";
import { useProducts } from "services/api/productApi";

const PRODUCTS_PER_PAGE = 8;

export default function ProductsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useProducts(
    page,
    PRODUCTS_PER_PAGE
  );

  const totalPages = Math.ceil((data?.total || 0) / PRODUCTS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      setPage(newPage);
      router.push(`/products?page=${newPage}`, undefined, { shallow: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <PageContainer>
      <Title>Wszystkie produkty</Title>
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
