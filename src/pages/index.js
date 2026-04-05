import React, { useEffect, useMemo, useState } from "react";
import PageContainer from "components/PageContainer";
import { useNewProducts } from "services/api/newProductsApi";
import { usePopularProducts } from "services/api/popularProductsApi";
import { useAuctions } from "services/api/auctionApi";
import Slogan from "components/Slogan";
import HorizontalProductList from "components/HorizontalProductList";

export default function HomePage() {
  const [now, setNow] = useState(Date.now());
  const { data: newProducts, isLoading: isLoadingNew } = useNewProducts();
  const { data: popularProducts, isLoading: isLoadingPopular } =
    usePopularProducts();
  const { data: auctionsData = [], isLoading: isLoadingAuctions } = useAuctions({
    enabled: true,
  });

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const auctionsProducts = useMemo(() => {
    const formatRemaining = (endAt) => {
      const target = new Date(endAt).getTime();
      if (!Number.isFinite(target)) return "";
      const seconds = Math.max(0, Math.floor((target - now) / 1000));
      const days = Math.floor(seconds / 86400);
      const hours = String(Math.floor((seconds % 86400) / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
      const secs = String(seconds % 60).padStart(2, "0");
      if (days > 0) return `${days} dni ${hours}:${minutes}:${secs}`;
      return `${hours}:${minutes}:${secs}`;
    };

    return (Array.isArray(auctionsData) ? auctionsData : [])
      .filter((auction) => auction?.productId && auction?.endAt)
      .sort((a, b) => new Date(a.endAt).getTime() - new Date(b.endAt).getTime())
      .map((auction) => {
        const product = auction.productId;
        return {
          ...product,
          _id: product?._id || auction.productId,
          isAuction: true,
          price: Number(auction.currentPrice ?? auction.startPrice ?? product?.price ?? 0),
          auctionEndAt: auction.endAt,
          auctionTimerLabel: formatRemaining(auction.endAt),
        };
      });
  }, [auctionsData, now]);

  return (
    <PageContainer>
      <Slogan />
      <HorizontalProductList
        title="Licytacje"
        products={auctionsProducts}
        loading={isLoadingAuctions}
      />
      <HorizontalProductList
        title="Nowości"
        products={newProducts}
        loading={isLoadingNew}
      />
      <HorizontalProductList
        title="Popularne"
        products={popularProducts}
        loading={isLoadingPopular}
      />
    </PageContainer>
  );
}
