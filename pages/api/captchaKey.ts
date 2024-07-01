import { NextApiRequest, NextApiResponse } from "next";
import env from "utils/env";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ key: env.site_key_recaptcha });
}
