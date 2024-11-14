import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category"; // Assuming you have this model
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import PageContainer from "@/components/PageContainer";

export default function AuctionsPage({ products }) {
  return (
    <PageContainer>
      <Center>
        <Title>Aktywne aukcje</Title>
      </Center>
    </PageContainer>
  );
}
