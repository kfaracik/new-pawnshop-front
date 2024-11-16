import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Title from "@/components/Title";
import PageContainer from "@/components/PageContainer";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductList from "@/components/ProductList";

export default function AuctionsPage({ initialProducts, totalProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const productsPerPage = 10;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch(`/api/products?page=${page}&isAuction=true`);
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    };

    if (page > 1) {
      fetchProducts();
    }
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    router.push(`/auctions?page=${newPage}`, undefined, { shallow: true });
  };

  return (
    <PageContainer>
      <Title>Aktywne aukcje</Title>
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
  const page = parseInt(query.page) || 1;
  const productsPerPage = 10;

  await mongooseConnect();

  const filter = { isAuction: true };
  const totalProducts = await Product.countDocuments(filter);
  const products = await Product.find(filter, null, {
    skip: (page - 1) * productsPerPage,
    limit: productsPerPage,
    sort: { _id: -1 },
  });

  return {
    props: {
      initialProducts: JSON.parse(JSON.stringify(products)),
      totalProducts,
    },
  };
}
