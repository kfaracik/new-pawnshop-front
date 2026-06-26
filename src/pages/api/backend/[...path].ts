import type { NextApiRequest, NextApiResponse } from "next";
import { proxyBackendRequest } from "server/backend";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const path = Array.isArray(req.query.path) ? req.query.path.join("/") : String(req.query.path || "");
    return await proxyBackendRequest(req, res, path);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Backend proxy failed.",
    });
  }
}
