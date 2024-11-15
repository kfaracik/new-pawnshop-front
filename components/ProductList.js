import React, { useEffect, useState } from "react";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { IconButton, Typography } from "@mui/material";
import { RiAuctionFill } from "react-icons/ri";
import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  0% { opacity: 0; transform: scale(1); }
  100% { opacity: 1; transform: scale(1); }
`;

const truncateTitle = (title, maxLength) =>
  title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;

const ProductList = ({
  products,
  loading,
  totalPages,
  onPageChange,
  searchQuery,
}) => {
  const [columns, setColumns] = useState(2);

  const calculateColumns = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1200) setColumns(4);
    else if (screenWidth >= 900) setColumns(3);
    else setColumns(2);
  };

  useEffect(() => {
    calculateColumns();
    window.addEventListener("resize", calculateColumns);
    return () => window.removeEventListener("resize", calculateColumns);
  }, []);

  const highlightQuery = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span
          key={index}
          style={{
            fontWeight: "bold",
            color: "#e74c3c",
            fontFamily: "'Roboto', sans-serif",
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
    <div style={{ margin: "0 auto" }}>
      <ImageList
        cols={columns}
        gap={16}
        sx={{
          width: "100%",
          padding: "25px",
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          alignItems: "stretch",
        }}
      >
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ImageListItem key={index}>
                <Skeleton variant="rectangular" width="100%" height={350} />
                <Skeleton width="60%" sx={{ margin: "8px auto" }} />
                <Skeleton width="40%" sx={{ margin: "4px auto" }} />
              </ImageListItem>
            ))
          : (products || []).map((product) => {
              const imageUrl = product.images?.[0];
              return (
                <ImageListItem
                  key={product._id}
                  sx={{
                    borderRadius: "5px",
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                    animation: `${fadeIn} 0.3s ease-out`,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <a href={`/product/${product._id}`}>
                    <img
                      src={
                        imageUrl ||
                        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                      }
                      alt={product.title}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "350px",
                        objectFit: "cover",
                        borderRadius: "5px",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </a>
                  <ImageListItemBar
                    title={
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: "'Roboto', sans-serif",
                          fontWeight: "bold",
                          color: "#fff",
                          display: "block",
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
                    }
                    subtitle={
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "'Roboto Slab', serif",
                          color: "#e74c3c",
                          fontSize: "1.2rem",
                        }}
                      >
                        {product.price.toFixed(2)} zł
                      </Typography>
                    }
                    actionIcon={
                      product.isAuction && (
                        <a
                          href={product.auctionLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconButton
                            sx={{
                              color: "rgba(255, 255, 255, 0.54)",
                              right: "10px",
                            }}
                          >
                            <RiAuctionFill />
                          </IconButton>
                        </a>
                      )
                    }
                    sx={{
                      position: "absolute",
                      bottom: 4,
                      width: "100%",
                      background: "rgba(0, 0, 0, 0.65)",
                      padding: "10px",
                    }}
                  />
                </ImageListItem>
              );
            })}
      </ImageList>
      <Pagination
        count={totalPages}
        onChange={(_, page) => onPageChange(page)}
        sx={{
          marginTop: 2,
          display: "flex",
          justifyContent: "center",
          fontFamily: "'Inter', sans-serif",
        }}
      />
    </div>
  );
};

export default ProductList;
