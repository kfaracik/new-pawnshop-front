import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Center from "components/Center";
import Title from "components/Title";
import PageContainer from "components/PageContainer";
import ProductList from "components/ProductList";

const PRODUCTS_PER_PAGE = 8;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8888/api/products?page=${page}&limit=${PRODUCTS_PER_PAGE}`
      );
      const data = await response.json();

      setProducts(data.products);
      setTotalProducts(data.total);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      setPage(newPage);
      router.push(
        `/products?page=${newPage}&limit=${PRODUCTS_PER_PAGE}`,
        undefined,
        { shallow: true }
      );
    }
  };

  return (
    <PageContainer loading={loading}>
      <Center>
        <Title>Wszystkie produkty</Title>
        <ProductList
          products={products}
          loading={loading}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          selectedPage={page}
        />
      </Center>
    </PageContainer>
  );
}
