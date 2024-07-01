import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import env from "utils/env";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  delete req.headers.host;
  delete req.headers.origin;
  delete req.headers.referer;
  try {
    const data = await axios.request({
      timeout: 10000,
      method: "POST",
      url: `${env.device_host}/${req.body?.url}`,
      data: {
        ...req.body?.data,
        auth: env.device_auth,
      },
      headers: {},
    });
    res.status(data.status).json(data.data);
  } catch (e: any) {
    if (e.message === "Invalid character in header content Auth") {
      return res
        .status(401)
        .json({ ok: false, status_code: 401, message: "Token error" });
    }
    res.status(e.response?.status || 500).json(e.response?.data);
  }
}
