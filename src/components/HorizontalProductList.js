import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Skeleton from "@mui/material/Skeleton";
import { FaBoxOpen } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import colors from "styles/colors";
import { ProductItem } from "./ProductItem";

const Wrapper = styled.section`
  position: relative;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 800;
  letter-spacing: -0.01em;
  color: ${colors.textPrimary};
`;

const Arrows = styled.div`
  display: none;
  gap: 8px;

  @media screen and (min-width: 768px) {
    display: flex;
  }
`;

const ArrowButton = styled.button`
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid #e6e6e6;
  background: #fff;
  color: ${colors.textPrimary};
  cursor: pointer;
  font-size: 20px;
  transition: border-color 0.15s, background 0.15s, color 0.15s, opacity 0.15s;

  &:hover:not(:disabled) {
    border-color: ${colors.primary};
    background: #fff8e8;
    color: ${colors.primaryDark};
  }

  &:disabled {
    opacity: 0.35;
    cursor: default;
  }
`;

const Track = styled.div`
  --track-inset: 16px;
  display: flex;
  gap: 14px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: var(--track-inset);
  /* Generous padding + matching negative margin so card shadows (and the hover
     lift) are never clipped by the scroll container, while cards stay flush
     with the section title. */
  padding: 16px var(--track-inset) 30px;
  margin-inline: calc(var(--track-inset) * -1);
  scroll-behavior: smooth;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 600px) {
    gap: 12px;
    --track-inset: 12px;
  }
`;

const EmptyState = styled.div`
  padding: 32px 16px;
  display: grid;
  justify-items: center;
  gap: 10px;
  color: ${colors.textSecondary};
  text-align: center;
  border: 1px dashed #e0e0e0;
  border-radius: 16px;

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
    flex-basis: clamp(180px, 78vw, 300px);
  }
`;

const StyledSkeleton = styled(Skeleton)`
  border-radius: 16px;
`;

const HorizontalProductList = ({
  title,
  products,
  loading,
  searchQuery = "",
}) => {
  const normalizedProducts = Array.isArray(products) ? products : [];
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return undefined;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows, normalizedProducts.length, loading]);

  const scrollByCards = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  };

  const hasProducts = normalizedProducts.length > 0;

  return (
    <Wrapper>
      <Head>
        <Title>{title}</Title>
        {hasProducts && !loading && (
          <Arrows>
            <ArrowButton
              type="button"
              aria-label="Przewiń w lewo"
              onClick={() => scrollByCards(-1)}
              disabled={!canScrollLeft}
            >
              <FiChevronLeft />
            </ArrowButton>
            <ArrowButton
              type="button"
              aria-label="Przewiń w prawo"
              onClick={() => scrollByCards(1)}
              disabled={!canScrollRight}
            >
              <FiChevronRight />
            </ArrowButton>
          </Arrows>
        )}
      </Head>

      {loading ? (
        <Track>
          {Array.from({ length: 6 }).map((_, index) => (
            <ItemSlot key={index}>
              <StyledSkeleton variant="rectangular" width="100%" height={340} />
            </ItemSlot>
          ))}
        </Track>
      ) : !hasProducts ? (
        <EmptyState>
          <FaBoxOpen aria-hidden="true" />
          <p>Nie mamy aktualnie dostępnych produktów.</p>
        </EmptyState>
      ) : (
        <Track ref={trackRef}>
          {normalizedProducts.map((product) => (
            <ItemSlot key={product._id}>
              <ProductItem product={product} searchQuery={searchQuery} />
            </ItemSlot>
          ))}
        </Track>
      )}
    </Wrapper>
  );
};

export default HorizontalProductList;
