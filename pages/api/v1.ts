import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import env from "utils/env";
import { MAIN_TOKEN_NAME } from "constants/tokenNames";
import { strToJson } from "utils/functions/strToJson";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  delete req.headers.host;
  delete req.headers.origin;
  delete req.headers.referer;
  try {
    const obj = await strToJson(req.headers.cookie as string);
    const data = await axios.post(`${env.api}`, req.body, {
      headers: {
        ...req.headers,
        Authorization: env.auth,
        "Company-Token": env.token,
        "user-authorization": obj?.[MAIN_TOKEN_NAME] || "",
      },
    });
    res.status(data.status).json(data.data);
  } catch (e: any) {
    if (
      e.message === 'Invalid character in header content ["user-authorization"]'
    ) {
      return res
        .status(401)
        .json({ ok: false, status_code: 401, message: "Token error" });
    }
    res.status(e.response?.status || 500).json(e.response?.data);
  }
}
