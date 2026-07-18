import React from "react";
import Pagination from "@mui/material/Pagination";
import { FaBoxOpen } from "react-icons/fa";
import styled, { keyframes } from "styled-components";
import colors from "styles/colors";
import { ProductItem } from "./ProductItem";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }
`;

const shimmer = keyframes`
  0% { background-position: 100% 0; }
  100% { background-position: 0 0; }
`;

const SkeletonCard = styled.div`
  width: 100%;
  border-radius: 16px;
  border: 1px solid #ededed;
  aspect-ratio: 5 / 7;
  background: linear-gradient(90deg, #f4f4f4 25%, #ececec 37%, #f4f4f4 63%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.3s ease-in-out infinite;

  @media screen and (max-width: 600px) {
    aspect-ratio: 4 / 5;
    border-radius: 14px;
  }
`;

const EmptyState = styled.div`
  display: grid;
  gap: 10px;
  justify-items: center;
  padding: 60px 20px;
  text-align: center;
  border: 1px dashed #e0e0e0;
  border-radius: 18px;
  background: ${colors.backgroundPaper};
  color: ${colors.textSecondary};

  h3,
  p {
    margin: 0;
  }

  h3 {
    color: ${colors.textPrimary};
    font-size: 1.1rem;
  }

  svg {
    font-size: 2rem;
    color: ${colors.primaryDark};
    opacity: 0.85;
  }
`;

const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 28px;
`;

const paginationSx = {
  "& .MuiPaginationItem-root": {
    fontWeight: 600,
    color: "#4a4a4a",
    borderRadius: "10px",
  },
  "& .MuiPaginationItem-root:hover": {
    backgroundColor: "#fff8e8",
  },
  "& .Mui-selected": {
    backgroundColor: `${colors.primary} !important`,
    color: "#151515",
  },
  "& .Mui-selected:hover": {
    backgroundColor: `${colors.primaryLight} !important`,
  },
};

const ProductList = ({
  products,
  loading,
  totalPages,
  onPageChange,
  selectedPage,
  searchQuery = "",
}) => {
  const items = Array.isArray(products) ? products : [];

  if (loading) {
    return (
      <Grid>
        {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonCard key={`skeleton-${index}`} />
        ))}
      </Grid>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState>
        <FaBoxOpen aria-hidden="true" />
        <h3>Brak produktów</h3>
        <p>Nie znaleźliśmy produktów spełniających wybrane kryteria.</p>
      </EmptyState>
    );
  }

  return (
    <>
      <Grid>
        {items.map((product) => (
          <ProductItem key={product._id} product={product} searchQuery={searchQuery} />
        ))}
      </Grid>
      {totalPages > 1 && (
        <PaginationWrap>
          <Pagination
            page={selectedPage ?? 1}
            count={totalPages}
            onChange={(_, page) => onPageChange(page)}
            shape="rounded"
            sx={paginationSx}
          />
        </PaginationWrap>
      )}
    </>
  );
};

export default ProductList;
