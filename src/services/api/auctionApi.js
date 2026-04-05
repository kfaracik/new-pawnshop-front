import { useQuery } from "@tanstack/react-query";
import axiosInstance from "lib/axiosInstance";

const normalizeList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.auctions)) return data.auctions;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

const fetchAuctions = async ({ status, productId } = {}) => {
  const response = await axiosInstance.get("/v1/auctions", {
    params: { status, productId },
  });
  return normalizeList(response.data);
};

const fetchAuctionById = async (auctionId) => {
  const response = await axiosInstance.get(`/v1/auctions/${auctionId}`);
  return response.data;
};

const fetchAuctionBids = async (auctionId) => {
  const response = await axiosInstance.get(`/v1/auctions/${auctionId}/bids`);
  if (Array.isArray(response.data)) return response.data;
  if (Array.isArray(response.data?.items)) return response.data.items;
  if (Array.isArray(response.data?.bids)) return response.data.bids;
  return [];
};

export const useAuctions = ({ status, productId, enabled = true } = {}) =>
  useQuery({
    enabled,
    queryKey: ["auctions", status || "all", productId || "all"],
    queryFn: () => fetchAuctions({ status, productId }),
    refetchInterval: 5000,
    staleTime: 2000,
  });

export const useAuction = (auctionId, enabled = true) =>
  useQuery({
    enabled: enabled && !!auctionId,
    queryKey: ["auction", auctionId],
    queryFn: () => fetchAuctionById(auctionId),
    refetchInterval: 5000,
    staleTime: 2000,
  });

export const useAuctionBids = (auctionId, enabled = true) =>
  useQuery({
    enabled: enabled && !!auctionId,
    queryKey: ["auction-bids", auctionId],
    queryFn: () => fetchAuctionBids(auctionId),
    refetchInterval: 5000,
    staleTime: 2000,
  });

export const placeAuctionBid = async ({ auctionId, amount }) => {
  const response = await axiosInstance.post(`/v1/auctions/${auctionId}/bids`, {
    amount,
  });
  return response.data;
};

export const getAuctionStreamUrl = (auctionId) => {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const normalized = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${normalized}/v1/auctions/${auctionId}/stream`;
};
