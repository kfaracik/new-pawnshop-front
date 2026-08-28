import type { NextApiRequest, NextApiResponse } from "next";
import { proxyBackendRequest, ForbiddenBackendPathError } from "server/backend";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const path = Array.isArray(req.query.path) ? req.query.path.join("/") : String(req.query.path || "");
    return await proxyBackendRequest(req, res, path);
  } catch (error) {
    if (error instanceof ForbiddenBackendPathError) {
      return res.status(403).json({ message: "Forbidden." });
    }
    console.error("[backend-proxy] request failed", error);
    return res.status(500).json({ message: "Backend proxy failed." });
  }
}
