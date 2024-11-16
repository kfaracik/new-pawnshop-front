import Center from "@/components/Center";
import styled, { keyframes } from "styled-components";
import ButtonLink from "@/components/ButtonLink";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "@/components/CartContext";
import ReactLoading from "react-loading";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Bg = styled.div`
  margin-top: 20px;
  background-color: #222;
  border-radius: 4px;
  color: #fff;
  padding: 50px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  animation: ${fadeIn} 0.7s ease-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.6);
  }
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
  justify-content: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

const Loader = styled.div`
  text-align: center;
  padding: 20px;
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border: 3px solid #333;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  max-width: 100%;
  max-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: 0 auto;
    transition: transform 0.5s ease-in-out;
  }
  &:hover img {
    transform: scale(1.05);
  }
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
          <Loader>
            <ReactLoading type="bubbles" color="#aaa" height={50} width={50} />
          </Loader>
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
            <ImageWrapper>
              <img src={product.images[0]} alt={product.title} />
            </ImageWrapper>
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
