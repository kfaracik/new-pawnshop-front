import React from "react";
import { ImageList, ImageListItem, useMediaQuery } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton";
import styled from "styled-components";
import colors from "styles/colors";
import { ProductItem } from "./ProductItem";

const ListShell = styled.div`
  margin: 0 auto;
  padding: 16px;
  max-width: 100%;
  overflow: hidden;
`;

const EmptyState = styled.div`
  display: grid;
  gap: 10px;
  justify-items: center;
  padding: 56px 20px;
  text-align: center;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  background: linear-gradient(180deg, #f7f7f7, #efefef);
  color: ${colors.textSecondary};

  h3,
  p {
    margin: 0;
  }

  h3 {
    color: ${colors.textPrimary};
    font-size: 1.1rem;
  }
`;

const SkeletonCard = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid #dddddd;
  background: linear-gradient(180deg, #f7f7f7, #eeeeee);
  aspect-ratio: 5 / 7;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.07);
`;

const SkeletonMedia = styled(Skeleton)`
  && {
    height: 100%;
    transform: none;
    border-radius: 0;
    background: linear-gradient(180deg, #ececec, #dddddd);
  }
`;

const SkeletonOverlay = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  padding: 12px;
  display: grid;
  gap: 8px;
  background: linear-gradient(
    to top,
    rgba(248, 248, 248, 0.96) 0%,
    rgba(244, 244, 244, 0.9) 65%,
    rgba(244, 244, 244, 0) 100%
  );
`;

const SkeletonTitleRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
`;

const SkeletonText = styled(Skeleton)`
  && {
    transform: none;
    background: rgba(0, 0, 0, 0.08);
  }
`;

const SkeletonCart = styled(Skeleton)`
  && {
    margin-left: auto;
    flex: 0 0 34px;
    transform: none;
    border-radius: 8px;
    background: rgba(201, 162, 39, 0.22);
  }
`;

const ProductList = ({
  products,
  loading,
  totalPages,
  onPageChange,
  selectedPage,
  searchQuery = "",
}) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:900px)");
  const isLargeScreen = useMediaQuery("(max-width:1200px)");

  const calculateColumns = () => {
    if (isSmallScreen) return 1;
    if (isMediumScreen) return 2;
    if (isLargeScreen) return 3;
    return 4;
  };

  const columns = calculateColumns();

  return (
    <ListShell>
      <ImageList
        cols={columns}
        gap={isSmallScreen ? 8 : 16}
        sx={{
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
          padding: { xs: "8px", sm: "16px", md: "24px" },
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          alignItems: "stretch",
        }}
      >
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ImageListItem key={index}>
                <SkeletonCard>
                  <SkeletonMedia variant="rectangular" width="100%" />
                  <SkeletonOverlay>
                    <SkeletonTitleRow>
                      <SkeletonText variant="text" width="68%" height={24} />
                      <SkeletonCart variant="rounded" width={34} height={34} />
                    </SkeletonTitleRow>
                    <SkeletonText variant="text" width="42%" height={28} />
                    <SkeletonText variant="text" width="55%" height={18} />
                    <SkeletonText variant="text" width="72%" height={16} />
                  </SkeletonOverlay>
                </SkeletonCard>
              </ImageListItem>
            ))
          : (products || []).map((product) => (
              <ProductItem
                key={product._id}
                product={product}
                searchQuery={searchQuery}
              />
            ))}
      </ImageList>
      {!loading && (!products || products.length === 0) && (
        <EmptyState>
          <h3>Brak produktów do wyświetlenia</h3>
          <p>Spróbuj zmienić filtr lub wróć później, gdy pojawią się nowe oferty.</p>
        </EmptyState>
      )}
      {totalPages > 1 && (
        <Pagination
          page={selectedPage ?? 1}
          count={totalPages}
          onChange={(_, page) => onPageChange(page)}
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "center",
            fontFamily: "'Inter', sans-serif",
          }}
        />
      )}
    </ListShell>
  );
};

export default ProductList;
