import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import PageContainer from "@/components/PageContainer";

export default function AuctionsPage({ products }) {
  return (
    <PageContainer>
      <Center>
        <Title>Aktywne aukcje</Title>
        <ProductsGrid products={products} />
      </Center>
    </PageContainer>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  const products = await Product.find({ isAuction: true }, null, {
    sort: { _id: -1 },
  });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
