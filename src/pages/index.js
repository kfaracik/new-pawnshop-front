import React from "react";
import PageContainer from "components/PageContainer";
import { useNewProducts } from "services/api/newProductsApi";
import { usePopularProducts } from "services/api/popularProductsApi";
import { useSuggestedProducts } from "services/api/suggestedProductsApi";
import Slogan from "components/Slogan";
import HorizontalProductList from "components/HorizontalProductList";

export default function HomePage() {
  const { data: newProducts, isLoading: isLoadingNew } = useNewProducts();
  const { data: popularProducts, isLoading: isLoadingPopular } =
    usePopularProducts();
  const { data: suggestedProducts, isLoading: isLoadingSuggested } =
    useSuggestedProducts();

  return (
    <PageContainer>
      <Slogan />
      <HorizontalProductList
        title="Nowości"
        products={newProducts}
        loading={isLoadingNew}
      />
      <HorizontalProductList
        title="Popularne"
        products={popularProducts}
        loading={isLoadingPopular}
      />
      <HorizontalProductList
        title="Sugerowane"
        products={suggestedProducts}
        loading={isLoadingSuggested}
      />
    </PageContainer>
  );
}
