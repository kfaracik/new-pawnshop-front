import React from "react";
import SmartImage from "components/SmartImage";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import colors from "styles/colors";
import { RiAuctionFill, RiHeartLine, RiHeartFill } from "react-icons/ri";
import CloverMark from "./CloverMark";
import { WishlistContext } from "context/WishlistContext";

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const truncateTitle = (title, maxLength) =>
  title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;

const CardLink = styled(Link)`
  text-decoration: none;
  display: block;
  animation: ${fadeIn} 0.35s ease-out both;
`;

const CardContainer = styled.article`
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #232323;
  background: #0f0f0f;
  aspect-ratio: 5 / 7;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.28s ease,
    border-color 0.28s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(201, 162, 39, 0.55);
    box-shadow: 0 18px 38px rgba(0, 0, 0, 0.32), 0 0 0 1px rgba(201, 162, 39, 0.25);
  }

  &:hover img {
    transform: scale(1.07);
  }

  @media screen and (max-width: 600px) {
    aspect-ratio: 4 / 5;
    border-radius: 14px;
  }
`;

const ProductImageWrapper = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;

  img {
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }
`;

const SecondaryImage = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.5s ease;

  ${CardContainer}:hover & {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Placeholder = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  gap: 8px;
  background: radial-gradient(120% 120% at 50% 0%, #1c1c1c 0%, #0f0f0f 70%);
  color: #3a3a3a;

  span {
    font-size: 0.74rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #5a5a5a;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 48% 0 0 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.93) 0%,
    rgba(0, 0, 0, 0.72) 52%,
    rgba(0, 0, 0, 0) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 5px;
  padding: 16px 14px 14px;
`;

const TopChips = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  right: 56px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
  z-index: 2;
`;

const WishButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 3;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: none;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  color: ${(props) => (props.$active ? "#e0245e" : "#555")};
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.15s ease, color 0.15s ease, background 0.15s ease;

  &:hover {
    transform: scale(1.08);
    color: #e0245e;
  }

  &:active {
    transform: scale(0.92);
  }
`;

const StatusChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  background: ${(props) =>
    props.$tone === "danger"
      ? "rgba(179, 38, 30, 0.9)"
      : props.$tone === "warning"
        ? "rgba(201, 162, 39, 0.92)"
        : "rgba(0, 0, 0, 0.55)"};
  color: ${(props) => (props.$tone === "warning" ? "#1a1400" : "#fff")};
  border: 1px solid rgba(255, 255, 255, 0.14);
`;

const AuctionBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  margin-left: auto;
  border-radius: 9px;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #fff;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
`;

const ProductTitle = styled.h3`
  margin: 0;
  color: #fff;
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media screen and (max-width: 600px) {
    font-size: 0.92rem;
  }
`;

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

const PriceText = styled.span`
  font-weight: 800;
  color: ${colors.primaryLight};
  font-size: 1.15rem;
  letter-spacing: 0.2px;
`;

const AuctionTimer = styled.span`
  font-size: 0.78rem;
  font-weight: 700;
  color: #ffe79a;
`;

const LocationNote = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const highlightQuery = (text, query) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} style={{ color: colors.primaryLight, fontWeight: 700 }}>
        {part}
      </span>
    ) : (
      part
    )
  );
};

const PinIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 21s7-6.4 7-11a7 7 0 10-14 0c0 4.6 7 11 7 11z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const ProductItem = ({ product, searchQuery }) => {
  const [imageFailed, setImageFailed] = React.useState(false);
  const [secondImageFailed, setSecondImageFailed] = React.useState(false);
  const { isWishlisted, toggleWishlist } = React.useContext(WishlistContext);
  const wished = isWishlisted(product._id);

  const handleWishToggle = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleWishlist(product._id);
  };
  const url = `/product/${product._id}`;
  const availabilityStatus = product?.availabilityStatus || "available";
  const hasImage = !imageFailed && Boolean(product.images?.[0]);
  const secondImage = product.images?.[1];
  const hasSecondImage =
    hasImage && Boolean(secondImage) && secondImage !== product.images[0] && !secondImageFailed;

  const reservationLabel = (() => {
    if (!product?.reservationExpiresAt) return "";
    const remaining = Math.max(
      0,
      Math.floor((new Date(product.reservationExpiresAt).getTime() - Date.now()) / 1000)
    );
    const h = String(Math.floor((remaining % 86400) / 3600)).padStart(2, "0");
    const m = String(Math.floor((remaining % 3600) / 60)).padStart(2, "0");
    const s = String(remaining % 60).padStart(2, "0");
    const d = Math.floor(remaining / 86400);
    return d > 0 ? `${d} dni ${h}:${m}:${s}` : `${h}:${m}:${s}`;
  })();

  const locationDetails = Array.isArray(product?.availableLocationDetails)
    ? product.availableLocationDetails
    : [];
  const locationNames =
    locationDetails.length > 0
      ? locationDetails.map((location) => location?.name).filter(Boolean)
      : Array.isArray(product?.availableLocations)
        ? product.availableLocations
        : [];
  const locationLabel =
    product?.availabilityMode === "online_only"
      ? "Dostępne online"
      : locationNames.length > 0
        ? locationNames.join(", ")
        : "Dostępność indywidualna";

  return (
    <CardLink href={url} aria-label={product.title}>
      <CardContainer>
        <ProductImageWrapper>
          {hasImage ? (
            <>
              <SmartImage
                src={product.images[0]}
                alt={product.title}
                fill
                sizes="(max-width: 600px) 50vw, (max-width: 1200px) 33vw, 25vw"
                onError={() => setImageFailed(true)}
              />
              {hasSecondImage && (
                <SecondaryImage aria-hidden="true">
                  <SmartImage
                    src={secondImage}
                    alt=""
                    fill
                    sizes="(max-width: 600px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    onError={() => setSecondImageFailed(true)}
                  />
                </SecondaryImage>
              )}
            </>
          ) : (
            <Placeholder>
              <CloverMark size={40} color="#2a2a2a" />
              <span>Brak zdjęcia</span>
            </Placeholder>
          )}
        </ProductImageWrapper>

        <TopChips>
          {availabilityStatus === "unavailable" && (
            <StatusChip $tone="danger">Niedostępne</StatusChip>
          )}
          {availabilityStatus === "reserved" && (
            <StatusChip $tone="warning">
              Zarezerwowane{reservationLabel ? ` · ${reservationLabel}` : ""}
            </StatusChip>
          )}
          {product.isAuction && (
            <AuctionBadge title="Licytacja">
              <RiAuctionFill />
            </AuctionBadge>
          )}
        </TopChips>

        <WishButton
          type="button"
          onClick={handleWishToggle}
          $active={wished}
          aria-pressed={wished}
          aria-label={wished ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
          title={wished ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
        >
          {wished ? <RiHeartFill /> : <RiHeartLine />}
        </WishButton>

        <Overlay>
          <ProductTitle>
            {highlightQuery(truncateTitle(product.title, 44), searchQuery)}
          </ProductTitle>
          <PriceRow>
            <PriceText>{product.price.toFixed(2)} zł</PriceText>
            {product.isAuction && product.auctionTimerLabel && (
              <AuctionTimer>· {product.auctionTimerLabel}</AuctionTimer>
            )}
          </PriceRow>
          <LocationNote>
            <PinIcon />
            {locationLabel}
          </LocationNote>
        </Overlay>
      </CardContainer>
    </CardLink>
  );
};
