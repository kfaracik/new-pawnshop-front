import type { NextApiRequest, NextApiResponse } from "next";
import { buildBackendUrl, readBackendJson, versionedBackendPath } from "server/backend";
import { clearAuthTokenCookie, getAuthTokenFromCookie } from "server/authCookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed." });
  }

  const token = getAuthTokenFromCookie(req.headers.cookie);
  let payload: unknown = { message: "Wylogowano pomyślnie." };
  let status = 200;

  if (token) {
    const response = await fetch(buildBackendUrl(versionedBackendPath("auth/logout")), {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    status = response.ok ? 200 : response.status;
    payload = await readBackendJson(response);
  }

  clearAuthTokenCookie(res);
  return res.status(status).json(payload);
}
