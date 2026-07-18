import type { NextApiRequest, NextApiResponse } from "next";
import { buildBackendUrl, readBackendJson, versionedBackendPath } from "server/backend";
import { getAuthTokenFromCookie, setAuthTokenCookie } from "server/authCookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", "PUT");
    return res.status(405).json({ message: "Method not allowed." });
  }

  const token = getAuthTokenFromCookie(req.headers.cookie);
  if (!token) {
    return res.status(401).json({ message: "Nie jesteś zalogowany." });
  }

  const response = await fetch(buildBackendUrl(versionedBackendPath("account/email")), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(req.body || {}),
  });
  const payload = await readBackendJson(response);

  if (response.ok && payload?.token) {
    setAuthTokenCookie(res, payload.token, payload.expiresIn);
    const { token: _token, ...rest } = payload;
    return res.status(response.status).json(rest);
  }

  return res.status(response.status).json(payload);
}
