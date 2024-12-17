import React from "react";
import NewProducts from "components/NewProducts";
import PageContainer from "components/PageContainer";
import { useNewProducts } from "services/api/newProductsApi";
import Slogan from "components/Slogan";

export default function HomePage() {
  const { data: newProducts, isLoading: isLoadingNew } = useNewProducts();
  const { data: popularProducts, isLoading: isLoadingPopular } =
    useNewProducts();
  const { data: suggestedProducts, isLoading: isLoadingSuggested } =
    useNewProducts();

  return (
    <PageContainer
      loading={isLoadingNew || isLoadingPopular || isLoadingSuggested}
    >
      <Slogan />
      <NewProducts
        title="Nowości"
        products={newProducts}
        loading={isLoadingNew}
      />
      <NewProducts
        title="Popularne"
        products={popularProducts}
        loading={isLoadingPopular}
      />
      <NewProducts
        title="Sugerowane"
        products={suggestedProducts}
        loading={isLoadingSuggested}
      />
    </PageContainer>
  );
}
