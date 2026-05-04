import React, { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import styled, { keyframes } from "styled-components";
import Modal from "react-modal";
import Link from "next/link";
import { Chip } from "@mui/material";
import PageContainer from "components/PageContainer";
import SeoHead from "components/SeoHead";
import Title from "components/Title";
import Button, { buttonBaseStyle, buttonSecondaryStyle } from "components/Button";
import CartIcon from "assets/icons/CartIcon";
import ProductAuctionPanel from "features/product/components/AuctionPanel";
import ProductGallery from "features/product/components/ProductGallery";
import { sanitizeHtml } from "features/product/lib/sanitizeHtml";
import { getProductSeoData } from "features/product/lib/seo";
import axiosInstance from "lib/axiosInstance";
import { useProduct } from "services/api/useProductApi";
import {
  getAuctionStreamUrl,
  placeAuctionBid,
  useAuction,
  useAuctionBids,
  useAuctions,
} from "services/api/auctionApi";
import { CartContext } from "context/CartContext";
import colors from "styles/colors";
import { getAuthToken } from "utils/authToken";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 24px;
  margin: 24px 0 40px;

  @media screen and (min-width: 768px) {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
    gap: 32px;
  }
`;

const GalleryCard = styled.section`
  background: ${colors.backgroundPaper};
  border: 1px solid #ececec;
  border-radius: 14px;
  padding: 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);

  @media screen and (max-width: 600px) {
    padding: 10px;
  }
`;

const InfoCard = styled.section`
  background: ${colors.backgroundPaper};
  border: 1px solid #ececec;
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media screen and (min-width: 992px) {
    position: sticky;
    top: 16px;
    align-self: start;
  }

  @media screen and (max-width: 600px) {
    padding: 14px;
    gap: 12px;
  }
`;

const MainImage = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #efefef;

  @media screen and (max-width: 600px) {
    aspect-ratio: 1 / 1;
  }
`;

const ThumbGrid = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
  gap: 8px;
`;

const ThumbButton = styled.button`
  border: 2px solid ${(props) => (props.active ? colors.primary : "#e6e6e6")};
  border-radius: 8px;
  overflow: hidden;
  padding: 0;
  background: #fff;
  cursor: pointer;
  line-height: 0;

  .thumb-image {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

const Price = styled.span`
  font-size: clamp(1.7rem, 3vw, 2.2rem);
  color: ${colors.primaryDark};
  font-weight: 700;
  letter-spacing: 0.3px;
`;

const ActionGroup = styled.div`
  display: grid;
  gap: 10px;
  width: 100%;

  @media screen and (min-width: 601px) {
    justify-items: start;
  }
`;

const ImagesWrapper = styled.div`
  display: contents;
`;

const FullscreenImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: min(1200px, 96vw);
  max-height: 92dvh;
  padding: 16px;
`;

const FullscreenImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.45);
  animation: ${keyframes`
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  `} 0.3s ease forwards;
`;

const IconControlButton = styled.button`
  position: absolute;
  width: 48px;
  height: 48px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(20, 20, 20, 0.52);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
  cursor: pointer;
  z-index: 3;
  transition: background-color 0.2s ease, transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: rgba(20, 20, 20, 0.72);
    border-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.04);
  }

  &:focus-visible {
    outline: 3px solid rgba(255, 255, 255, 0.72);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
  }

  svg {
    font-size: 2rem;
  }

  @media (max-width: 600px) {
    width: 42px;
    height: 42px;

    svg {
      font-size: 1.8rem;
    }
  }
`;

const CloseButton = styled(IconControlButton)`
  top: 22px;
  right: 22px;
`;

const NavigationButton = styled(IconControlButton)`
  top: 50%;
  transform: translateY(-50%);

  ${(props) => (props.side === "left" ? "left: 18px;" : "right: 18px;")}

  @media (max-width: 600px) {
    ${(props) => (props.side === "left" ? "left: 10px;" : "right: 10px;")}
  }
`;

const Description = styled.div`
  font-size: 0.98rem;
  padding-top: 2px;
  line-height: 1.5;
  color: ${colors.textSecondary};
  border-top: 1px solid #efefef;
  padding-top: 12px;
`;

const AuctionLink = styled(Link)`
  display: inline-block;
  margin: 2px 0 0;
  color: ${colors.primaryDark};
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.primary};
  }
`;

const AuctionPanel = styled.section`
  border: 1px solid #ece6d2;
  background: #fffcf4;
  border-radius: 12px;
  padding: 12px;
  display: grid;
  gap: 8px;
`;

const AuctionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  font-size: 0.92rem;
  color: ${colors.textSecondary};

  strong {
    color: ${colors.textPrimary};
  }

  @media (max-width: 600px) {
    font-size: 0.88rem;
  }
`;

const BidForm = styled.form`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;

const BidInput = styled.input`
  flex: 1;
  min-width: 160px;
  padding: 10px 12px;
  border: 1px solid #ddd5bd;
  border-radius: 8px;
  font-size: 0.95rem;

  @media (max-width: 600px) {
    min-width: 0;
    width: 100%;
  }
`;

const BidButton = styled.button`
  ${buttonBaseStyle}
  background: ${colors.primary};
  border-color: ${colors.primaryDark};
  color: ${colors.primaryContrastText};

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const BidHint = styled.p`
  margin: 0;
  font-size: 0.82rem;
  color: ${(props) => (props.error ? colors.error : colors.textSecondary)};
`;

const AuthRequiredNotice = styled.div`
  margin-top: 6px;
  padding: 10px;
  border: 1px solid #e8dec0;
  border-radius: 10px;
  background: #fff7df;
  color: ${colors.textSecondary};
  font-size: 0.86rem;
  line-height: 1.4;

  a {
    color: ${colors.primaryDark};
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

const ReservationNotice = styled.div`
  margin-top: 6px;
  padding: 10px;
  border: 1px solid #f0d7c7;
  border-radius: 10px;
  background: #fff5ef;
  color: ${colors.textSecondary};
  font-size: 0.86rem;
  line-height: 1.4;

  strong {
    color: ${colors.textPrimary};
  }
`;

const AvailabilityDetails = styled.div`
  padding: 12px;
  border: 1px solid #ece6d2;
  border-radius: 12px;
  background: #fffdf7;
  color: ${colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.5;

  strong {
    color: ${colors.textPrimary};
  }
`;

const BidHistory = styled.ul`
  margin: 2px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 6px;
`;

const BidHistoryItem = styled.li`
  font-size: 0.84rem;
  color: ${colors.textSecondary};
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const LegalNotice = styled.div`
  margin-top: 6px;
  border-top: 1px solid #ece6d2;
  padding-top: 10px;
  color: ${colors.textSecondary};
  font-size: 0.82rem;
  line-height: 1.45;

  strong {
    color: ${colors.textPrimary};
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ModalContent = styled.div`
  text-align: center;
  color: #333;
  animation: ${slideIn} 0.4s ease forwards;

  h2 {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 20px;
  }

  p {
    font-size: 1rem;
    margin-bottom: 20px;
    line-height: 1.5;
  }

  button {
    ${buttonBaseStyle}
    ${buttonSecondaryStyle}
    margin: 10px;
  }

  button:first-of-type {
    background: ${colors.primary};
    border-color: ${colors.primaryDark};
    color: ${colors.primaryContrastText};
  }

  @media (max-width: 600px) {
    h2 {
      font-size: 1.45rem;
      margin-bottom: 14px;
    }

    p {
      margin-bottom: 14px;
    }

    button {
      width: 100%;
      margin: 6px 0;
    }
  }
`;

const Toast = styled.div`
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 1200;
  min-width: min(360px, calc(100vw - 32px));
  max-width: min(420px, calc(100vw - 32px));
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid ${(props) => (props.$variant === "error" ? "#f2b8b5" : "#d8c27a")};
  background: ${(props) => (props.$variant === "error" ? "#fff4f3" : "#fff8e6")};
  color: ${colors.textPrimary};
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  font-size: 0.92rem;
  line-height: 1.45;
`;

const StyledTitle = styled(Title)`
  margin: 0;
  font-size: clamp(1.35rem, 2.5vw, 1.9rem);
  line-height: 1.2;
`;

const ProductPage = ({ initialProduct = null }) => {
  const { query, push } = useRouter();
  const { id } = query;
  const { data: product, isLoading, refetch: refetchProduct } = useProduct(id, initialProduct);
  const safeDescription = useMemo(
    () => sanitizeHtml(product?.description),
    [product?.description]
  );
  const { data: auctionsData } = useAuctions({
    productId: id,
    enabled: !!id,
  });
  const auctionsList = useMemo(
    () => (Array.isArray(auctionsData) ? auctionsData : []),
    [auctionsData]
  );
  const auctionId = auctionsList?.[0]?._id || auctionsList?.[0]?.id || null;
  const { data: auctionDetail, refetch: refetchAuction } = useAuction(
    auctionId,
    !!auctionId
  );
  const { data: auctionBids, refetch: refetchBids } = useAuctionBids(
    auctionId,
    !!auctionId
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [bidAmount, setBidAmount] = useState("");
  const [bidStatus, setBidStatus] = useState({ error: "", info: "" });
  const [isBidding, setIsBidding] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [toast, setToast] = useState(null);
  const [liveAuction, setLiveAuction] = useState(null);
  const [liveBids, setLiveBids] = useState([]);
  const { addProduct, cartProducts } = useContext(CartContext);
  const isLoggedIn = Boolean(getAuthToken());

  const showToast = (message, variant = "warning") => {
    setToast({ message, variant });
    if (typeof window !== "undefined") {
      window.clearTimeout(showToast.timeoutId);
      showToast.timeoutId = window.setTimeout(() => {
        setToast(null);
      }, 4500);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement("#__next");
    }
  }, []);
  const resolveAvailableQuantity = (productData = product) => {
    const fromQuantity = Number(productData?.quantity);
    if (Number.isFinite(fromQuantity)) {
      return Math.max(0, fromQuantity);
    }

    const fromAvailableQuantity = Number(productData?.availableQuantity);
    if (Number.isFinite(fromAvailableQuantity)) {
      return Math.max(0, fromAvailableQuantity);
    }

    const fromProperty = Number(productData?.properties?.quantity);
    if (Number.isFinite(fromProperty)) {
      return Math.max(0, fromProperty);
    }

    const fromStock = Number(productData?.stock);
    if (Number.isFinite(fromStock) && fromStock > 0) {
      return Math.max(0, fromStock);
    }

    if (productData?.availabilityStatus === "available") {
      return Infinity;
    }

    return 0;
  };
  const maxProductQuantity = useMemo(() => resolveAvailableQuantity(product), [product]);
  const currentInCart = useMemo(
    () =>
      (cartProducts || []).reduce((acc, item) => {
        if (String(item.productId) !== String(id)) return acc;
        return acc + Number(item.quantity || 0);
      }, 0),
    [cartProducts, id]
  );
  const reservationCountdown = useMemo(() => {
    if (!product?.reservationExpiresAt) return "";
    const remaining = Math.max(
      0,
      Math.floor((new Date(product.reservationExpiresAt).getTime() - now) / 1000)
    );
    const days = Math.floor(remaining / 86400);
    const hours = String(Math.floor((remaining % 86400) / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((remaining % 3600) / 60)).padStart(2, "0");
    const seconds = String(remaining % 60).padStart(2, "0");
    return days > 0
      ? `${days} dni ${hours}:${minutes}:${seconds}`
      : `${hours}:${minutes}:${seconds}`;
  }, [product, now]);

  const auction = useMemo(() => {
    if (!product?.isAuction) return null;
    const base = liveAuction || auctionDetail || auctionsList?.[0] || {};
    return {
      id: base._id || base.id || product.auctionId || null,
      startAt: base.startAt || product.auctionStartAt || null,
      endAt: base.endAt || product.auctionEndAt || null,
      status: base.status || null,
      currentPrice:
        Number(base.currentPrice ?? base.currentBid ?? product.currentPrice) ||
        Number(product.price || 0),
      minIncrement:
        Number(base.minIncrement ?? product.auctionMinIncrement) || 1,
      bids: Array.isArray(liveBids) && liveBids.length
        ? liveBids
        : Array.isArray(auctionBids)
          ? auctionBids
          : [],
    };
  }, [auctionDetail, auctionBids, auctionsList, liveAuction, liveBids, product]);

  useEffect(() => {
    setLiveAuction(auctionDetail || auctionsList?.[0] || null);
  }, [auctionDetail, auctionsList]);

  useEffect(() => {
    if (Array.isArray(auctionBids)) {
      setLiveBids(auctionBids);
    }
  }, [auctionBids]);

  useEffect(() => {
    if (!auctionId) return undefined;

    const stream = new EventSource(getAuctionStreamUrl(auctionId));

    stream.addEventListener("bid_updated", (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload?.auction) setLiveAuction((prev) => ({ ...(prev || {}), ...payload.auction }));
        if (payload?.bid) {
          setLiveBids((prev) => [payload.bid, ...prev].slice(0, 20));
        }
      } catch (_e) {}
    });

    stream.addEventListener("status_changed", (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload?.auction) setLiveAuction((prev) => ({ ...(prev || {}), ...payload.auction }));
      } catch (_e) {}
    });

    stream.onerror = () => {
      refetchAuction();
      refetchBids();
    };

    return () => stream.close();
  }, [auctionId, refetchAuction, refetchBids]);

  useEffect(() => {
    if (!auction && !product?.reservationExpiresAt) return undefined;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [auction, product?.reservationExpiresAt]);

  const auctionStatus = useMemo(() => {
    if (!auction) return "none";
    if (auction.status) {
      if (auction.status === "scheduled") return "upcoming";
      if (auction.status === "live") return "active";
      if (auction.status === "ended" || auction.status === "canceled") return "ended";
    }
    const start = auction.startAt ? new Date(auction.startAt).getTime() : null;
    const end = auction.endAt ? new Date(auction.endAt).getTime() : null;

    if (start && now < start) return "upcoming";
    if (end && now > end) return "ended";
    return "active";
  }, [auction, now]);

  const countdownLabel = useMemo(() => {
    if (!auction) return "";
    const targetTs =
      auctionStatus === "upcoming"
        ? new Date(auction.startAt).getTime()
        : auctionStatus === "active" && auction.endAt
          ? new Date(auction.endAt).getTime()
          : null;
    if (!targetTs) return "";

    const seconds = Math.max(0, Math.floor((targetTs - now) / 1000));
    const days = Math.floor(seconds / 86400);
    const hours = String(Math.floor((seconds % 86400) / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    if (days > 0) {
      const dayLabel = days === 1 ? "dzień" : "dni";
      return `${days} ${dayLabel} ${hours}:${minutes}:${secs}`;
    }

    return `${hours}:${minutes}:${secs}`;
  }, [auction, auctionStatus, now]);

  const handleAddToCart = async () => {
    if (isCheckingAvailability || isModalOpen) return;

    try {
      setIsCheckingAvailability(true);
      const response = await axiosInstance.get(`/products/${id}`);
      const freshProduct = response?.data || null;
      const freshMaxQuantity = resolveAvailableQuantity(freshProduct);
      const freshAvailabilityStatus =
        freshProduct?.availabilityStatus || "available";

      if (freshAvailabilityStatus === "reserved") {
        showToast(
          "Ten produkt jest obecnie zarezerwowany przez innego użytkownika.",
          "warning"
        );
        await refetchProduct();
        return;
      }

      if (freshAvailabilityStatus === "unavailable" || freshMaxQuantity <= 0) {
        showToast(
          "Ten produkt jest już niedostępny. Ktoś mógł właśnie wykupić ostatnią sztukę.",
          "warning"
        );
        await refetchProduct();
        return;
      }

      if (currentInCart >= freshMaxQuantity) {
        showToast(
          freshMaxQuantity === 1
            ? "Masz już w koszyku ostatnią dostępną sztukę tego produktu."
            : `W koszyku masz już maksymalną dostępną ilość: ${freshMaxQuantity} szt.`,
          "warning"
        );
        await refetchProduct();
        return;
      }

      setIsModalOpen(true);
      addProduct(id, freshMaxQuantity);
    } catch (_error) {
      showToast(
        "Nie udało się sprawdzić aktualnej dostępności produktu. Spróbuj ponownie za chwilę.",
        "error"
      );
      return;
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => setIsImageModalOpen(false);

  const goToCart = () => {
    push("/cart");
  };

  const showNextImage = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex + 1) % product.images.length
    );
  };

  const showPrevImage = () => {
    setSelectedImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  const handlePlaceBid = async (e) => {
    e.preventDefault();
    if (!auction?.id) return;
    if (!isLoggedIn) {
      setBidStatus({
        error: "Aby wziąć udział w licytacji, musisz się zalogować.",
        info: "",
      });
      return;
    }

    const amount = Number(bidAmount.replace(",", "."));
    const minAllowed = Number(auction.currentPrice) + Number(auction.minIncrement);

    if (!Number.isFinite(amount) || amount < minAllowed) {
      setBidStatus({
        error: `Minimalna oferta to ${minAllowed.toFixed(2)} zł.`,
        info: "",
      });
      return;
    }

    try {
      setIsBidding(true);
      setBidStatus({ error: "", info: "" });
      await placeAuctionBid({ auctionId: auction.id, amount });
      setBidAmount("");
      setBidStatus({ error: "", info: "Oferta została złożona." });
      await refetchAuction();
    } catch (error) {
      const isAuthError =
        error?.response?.status === 401 ||
        String(error?.response?.data?.message || "")
          .toLowerCase()
          .includes("no token provided");

      setBidStatus({
        error: isAuthError
          ? "Aby wziąć udział w licytacji, musisz się zalogować."
          : error.response?.data?.message || "Nie udało się złożyć oferty.",
        info: "",
      });
    } finally {
      setIsBidding(false);
    }
  };

  const { seoTitle, seoDescription, canonicalPath, productSchema } =
    getProductSeoData(product, id);
  const locationDetails = Array.isArray(product?.availableLocationDetails)
    ? product.availableLocationDetails
    : [];
  const locationNames =
    locationDetails.length > 0
      ? locationDetails.map((location) => location?.name).filter(Boolean)
      : Array.isArray(product?.availableLocations)
        ? product.availableLocations
        : [];
  const productAvailabilityLabel =
    product?.availabilityMode === "online_only"
      ? "Produkt dostępny wyłącznie online."
      : locationNames.length > 0
        ? `Produkt dostępny w punktach: ${locationNames.join(", ")}.`
        : "Dostępność punktowa potwierdzana indywidualnie przez obsługę.";

  return (
    <PageContainer loading={isLoading}>
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        path={canonicalPath}
        image={product?.images?.[0]}
        schema={productSchema}
      />
      {!!product ? (
        <>
          <ColWrapper>
            <ImagesWrapper>
              <ProductGallery
                product={product}
                selectedImageIndex={selectedImageIndex}
                setSelectedImageIndex={setSelectedImageIndex}
                isImageModalOpen={isImageModalOpen}
                handleImageClick={handleImageClick}
                closeImageModal={closeImageModal}
                showPrevImage={showPrevImage}
                showNextImage={showNextImage}
                galleryStyles={{
                  GalleryCard,
                  MainImage,
                  ThumbGrid,
                  ThumbButton,
                  FullscreenImageContainer,
                  FullscreenImage,
                  NavigationButton,
                  CloseButton,
                }}
              />
            </ImagesWrapper>
            <InfoCard>
              <MetaRow>
                <StyledTitle>{product.title}</StyledTitle>
                {product.isAuction && (
                  <Chip
                    label="Licytacja"
                    size="small"
                    sx={{
                      backgroundColor: colors.secondaryDark,
                      color: colors.primaryLight,
                      border: `1px solid ${colors.primaryDark}`,
                      fontWeight: 600,
                    }}
                  />
                )}
              </MetaRow>
              <Price>{product.price.toFixed(2)} zł</Price>
              <Description
                dangerouslySetInnerHTML={{ __html: safeDescription }}
              />
              {locationDetails.length > 0 && product?.availabilityMode !== "online_only" && (
                <div style={{ marginTop: "18px", display: "grid", gap: "10px" }}>
                  {locationDetails.map((location) => (
                    <div
                      key={location._id || location.name}
                      style={{
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                        padding: "12px 14px",
                        background: "#faf7ef",
                      }}
                    >
                      <div style={{ fontWeight: 700, marginBottom: "4px" }}>{location.name}</div>
                      <div style={{ fontSize: "0.95rem", color: "#4b5563", lineHeight: 1.5 }}>
                        {[location.city, location.addressLine1, location.addressLine2]
                          .filter(Boolean)
                          .join(", ")}
                      </div>
                      {(location.postalCode || location.phone || location.email) && (
                        <div style={{ fontSize: "0.92rem", color: "#6b7280", marginTop: "4px" }}>
                          {[location.postalCode, location.phone, location.email]
                            .filter(Boolean)
                            .join(" | ")}
                        </div>
                      )}
                      {location.description && (
                        <div style={{ fontSize: "0.92rem", color: "#6b7280", marginTop: "6px" }}>
                          {location.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <AvailabilityDetails>
                <strong>Dostępność:</strong> {productAvailabilityLabel}
              </AvailabilityDetails>
              {product.isAuction && auction && (
                <ProductAuctionPanel
                  auction={auction}
                  auctionStatus={auctionStatus}
                  countdownLabel={countdownLabel}
                  isLoggedIn={isLoggedIn}
                  bidAmount={bidAmount}
                  setBidAmount={setBidAmount}
                  isBidding={isBidding}
                  bidStatus={bidStatus}
                  handlePlaceBid={handlePlaceBid}
                  auctionStyles={{
                    AuctionPanel,
                    AuctionRow,
                    BidForm,
                    BidInput,
                    BidButton,
                    BidHint,
                    AuthRequiredNotice,
                    BidHistory,
                    BidHistoryItem,
                    LegalNotice,
                  }}
                />
              )}
              {product.auctionLink && (
                <AuctionLink
                  href={product.auctionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Przejdź do licytacji
                </AuctionLink>
              )}
              {!product.isAuction && (
                <ActionGroup>
                  <Button
                    primary
                    onClick={handleAddToCart}
                    disabled={
                      isModalOpen ||
                      isCheckingAvailability ||
                      currentInCart >= maxProductQuantity ||
                      product?.availabilityStatus === "reserved" ||
                      product?.availabilityStatus === "unavailable"
                    }
                    style={{
                      fontSize: "1.05rem",
                      padding: "13px 22px",
                      alignSelf: "stretch",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <CartIcon /> Dodaj do koszyka
                  </Button>
                  {product?.availabilityStatus === "reserved" && (
                    <ReservationNotice>
                      <strong>Status:</strong> zarezerwowane
                      {reservationCountdown ? ` (${reservationCountdown})` : ""}.
                    </ReservationNotice>
                  )}
                  {product?.availabilityStatus === "unavailable" && (
                    <ReservationNotice>
                      <strong>Status:</strong> niedostępne.
                    </ReservationNotice>
                  )}
                </ActionGroup>
              )}
            </InfoCard>
          </ColWrapper>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Product Added Modal"
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px",
              },
              content: {
                borderRadius: "12px",
                width: "100%",
                maxWidth: "500px",
                padding: "20px",
                textAlign: "center",
                position: "static",
                inset: "auto",
                maxHeight: "calc(100dvh - 32px)",
                overflowY: "auto",
              },
            }}
          >
            <ModalContent>
              <h2>Dodano do koszyka!</h2>
              <p>{product.title} został pomyślnie dodany do Twojego koszyka.</p>
              <button type="button" onClick={goToCart}>Przejdź do koszyka</button>
              <button type="button" onClick={closeModal}>Kontynuuj zakupy</button>
            </ModalContent>
          </Modal>
          {toast && <Toast $variant={toast.variant}>{toast.message}</Toast>}
        </>
      ) : (
        <>Ładowanie danych produktu...</>
      )}
    </PageContainer>
  );
};

export default ProductPage;

export async function getServerSideProps(context) {
  const { id } = context.params || {};
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!id || !apiBaseUrl) {
    return { props: { initialProduct: null } };
  }

  try {
    const response = await fetch(
      `${apiBaseUrl.replace(/\/$/, "")}/products/${encodeURIComponent(id)}`
    );

    if (!response.ok) {
      return { props: { initialProduct: null } };
    }

    const initialProduct = await response.json();
    return {
      props: {
        initialProduct,
      },
    };
  } catch (_error) {
    return {
      props: {
        initialProduct: null,
      },
    };
  }
}
