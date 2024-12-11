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

const FullscreenImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const FullscreenImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: ${keyframes`
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  `} 0.3s ease forwards;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 2rem;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 2;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  &.prev {
    left: 10px;
  }

  &.next {
    right: 10px;
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
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 10px;

    &:hover {
      background-color: #e64a19;
    }
  }
`;

const ProductPage = () => {
  const { query, push } = useRouter();
  const { id } = query;
  const { data: product, isLoading } = useProduct(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addProduct } = useContext(CartContext);

  const handleAddToCart = () => {
    setIsModalOpen(true);
    addProduct(id);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => setIsImageModalOpen(false);

  const goToCart = () => {
    push("/cart");
  };

  const showNextImage = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex + 1) % product.images.length
    );
  };

  const showPrevImage = () => {
    setSelectedImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <PageContainer loading={isLoading}>
      {!!product ? (
        <>
          <ColWrapper>
            <WhiteBox>
              <ImagesWrapper>
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.title} - ${index + 1}`}
                    onClick={() => handleImageClick(index)}
                  />
                ))}
              </ImagesWrapper>
            </WhiteBox>
            <div>
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
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Product Added Modal"
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                borderRadius: "12px",
                maxWidth: "500px",
                margin: "auto",
                padding: "20px",
                textAlign: "center",
                position: "relative",
                marginTop: "100px",
              },
            }}
          >
            <ModalContent>
              <h2>Dodano do koszyka!</h2>
              <p>{product.title} został pomyślnie dodany do Twojego koszyka.</p>
              <button onClick={goToCart}>Przejdź do koszyka</button>
              <button onClick={closeModal}>Kontynuuj zakupy</button>
            </ModalContent>
          </Modal>
          {isImageModalOpen && (
            <Modal
              isOpen={isImageModalOpen}
              onRequestClose={closeImageModal}
              contentLabel="Fullscreen Image Modal"
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                },
                content: {
                  backgroundColor: "transparent",
                  border: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
            >
              <FullscreenImageContainer>
                <NavigationButton className="prev" onClick={showPrevImage}>
                  ‹
                </NavigationButton>
                <FullscreenImage
                  src={product.images[selectedImageIndex]}
                  alt={`${product.title} - ${selectedImageIndex + 1}`}
                />
                <NavigationButton className="next" onClick={showNextImage}>
                  ›
                </NavigationButton>
                <CloseButton onClick={closeImageModal}>×</CloseButton>
              </FullscreenImageContainer>
            </Modal>
          )}
        </>
      ) : (
        <Center>Ładowanie danych produktu...</Center>
      )}
    </PageContainer>
  );
};

export default ProductPage;
