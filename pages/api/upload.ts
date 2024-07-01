import axios from "axios";
import formidable from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import env from "utils/env";
import sharp from "sharp";
import { strToJson } from "utils/functions/strToJson";
import { MAIN_TOKEN_NAME } from "constants/tokenNames"; // import Sharp module

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

    const promise = new Promise<{ data: any; headers: any }>((resolve) => {
      const formData = new FormData();
      ["file"].map((key) => {
        data.fields[key] && formData.append(key, data.fields[key]);
      });

      data.files["file"] &&
        formData.append(
          "file",
          fs.createReadStream(data.files["file"].filepath),
          data.files["file"].originalFilename
        );

      // Use Sharp to resize the image
      if (data.files["file"]) {
        const image = sharp(data.files["file"].filepath);
        image.resize({ width: 800, height: 800 });
        image.toBuffer((err, buffer) => {
          if (err) {
            return res.status(400).json(err);
          }
          formData.append("file", buffer, {
            filename: data.files["file"].originalFilename,
          });
          formData.pipe(
            concat({ encoding: "buffer" }, (data: any) =>
              resolve({ data, headers: formData.getHeaders() })
            )
          );
        });
      } else {
        formData.pipe(
          concat({ encoding: "buffer" }, (data: any) =>
            resolve({ data, headers: formData.getHeaders() })
          )
        );
      }
    });

    promise
      .then(({ data, headers }) => {
        return axios.post(
          //@ts-ignore
          env.fileUpload,
          data,
          {
            headers: {
              Authorization: env.fileUploadToken,
              "Company-Token": env.token,
              "user-authorization": obj?.[MAIN_TOKEN_NAME] || "",
              ...headers,
            },
          }
        );
      })
      .catch((error) => {
        res.status(400).json(error);
      })
      .then((response: any) => {
        res.status(response.status || 200).json(response.data);
      });
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};
