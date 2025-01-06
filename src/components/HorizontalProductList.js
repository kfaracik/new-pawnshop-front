import React from "react";
import styled from "styled-components";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { IconButton } from "@mui/material";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import Skeleton from "@mui/material/Skeleton";
import colors from "styles/colors";
import { ProductItem } from "./ProductItem";

const Container = styled.div`
  background: linear-gradient(135deg, #f5f5f5, #dcdcdc);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  position: relative;
  display: flex;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  min-width: 180px;
  align-items: center;
`;

const Title = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.textSecondary};
`;

const SkeletonContainer = styled.div`
  display: flex;
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
  const handleScrollNext = (api) => {
    api.scrollNext();
  };

  const handleScrollPrev = (api) => {
    api.scrollPrev();
  };

  if (!products || products.length === 0) {
    return (
      <Container>
        <TitleContainer>
          <Title>{title}</Title>
          <p>Nie mamy aktualnie dostępnych produktów.</p>
        </TitleContainer>
      </Container>
    );
  }

  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      {loading ? (
        <SkeletonContainer>
          {Array.from({ length: 6 }).map((_, index) => (
            <StyledSkeleton
              key={index}
              variant="rectangular"
              width={250}
              height={350}
            />
          ))}
        </SkeletonContainer>
      ) : (
        <ScrollMenu
          wrapperClassName="hide-scrollbar"
          LeftArrow={() => (
            <VisibilityContext.Consumer>
              {(api) => (
                <ArrowButton onClick={() => handleScrollPrev(api)}>
                  <RiArrowLeftSLine size={24} />
                </ArrowButton>
              )}
            </VisibilityContext.Consumer>
          )}
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
          {products.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              searchQuery={searchQuery}
            />
          ))}
        </ScrollMenu>
      )}
    </Container>
  );
};

export default HorizontalProductList;
