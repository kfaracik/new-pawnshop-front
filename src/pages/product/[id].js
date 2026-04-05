import React, { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import styled, { keyframes } from "styled-components";
import Modal from "react-modal";
import Link from "next/link";
import { Chip } from "@mui/material";
import { MdChevronLeft, MdChevronRight, MdClose } from "react-icons/md";
import PageContainer from "components/PageContainer";
import Title from "components/Title";
import Button from "components/Button";
import CartIcon from "assets/icons/CartIcon";
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

  img {
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
  border: 1px solid ${colors.primaryDark};
  background: ${colors.primary};
  color: ${colors.primaryContrastText};
  border-radius: 8px;
  font-weight: 700;
  padding: 10px 14px;
  cursor: pointer;

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
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 10px;

    &:hover {
      background-color: #e64a19;
    }
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

const StyledTitle = styled(Title)`
  margin: 0;
  font-size: clamp(1.35rem, 2.5vw, 1.9rem);
  line-height: 1.2;
`;

const ProductPage = () => {
  const { query, push } = useRouter();
  const { id } = query;
  const { data: product, isLoading } = useProduct(id);
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
  const [liveAuction, setLiveAuction] = useState(null);
  const [liveBids, setLiveBids] = useState([]);
  const { addProduct, cartProducts } = useContext(CartContext);
  const isLoggedIn = Boolean(getAuthToken());
  const maxProductQuantity = useMemo(() => {
    const fromQuantity = Number(product?.quantity);
    if (Number.isFinite(fromQuantity)) {
      return Math.max(0, fromQuantity);
    }

    const fromAvailableQuantity = Number(product?.availableQuantity);
    if (Number.isFinite(fromAvailableQuantity)) {
      return Math.max(0, fromAvailableQuantity);
    }

    const fromProperty = Number(product?.properties?.quantity);
    if (Number.isFinite(fromProperty)) {
      return Math.max(0, fromProperty);
    }

    const fromStock = Number(product?.stock);
    if (Number.isFinite(fromStock)) {
      return Math.max(0, fromStock);
    }

    return 0;
  }, [product]);
  const currentInCart = useMemo(
    () =>
      (cartProducts || []).reduce((acc, item) => {
        if (String(item.productId) !== String(id)) return acc;
        return acc + Number(item.quantity || 0);
      }, 0),
    [cartProducts, id]
  );

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
    if (!auction) return undefined;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [auction]);

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

  const handleAddToCart = () => {
    if (currentInCart >= maxProductQuantity) return;
    setIsModalOpen(true);
    addProduct(id, maxProductQuantity);
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

  return (
    <PageContainer loading={isLoading}>
      {!!product ? (
        <>
          <ColWrapper>
            <ImagesWrapper>
              <GalleryCard>
                <MainImage
                  src={product.images[selectedImageIndex]}
                  alt={`${product.title} - ${selectedImageIndex + 1}`}
                  onClick={() => handleImageClick(selectedImageIndex)}
                />
                <ThumbGrid>
                  {product.images.map((image, index) => (
                    <ThumbButton
                      key={index}
                      type="button"
                      active={selectedImageIndex === index}
                      onClick={() => setSelectedImageIndex(index)}
                      aria-label={`Pokaż zdjęcie ${index + 1}`}
                    >
                      <img src={image} alt={`${product.title} miniatura ${index + 1}`} />
                    </ThumbButton>
                  ))}
                </ThumbGrid>
              </GalleryCard>
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
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
              {product.isAuction && auction && (
                <AuctionPanel>
                  <AuctionRow>
                    <span>Status</span>
                    <strong>
                      {auctionStatus === "upcoming"
                        ? "Nierozpoczęta"
                        : auctionStatus === "active"
                          ? "Aktywna"
                          : "Zakończona"}
                    </strong>
                  </AuctionRow>
                  {!!countdownLabel && (
                    <AuctionRow>
                      <span>
                        {auctionStatus === "upcoming"
                          ? "Start za"
                          : "Koniec za"}
                      </span>
                      <strong>{countdownLabel}</strong>
                    </AuctionRow>
                  )}
                  <AuctionRow>
                    <span>Aktualna oferta</span>
                    <strong>{auction.currentPrice.toFixed(2)} zł</strong>
                  </AuctionRow>
                  <AuctionRow>
                    <span>Przebicie min.</span>
                    <strong>{auction.minIncrement.toFixed(2)} zł</strong>
                  </AuctionRow>
                  {auctionStatus === "active" && auction.id && isLoggedIn && (
                    <>
                      <BidForm onSubmit={handlePlaceBid}>
                        <BidInput
                          type="number"
                          inputMode="decimal"
                          step="0.01"
                          min={(auction.currentPrice + auction.minIncrement).toFixed(2)}
                          placeholder="Twoja oferta (zł)"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                        />
                        <BidButton type="submit" disabled={isBidding}>
                          {isBidding ? "Składanie..." : "Licytuj"}
                        </BidButton>
                      </BidForm>
                      {bidStatus.error && <BidHint error>{bidStatus.error}</BidHint>}
                      {bidStatus.info && <BidHint>{bidStatus.info}</BidHint>}
                    </>
                  )}
                  {auctionStatus === "active" && auction.id && !isLoggedIn && (
                    <AuthRequiredNotice>
                      W licytacji mogą brać udział wyłącznie zalogowani użytkownicy.{" "}
                      <Link href="/account">Zaloguj się</Link>, aby złożyć ofertę.
                    </AuthRequiredNotice>
                  )}
                  {!!auction.bids?.length && (
                    <>
                      <AuctionRow>
                        <span>Ostatnie oferty</span>
                      </AuctionRow>
                      <BidHistory>
                        {auction.bids.slice(0, 5).map((bid, index) => (
                          <BidHistoryItem key={bid._id || bid.id || index}>
                            <span>{new Date(bid.createdAt || Date.now()).toLocaleTimeString()}</span>
                            <strong>{Number(bid.amount || 0).toFixed(2)} zł</strong>
                          </BidHistoryItem>
                        ))}
                      </BidHistory>
                    </>
                  )}
                  <LegalNotice>
                    <strong>Opis prawny licytacji:</strong> sprzedaż przedmiotu zabezpieczenia lombardowego odbywa się zgodnie z ustawą z dnia 14 kwietnia 2023 r. o konsumenckiej pożyczce lombardowej (tekst jedn. Dz.U. 2024 poz. 1111), w tym art. 25-27, art. 34 oraz art. 47. Co do zasady sprzedaż prowadzona jest w formie aukcji elektronicznej kierowanej do nieograniczonego kręgu podmiotów (z wyjątkiem ustawowego progu 500 zł). Nadwyżka uzyskana ze sprzedaży ponad kwotę do spłaty podlega zwrotowi konsumentowi na zasadach ustawowych.
                  </LegalNotice>
                </AuctionPanel>
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
                <Button
                  primary
                  onClick={handleAddToCart}
                  disabled={currentInCart >= maxProductQuantity}
                  style={{
                    fontSize: "1.05rem",
                    padding: "13px 22px",
                    alignSelf: "flex-start",
                  }}
                >
                  <CartIcon /> Dodaj do koszyka
                </Button>
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
              <button onClick={goToCart}>Przejdź do koszyka</button>
              <button onClick={closeModal}>Kontynuuj zakupy</button>
            </ModalContent>
          </Modal>
          {isImageModalOpen && (
            <Modal
              isOpen={isImageModalOpen}
              onRequestClose={closeImageModal}
              contentLabel="Fullscreen Image Modal"
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                },
                content: {
                  backgroundColor: "transparent",
                  border: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
            >
              <FullscreenImageContainer>
                <NavigationButton
                  side="left"
                  type="button"
                  onClick={showPrevImage}
                  aria-label="Poprzednie zdjęcie"
                >
                  <MdChevronLeft />
                </NavigationButton>
                <FullscreenImage
                  src={product.images[selectedImageIndex]}
                  alt={`${product.title} - ${selectedImageIndex + 1}`}
                />
                <NavigationButton
                  side="right"
                  type="button"
                  onClick={showNextImage}
                  aria-label="Następne zdjęcie"
                >
                  <MdChevronRight />
                </NavigationButton>
                <CloseButton
                  type="button"
                  onClick={closeImageModal}
                  aria-label="Zamknij podgląd zdjęcia"
                >
                  <MdClose />
                </CloseButton>
              </FullscreenImageContainer>
            </Modal>
          )}
        </>
      ) : (
        <>Ładowanie danych produktu...</>
      )}
    </PageContainer>
  );
};

export default ProductPage;
