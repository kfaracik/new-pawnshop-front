import styled, { keyframes } from "styled-components";
import Link from "next/link";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ProductWrapper = styled.div`
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeIn} 0.6s ease-out;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  }
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  margin-bottom: 16px;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
    transition: transform 0.3s ease;
  }
  &:hover img {
    transform: scale(1.05);
  }
`;

const Title = styled(Link)`
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
  text-decoration: none;
  margin: 0;
  display: block;
  margin-bottom: 8px;
  transition: color 0.3s ease;
  &:hover {
    color: #2c3e50;
  }
`;

const ProductInfoBox = styled.div`
  text-align: center;
`;

const Price = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #34495e;
  margin-top: 10px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

export default function ProductBox({ _id, title, description, price, images }) {
  const url = '/product/' + _id;
  const imageUrl = images?.[0];

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        {imageUrl ? (
          <img src={imageUrl} alt={title} />
        ) : (
          <img src={'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'} alt={title} />
        )}
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <Price>{price} zł</Price>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
