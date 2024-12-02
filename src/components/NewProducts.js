import React from "react";
import styled from "styled-components";
import Center from "components/Center";
import ProductList from "components/ProductList";

const Title = styled.h2`
  font-size: 2rem;
  font-weight: normal;
`;

export default function NewProducts({ products }) {
  if (!products || products.length === 0) {
    return <p>Nie mamy aktualnie dostępnych produktów.</p>;
  }

  return (
    <Center>
      <Title>Nowości</Title>
      <ProductList
        products={products}
        totalPages={1}
        loading={false}
        onPageChange={undefined}
        selectedPage={undefined}
      />
    </Center>
  );
}
