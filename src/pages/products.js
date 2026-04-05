import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Title from "components/Title";
import PageContainer from "components/PageContainer";
import ProductList from "components/ProductList";
import { useProducts } from "services/api/productApi";

const PRODUCTS_PER_PAGE = 8;

export default function ProductsPage() {
  const router = useRouter();
  const [page, setPage] = useState(Number(router.query.page) || 1);
  const selectedCategory = router.query.category || "";

  const { data, isLoading, isError, error } = useProducts(
    page,
    PRODUCTS_PER_PAGE,
    selectedCategory
  );

  const totalPages = Math.ceil((data?.total || 0) / PRODUCTS_PER_PAGE);

  useEffect(() => {
    setPage(Number(router.query.page) || 1);
  }, [router.query.page, selectedCategory]);

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
