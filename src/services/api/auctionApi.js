import { useQuery } from "@tanstack/react-query";
import axiosInstance from "lib/axiosInstance";
import { absoluteVersionedApiUrl, versionedApiPath } from "lib/apiPaths";

const normalizeList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.auctions)) return data.auctions;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

const fetchAuctions = async ({ status, productId } = {}) => {
  const response = await axiosInstance.get(versionedApiPath("auctions"), {
    params: { status, productId },
  });
  return normalizeList(response.data);
};

const fetchAuctionById = async (auctionId) => {
  const response = await axiosInstance.get(versionedApiPath(`auctions/${auctionId}`));
  return response.data;
};

const fetchAuctionBids = async (auctionId) => {
  const response = await axiosInstance.get(versionedApiPath(`auctions/${auctionId}/bids`));
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

export const useMyAuctionParticipations = (enabled = true) =>
  useQuery({
    enabled,
    queryKey: ["my-auction-participations"],
    queryFn: async () => {
      const response = await axiosInstance.get(versionedApiPath("auctions/my/participations"));
      if (Array.isArray(response.data)) return response.data;
      if (Array.isArray(response.data?.items)) return response.data.items;
      return [];
    },
    staleTime: 60 * 1000,
  });

export const placeAuctionBid = async ({ auctionId, amount }) => {
  const response = await axiosInstance.post(versionedApiPath(`auctions/${auctionId}/bids`), {
    amount,
  });
  return response.data;
};

export const getAuctionStreamUrl = (auctionId) => {
  return absoluteVersionedApiUrl(`auctions/${auctionId}/stream`);
};
