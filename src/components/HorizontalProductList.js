import React from "react";
import styled from "styled-components";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { IconButton, Typography } from "@mui/material";
import { RiArrowRightSLine, RiAuctionFill } from "react-icons/ri";
import Skeleton from "@mui/material/Skeleton";
import { keyframes } from "@emotion/react";
import colors from "styles/colors";

const fadeIn = keyframes`
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
`;

const truncateTitle = (title, maxLength) =>
  title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;

const Container = styled.div`
  background: linear-gradient(135deg, #f5f5f5, #dcdcdc);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const TitleContainer = styled.div`
  padding: 20px;
  min-width: 180px;
`;

const Title = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.textSecondary};
`;

const ProductCard = styled.div`
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

const StyledSkeleton = styled(Skeleton)`
  border-radius: 8px;
  margin-right: 16px;
`;

const ArrowButton = styled(IconButton)`
  background: ${colors.secondary};
  color: #333;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  &:hover {
    background: #ffcc00;
  }
`;

const HorizontalProductList = ({
  title,
  products,
  loading,
  searchQuery = "",
}) => {
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

  const handleScrollNext = (api) => {
    api.scrollNext();
  };

  return (
    <Container>
      {loading ? (
        <>
          {Array.from({ length: 8 }).map((_, index) => (
            <StyledSkeleton
              key={index}
              variant="rectangular"
              width={250}
              height={350}
            />
          ))}
        </>
      ) : (
        <ScrollMenu
          wrapperClassName="hide-scrollbar"
          RightArrow={() => (
            <VisibilityContext.Consumer>
              {(api) => (
                <ArrowButton onClick={() => handleScrollNext(api)}>
                  <RiArrowRightSLine size={24} />
                </ArrowButton>
              )}
            </VisibilityContext.Consumer>
          )}
        >
          <TitleContainer>
            <Title>{title}</Title>
          </TitleContainer>
          {products.map((product) => {
            const url = product.isAuction
              ? product.auctionLink
              : `/product/${product._id}`;
            return (
              <a href={url} key={product._id}>
                <ProductCard>
                  <ProductImage
                    src={
                      product.images?.[0] ||
                      "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                    }
                    alt={product.title}
                    loading="lazy"
                  />
                  <StyledImageListItemBar>
                    <Typography
                      variant="body1"
                      style={{
                        fontWeight: "bold",
                        color: "#fff",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {highlightQuery(
                        truncateTitle(product.title, 40),
                        searchQuery
                      )}
                    </Typography>
                    <Typography
                      variant="h6"
                      style={{
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
                </ProductCard>
              </a>
            );
          })}
        </ScrollMenu>
      )}
    </Container>
  );
};

export default HorizontalProductList;
