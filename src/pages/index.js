import React from "react";
import PageContainer from "components/PageContainer";
import { useNewProducts } from "services/api/newProductsApi";
import Slogan from "components/Slogan";
import HorizontalProductList from "components/HorizontalProductList";

export default function HomePage() {
  const { data: newProducts, isLoading: isLoadingNew } = useNewProducts();
  const { data: popularProducts, isLoading: isLoadingPopular } =
    useNewProducts(); // todo: usePopularProducts();
  const { data: suggestedProducts, isLoading: isLoadingSuggested } =
    useNewProducts(); // todo: useSuggestedProducts();

  // TODO: tmp function
  const shuffleByField = (array, field, ascending = true) => {
    if (!Array.isArray(array)) {
      return [];
    }

    return [...array].sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];

      if (ascending) {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      } else {
        return valueB > valueA ? 1 : valueB < valueA ? -1 : 0;
      }
    });
  };

  const shuffledPopularProducts = popularProducts
    ? shuffleByField(popularProducts, "title")
    : [];
  const shuffledSuggestedProducts = suggestedProducts
    ? shuffleByField(suggestedProducts, "price")
    : [];

  return (
    <PageContainer
      loading={isLoadingNew || isLoadingPopular || isLoadingSuggested}
    >
      <Slogan />
      <HorizontalProductList
        title="Nowości"
        products={newProducts}
        loading={isLoadingNew}
      />
      <HorizontalProductList
        title="Popularne"
        products={shuffledPopularProducts}
        loading={isLoadingPopular}
      />
      <HorizontalProductList
        title="Sugerowane"
        products={shuffledSuggestedProducts}
        loading={isLoadingSuggested}
      />
    </PageContainer>
  );
}
