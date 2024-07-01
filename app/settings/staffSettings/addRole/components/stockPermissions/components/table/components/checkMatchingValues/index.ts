import { TParams } from "types";

export const checkMatchingValues = ({ values }: { values: TParams }) => {
  const output: any = {};
  const regex = /^p_(\d+)_(admin_can_.+)$/;

  for (const key in values) {
    const match = key.match(regex);
    if (match) {
      const [_, number, permission] = match;
      output[key] = values[key];
    }
  }
  return Object.values(output).every((value) => value === true);
};
