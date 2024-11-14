import Featured from "@/components/Featured";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import PageContainer from "@/components/PageContainer";

export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <PageContainer>
      {featuredProduct && <Featured product={featuredProduct} />}
      <NewProducts products={newProducts} />
    </PageContainer>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "6735d84c8193f9a46ffede32";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
