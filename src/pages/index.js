import React, { useState, useEffect } from "react";
import Featured from "components/Featured";
import NewProducts from "components/NewProducts";
import PageContainer from "components/PageContainer";
import { mongooseConnect } from "lib/mongoose";
import { Product } from "services/models/Product";

export default function HomePage({ featuredProduct, newProducts }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <PageContainer loading={isLoading}>
      {featuredProduct && <Featured product={featuredProduct} />}
      <NewProducts products={newProducts} />
    </PageContainer>
  );
}

// TODO: fix api add functionality
export async function getServerSideProps() {
  const featuredProductId = "6735d84c8193f9a46ffede32";
  await mongooseConnect();

  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 8,
  });

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
