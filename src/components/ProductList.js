import React, { useEffect, useState } from "react";
import { ImageList, ImageListItem, useMediaQuery } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton";
import { ProductItem } from "./ProductItem";

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

  const [columns, setColumns] = useState(calculateColumns);

  useEffect(() => {
    setColumns(calculateColumns);
  }, [isSmallScreen, isMediumScreen, isLargeScreen]);

  return (
    <div
      style={{
        margin: "0 auto",
        padding: "16px",
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
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
                <Skeleton variant="rectangular" width="100%" height={300} />
                <Skeleton width="60%" sx={{ margin: "8px auto" }} />
                <Skeleton width="40%" sx={{ margin: "4px auto" }} />
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
    </div>
  );
};

export default ProductList;
