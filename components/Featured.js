import Center from "@/components/Center";
import styled from "styled-components";
import ButtonLink from "@/components/ButtonLink";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "@/components/CartContext";

const Bg = styled.div`
  margin-top: 20px;
  background-color: #222;
  color: #fff;
  padding: 50px 0;
  width: 100%; /* Ensures full width */
  display: flex;
  justify-content: center; /* Centers content horizontally */
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  width: 100%;

  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }

  div:nth-child(1) {
    order: 2;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

const Loader = styled.div`
  text-align: center;
  color: #aaa;
  font-size: 1.2rem;
  padding: 20px;
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (product) {
      setIsLoading(false);
    }
  }, [product]);

  function addFeaturedToCart() {
    addProduct(product._id);
  }

  if (isLoading) {
    return (
      <Bg>
        <Center>
          <Loader>Ładowanie...</Loader>
        </Center>
      </Bg>
    );
  }

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc dangerouslySetInnerHTML={{ __html: product.description }} />
              <ButtonsWrapper>
                <ButtonLink
                  href={"/product/" + product._id}
                  outline={1}
                  white={1}
                >
                  Dowiedz się więcej
                </ButtonLink>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img src={product.images[0]} alt={product.title} />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
