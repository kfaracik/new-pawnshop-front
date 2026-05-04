import React from "react";
import styled from "styled-components";
import Skeleton from "@mui/material/Skeleton";
import { FaBoxOpen } from "react-icons/fa";
import colors from "styles/colors";
import { ProductItem } from "./ProductItem";

const Container = styled.div`
  background: linear-gradient(180deg, #f7f7f7, #efefef);
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
`;

const TitleContainer = styled.div`
  display: flex;
  padding: 14px 16px 6px;
  align-items: center;
`;

const Title = styled.span`
  font-size: clamp(1.15rem, 2.2vw, 1.35rem);
  font-weight: 700;
  color: ${colors.textPrimary};
`;

const HorizontalTrack = styled.div`
  --track-inset: 18px;
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: var(--track-inset);
  padding: 16px var(--track-inset) 18px;

  &::-webkit-scrollbar {
    height: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c7c7c7;
    border-radius: 999px;
  }

  @media screen and (max-width: 600px) {
    --track-inset: 14px;
    gap: 10px;
    padding: 8px var(--track-inset) 12px;
  }
`;

const EmptyState = styled.div`
  padding: 18px 16px 20px;
  display: grid;
  justify-items: center;
  gap: 10px;
  color: ${colors.textSecondary};
  text-align: center;

  svg {
    font-size: 1.8rem;
    color: ${colors.primaryDark};
    opacity: 0.85;
  }

  p {
    margin: 0;
  }
`;

const ItemSlot = styled.div`
  flex: 0 0 clamp(220px, 30vw, 280px);
  scroll-snap-align: start;

  @media screen and (max-width: 900px) {
    flex-basis: clamp(200px, 45vw, 260px);
  }

  @media screen and (max-width: 600px) {
    flex-basis: clamp(180px, 82vw, 320px);
  }
`;

const StyledSkeleton = styled(Skeleton)`
  border-radius: 12px;
`;

const HorizontalProductList = ({
  title,
  products,
  loading,
  searchQuery = "",
}) => {
  const normalizedProducts = Array.isArray(products) ? products : [];

  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      {loading ? (
        <HorizontalTrack>
          {Array.from({ length: 6 }).map((_, index) => (
            <ItemSlot key={index}>
              <StyledSkeleton variant="rectangular" width="100%" height={330} />
            </ItemSlot>
          ))}
        </HorizontalTrack>
      ) : normalizedProducts.length === 0 ? (
        <EmptyState>
          <FaBoxOpen aria-hidden="true" />
          <p>Nie mamy aktualnie dostępnych produktów.</p>
        </EmptyState>
      ) : (
        <HorizontalTrack>
          {normalizedProducts.map((product) => (
            <ItemSlot key={product._id}>
              <ProductItem product={product} searchQuery={searchQuery} />
            </ItemSlot>
          ))}
        </HorizontalTrack>
      )}
    </Container>
  );
};

export default HorizontalProductList;
