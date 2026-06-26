import type { NextApiRequest, NextApiResponse } from "next";
import { buildBackendUrl, readBackendJson, versionedBackendPath } from "server/backend";
import { setAuthTokenCookie } from "server/authCookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed." });
  }

  const response = await fetch(buildBackendUrl(versionedBackendPath("auth/register")), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(req.body || {}),
  });
  const payload = await readBackendJson(response);

  if (response.ok && payload?.token) {
    setAuthTokenCookie(res, payload.token, payload.expiresIn);
  }

  return res.status(response.status).json(payload);
}
