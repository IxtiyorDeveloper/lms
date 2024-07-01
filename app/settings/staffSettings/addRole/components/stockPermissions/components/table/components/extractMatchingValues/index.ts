import { TParams } from "types";

export function extractMatchingValues({
  inputObject,
}: {
  inputObject: TParams;
}) {
  const regex = /^p_(\d+)_(admin_can_.+)$/;
  const output: any = {};

  for (const key in inputObject) {
    const match = key.match(regex);
    if (match) {
      output[key] = inputObject[key];
    }
  }

  return output;
}
