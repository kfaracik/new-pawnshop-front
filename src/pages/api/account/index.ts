import type { NextApiRequest, NextApiResponse } from "next";
import { proxyBackendRequest, versionedBackendPath } from "server/backend";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET" && req.method !== "PUT") {
    res.setHeader("Allow", ["GET", "PUT"]);
    return res.status(405).json({ message: "Method not allowed." });
  }

  return proxyBackendRequest(req, res, versionedBackendPath("account"));
}
