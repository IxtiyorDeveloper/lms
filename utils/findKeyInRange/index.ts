import { TParams } from "types";

export function findKeyInRange({
  data,
  point,
}: {
  data?: TParams;
  point: number;
}) {
  for (const key in data) {
    if (point >= data[key].from && point <= data[key].to) {
      return key;
    }
  }
  return null; // Return null if no key is found within the range
}
