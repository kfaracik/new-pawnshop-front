import React from "react";
import NewProducts from "components/NewProducts";
import PageContainer from "components/PageContainer";
import { useNewProducts } from "services/api/newProductsApi";

export default function HomePage() {
  const { data: newProducts, isLoading } = useNewProducts();

  return (
    <PageContainer loading={isLoading}>
      <NewProducts products={newProducts} />
    </PageContainer>
  );
}
