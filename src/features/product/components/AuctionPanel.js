import React from "react";
import Link from "next/link";

export default function ProductAuctionPanel({
  auction,
  auctionStatus,
  countdownLabel,
  isLoggedIn,
  bidAmount,
  setBidAmount,
  isBidding,
  bidStatus,
  handlePlaceBid,
  auctionStyles,
}) {
  if (!auction) {
    return null;
  }

  const {
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
  } = auctionStyles;

  return (
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
          <span>{auctionStatus === "upcoming" ? "Start za" : "Koniec za"}</span>
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
        <strong>Opis prawny licytacji:</strong> sprzedaż przedmiotu zabezpieczenia
        lombardowego odbywa się zgodnie z ustawą z dnia 14 kwietnia 2023 r. o
        konsumenckiej pożyczce lombardowej (tekst jedn. Dz.U. 2024 poz. 1111), w tym
        art. 25-27, art. 34 oraz art. 47. Co do zasady sprzedaż prowadzona jest w
        formie aukcji elektronicznej kierowanej do nieograniczonego kręgu podmiotów
        (z wyjątkiem ustawowego progu 500 zł). Nadwyżka uzyskana ze sprzedaży ponad
        kwotę do spłaty podlega zwrotowi konsumentowi na zasadach ustawowych.
      </LegalNotice>
    </AuctionPanel>
  );
}
