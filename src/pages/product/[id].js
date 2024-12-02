import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axiosInstance from "lib/axiosInstance";
import styled from "styled-components";
import Link from "next/link";
import Modal from "react-modal";
import PageContainer from "components/PageContainer";
import Center from "components/Center";
import Title from "components/Title";
import WhiteBox from "components/WhiteBox";
import Button from "components/Button";
import CartIcon from "assets/icons/CartIcon";

// Styled Components
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
  font-size: 1.8rem;
  color: #ff5722;
  font-family: "Roboto", sans-serif;
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
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  padding-top: 20px;
  line-height: 1.5;
  color: #555;
`;

const ModalContent = styled.div`
  text-align: center;
  color: #333;

  h2 {
    font-size: 1.6rem;
    font-family: "Roboto", sans-serif;
    margin-bottom: 20px;
  }

  p {
    font-size: 1rem;
    margin-bottom: 20px;
    line-height: 1.5;
  }

  a {
    color: #0070f3;
    text-decoration: underline;
    font-weight: bold;
  }
`;

const Chip = styled.div`
  display: inline-block;
  background: linear-gradient(45deg, #e0e0e0, #f5f5f5);
  color: #333;
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 12px;
  padding: 8px 16px;
  margin-top: 20px;
  cursor: ${(props) => (props.primary ? "default" : "pointer")};
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
  }
`;

const ProductPage = () => {
  const { query } = useRouter();
  const { id } = query;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/products/${id}`)
        .then((response) => {
          setProduct(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleAddToCart = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // if (loading) return <div>Loading...</div>;

  if (!product) return <div>Product not found</div>;

  return (
    <PageContainer loading={loading}>
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
            <Chip primary>
              <Link href="/contact">Produkt dostępny w naszym punkcie!</Link>
            </Chip>

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
              <CartIcon />
              Dodaj do koszyka
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
          <h2>Produkt dostępny w naszym punkcie!</h2>
          <p>
            Ten produkt można odebrać tylko w naszym punkcie. Skontaktuj się z
            nami, aby uzyskać więcej informacji.
          </p>
          <Link href="/contact">Przejdź do strony kontaktowej</Link>
        </ModalContent>
      </Modal>
    </PageContainer>
  );
};

export default ProductPage;
