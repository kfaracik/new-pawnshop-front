import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Center from "components/Center";
import Title from "components/Title";
import PageContainer from "components/PageContainer";
import ProductList from "components/ProductList";

// TODO: refactor
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0); // Dodajemy totalProducts
  const [page, setPage] = useState(1);
  const router = useRouter();

  const productsPerPage = 10;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Funkcja do pobierania produktów z API
  const fetchProducts = async () => {
    setLoading(true);
    console.log("GET PRODUCTS");
    const response = await fetch("http://127.0.0.1:8888/api/products");

    console.log({ response, body: response.body });
    const data = await response.json();
    setProducts(data.products);
    setTotalProducts(data.totalProducts); // Ustawiamy liczbę wszystkich produktów
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(); // Pobieramy produkty po pierwszym renderowaniu
  }, [page, router.query]); // Zależności to page i query

  const handlePageChange = (newPage) => {
    // setPage(newPage);
    // router.push(`/products?page=${newPage}`, undefined, { shallow: true }); // Zaktualizowane URL bez przeładowania strony
  };

  return (
    <PageContainer loading={loading}>
      <Center>
        <Title>Wszystkie produkty</Title>
        <ProductList
          loading={loading}
          products={products}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Center>
    </PageContainer>
  );
}
