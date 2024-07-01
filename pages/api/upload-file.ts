import axios from "axios";
import formidable from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import env from "utils/env";
import { strToJson } from "utils/functions/strToJson";
import { MAIN_TOKEN_NAME } from "constants/tokenNames";
import { getFileKey, getFileUploadUrl } from "utils/getFileUploadUrl";

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
};

// @ts-ignore
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const FormData = require("form-data");
    const concat = require("concat-stream");
    const fs = require("fs");
    const obj = await strToJson(req.headers.cookie as string);

    const data: { fields: any; files: any } = await new Promise(
      (resolve, reject) => {
        const form = new formidable.IncomingForm({
          keepExtensions: true,
        });

        form.parse(req, (err: any, fields: any, files: any) => {
          if (err) reject({ err });
          resolve({ fields, files });
        });
      }
    );
    const fileKey = getFileKey({ url: data?.fields?.url });
    const promise = new Promise<{ data: any; headers: any; url: string }>(
      (resolve) => {
        const formData = new FormData();
        ["file"].map((key) => {
          data.fields[key] && formData.append(key, data.fields[key]);
        });

        data.files["file"] &&
          formData.append(
            fileKey,
            fs.createReadStream(data.files["file"].filepath),
            data.files["file"].originalFilename
          );

        formData.pipe(
          concat({ encoding: "buffer" }, (data1: any) =>
            resolve({
              data: data1,
              url: data.fields.url,
              headers: formData.getHeaders(),
            })
          )
        );
      }
    );
    const { data: body, headers, url } = await promise;
    const response = await axios.post(
      //@ts-ignore
      getFileUploadUrl({ url }),
      body,
      {
        headers: {
          Authorization: env.auth,
          "Company-Token": env.token,
          "user-authorization": obj?.[MAIN_TOKEN_NAME] || "",
          ...headers,
        },
      }
    );
    res.status(response ? response.status : 500).json(response?.data || {});
  } catch (error: any) {
    res
      .status(error?.response?.status || 500)
      .json(error?.response?.data || error.message);
  }
};
