import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

function getAllRoutes(dir = "pages", routes = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const isDirectory = fs.lstatSync(filePath).isDirectory();
    if (isDirectory) {
      getAllRoutes(filePath, routes);
    } else {
      const isPageFile = /\.(js|jsx|ts|tsx)$/.test(filePath);
      const route = `/${filePath
        .replace("pages", "")
        .replace(/(\.[js|jsx|ts|tsx])$/, "")
        .replace(/^\/index$/, "")}`;
      if (isPageFile) {
        // @ts-ignore
        routes.push(route);
      }
    }
  });

  return routes.map(
    (pagePath) =>
      pagePath
        // @ts-ignore
        .replace(/^\/+/, "/") // Remove any leading slashes
        .replace(/\.[jt]sx?$/, "") // Remove uploadFile extension
        .replace(/\.generateName.tsx?$/, "") // Remove uploadFile extension
        .replace(/^\/+pages/, "") // Remove "pages" prefix
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const route: string[] = getAllRoutes();
  const checkUrl =
    (req.body.url as string).charAt(req.body.url.length - 1) === "]"
      ? req.body.url
      : req.body.url + "/index";
  const result: string | null =
    route.find((e) => e == checkUrl || e == `${checkUrl}/index`) || null;
  if (result) {
    return res
      .status(200)
      .json({ url: result, originalUrl: req.body.originalUrl });
  }

  return res.status(404).json({ message: "not found" });
}
