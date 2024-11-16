import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PageContainer from "@/components/PageContainer";
import ProductList from "@/components/ProductList";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function SearchPage({ initialProducts, totalProducts }) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const productsPerPage = 10;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const searchQuery = router.query.query || "";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch(
        `/api/products?page=${page}&query=${searchQuery}`
      );
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    };

    if (page > 1 || searchQuery) {
      fetchProducts();
    }
  }, [page, searchQuery]);

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
        loading={loading}
        products={products}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </PageContainer>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const searchQuery = query.query || "";
  const productsPerPage = 12;
  const page = parseInt(query.page) || 1;

  await mongooseConnect();

  const filter = searchQuery
    ? { title: { $regex: searchQuery, $options: "i" } }
    : {};
  const totalProducts = await Product.countDocuments(filter);
  const products = await Product.find(filter, null, {
    skip: (page - 1) * productsPerPage,
    limit: productsPerPage,
  });

  return {
    props: {
      initialProducts: JSON.parse(JSON.stringify(products)),
      totalProducts,
    },
  };
}
