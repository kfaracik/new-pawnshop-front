import React, { useContext } from "react";
import styled from "styled-components";
import Link from "next/link";
import { keyframes } from "@emotion/react";
import { IconButton, Typography } from "@mui/material";
import colors from "styles/colors";
import { RiAuctionFill } from "react-icons/ri";
import { FaCartPlus } from "react-icons/fa";
import { CartContext } from "components/CartContext";

const fadeIn = keyframes`
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
`;

const truncateTitle = (title, maxLength) =>
  title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;

const CardContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  animation: ${fadeIn} 0.3s ease-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  width: 250px;
  height: 350px;
  margin: 5px;
  margin-right: 10px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const StyledImageListItemBar = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const CartButton = styled(IconButton)`
  color: #fff;
  margin-left: auto;
`;

export const ProductItem = ({ product, searchQuery }) => {
  const { addProduct } = useContext(CartContext);
  const url = product.isAuction
    ? product.auctionLink
    : `/product/${product._id}`;

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
        <StyledImageListItemBar>
          <TitleContainer>
            <Typography
              variant="body1"
              style={{
                color: "#fff",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "180px",
              }}
            >
              {highlightQuery(truncateTitle(product.title, 40), searchQuery)}
            </Typography>
            <CartButton
              onClick={(e) => {
                e.preventDefault();
                addProduct(product._id);
              }}
            >
              <FaCartPlus color="white" style={{ paddingRight: 10 }} />
            </CartButton>
          </TitleContainer>
          <Typography
            variant="h6"
            style={{
              fontWeight: "normal",
              color: colors.secondary,
              fontSize: "1.2rem",
            }}
          >
            {product.price.toFixed(2)} zł
          </Typography>
          {product.isAuction && (
            <IconButton style={{ color: "#fff" }}>
              <RiAuctionFill />
            </IconButton>
          )}
        </StyledImageListItemBar>
      </CardContainer>
    </Link>
  );
};
