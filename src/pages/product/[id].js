import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import styled, { keyframes } from "styled-components";
import Modal from "react-modal";
import PageContainer from "components/PageContainer";
import Center from "components/Center";
import Title from "components/Title";
import WhiteBox from "components/WhiteBox";
import Button from "components/Button";
import CartIcon from "assets/icons/CartIcon";
import { useProduct } from "services/api/useProductApi";
import { CartContext } from "components/CartContext";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin: 40px 0;

  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
`;

const Price = styled.span`
  font-size: 2rem;
  color: #ff5722;
  font-weight: bold;
  margin-top: 20px;
`;

const ImagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  img {
    width: 100%;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const Description = styled.div`
  font-size: 1rem;
  padding-top: 20px;
  line-height: 1.5;
  color: #555;
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ModalContent = styled.div`
  text-align: center;
  color: #333;
  animation: ${slideIn} 0.4s ease forwards;

  h2 {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 20px;
  }

  p {
    font-size: 1rem;
    margin-bottom: 20px;
    line-height: 1.5;
  }

  button {
    background-color: #ff5722;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #e64a19;
    }
  }
`;

const Chip = styled.div`
  display: inline-block;
  background: #f5f5f5;
  color: #333;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 12px;
  padding: 10px 20px;
  margin-top: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProductPage = () => {
  const { query } = useRouter();
  const { id } = query;
  const { data: product, isLoading } = useProduct(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addProduct } = useContext(CartContext);

  const handleAddToCart = () => {
    setIsModalOpen(true);
    addProduct(id);
  };

  const closeModal = () => setIsModalOpen(false);

  const goToCart = () => {};

  return (
    <PageContainer loading={isLoading}>
      {!!product ? (
        <>
          <Center>
            <ColWrapper>
              <WhiteBox>
                <ImagesWrapper>
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.title} - ${index + 1}`}
                    />
                  ))}
                </ImagesWrapper>
              </WhiteBox>
              <div>
                <Chip>Produkt dostępny w naszym punkcie!</Chip>
                <Title>{product.title}</Title>
                <Price>{product.price.toFixed(2)} zł</Price>
                <Description
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
                <Button
                  primary
                  onClick={handleAddToCart}
                  style={{
                    fontSize: "1.2rem",
                    padding: "15px 30px",
                  }}
                >
                  <CartIcon /> Dodaj do koszyka
                </Button>
              </div>
            </ColWrapper>
          </Center>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            style={{
              content: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "12px",
                padding: "20px",
                maxWidth: "400px",
                maxHeight: "400px",
                margin: "auto",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              },
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.75)",
              },
            }}
          >
            <ModalContent>
              <h2>Dodano do koszyka</h2>
              <p>Możesz teraz przejść do koszyka i sfinalizować zamówienie.</p>
              <button onClick={goToCart}>Przejdź do koszyka</button>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <div>Nie znaleziono produktu</div>
      )}
    </PageContainer>
  );
};

export default ProductPage;
