import React, { useContext } from "react";
import styled from "styled-components";
import Link from "next/link";
import { keyframes } from "@emotion/react";
import { IconButton, Typography } from "@mui/material";
import colors from "styles/colors";
import { RiAuctionFill } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { CartContext } from "context/CartContext";

const fadeIn = keyframes`
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
`;

const truncateTitle = (title, maxLength) =>
  title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;

const CardContainer = styled.div`
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  animation: ${fadeIn} 0.3s ease-out;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  width: 100%;
  margin: 0;
  border: 1px solid #232323;
  background: #0f0f0f;
  aspect-ratio: 5 / 7;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.24);
  }

  @media screen and (max-width: 600px) {
    width: 100%;
    max-width: 100%;
    aspect-ratio: 4 / 5;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;
`;

const StyledImageListItemBar = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.86) 0%,
    rgba(0, 0, 0, 0.7) 60%,
    rgba(0, 0, 0, 0) 100%
  );
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 10px;
  width: 100%;
`;

const CartButton = styled(IconButton)`
  margin-left: auto;
  width: 34px;
  height: 34px;
  background: ${colors.primary} !important;
  color: ${colors.primaryContrastText} !important;
  border-radius: 8px !important;
  border: 1px solid ${colors.primaryDark} !important;
  transition: background-color 0.2s ease, transform 0.2s ease !important;

  &:hover {
    background: ${colors.primaryLight} !important;
    transform: scale(1.03);
  }
`;

const AuctionBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  z-index: 2;
`;

const ProductTitle = styled(Typography)`
  && {
    color: ${colors.textInverse};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 170px;
    font-size: 0.95rem;
    line-height: 1.3;

    @media screen and (max-width: 600px) {
      max-width: 75%;
      font-size: 0.9rem;
    }
  }
`;

const PriceText = styled(Typography)`
  && {
    font-weight: 700;
    color: ${colors.primaryLight};
    font-size: 1.05rem;
    letter-spacing: 0.2px;

    @media screen and (max-width: 600px) {
      font-size: 1rem;
    }
  }
`;

export const ProductItem = ({ product, searchQuery }) => {
  const { addProduct } = useContext(CartContext);
  const url = `/product/${product._id}`;

  const highlightQuery = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span
          key={index}
          style={{
            fontWeight: "bold",
            color: colors.secondary,
          }}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <Link href={url} key={product._id}>
      <CardContainer>
        <ProductImage
          src={
            product.images?.[0] ||
            "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
          }
          alt={product.title}
          loading="lazy"
        />
        {product.isAuction && (
          <AuctionBadge title="Licytacja">
            <RiAuctionFill />
          </AuctionBadge>
        )}
        <StyledImageListItemBar>
          <TitleContainer>
            <ProductTitle variant="body1">
              {highlightQuery(truncateTitle(product.title, 40), searchQuery)}
            </ProductTitle>
            <CartButton
              aria-label="Dodaj do koszyka"
              onClick={(e) => {
                e.preventDefault();
                addProduct(product._id);
              }}
            >
              <FiShoppingCart size={18} />
            </CartButton>
          </TitleContainer>
          <PriceText variant="h6">
            {product.price.toFixed(2)} zł
          </PriceText>
        </StyledImageListItemBar>
      </CardContainer>
    </Link>
  );
};
