import axiosInstance from "lib/axiosInstance";
import { versionedApiPath } from "lib/apiPaths";

// Submits a valuation request, availability alert or newsletter sign-up.
// The API answers with { ok: true } and never echoes the stored record back.
export const submitInquiry = async (payload) => {
  const response = await axiosInstance.post(versionedApiPath("inquiries"), payload);
  return response.data;
};
