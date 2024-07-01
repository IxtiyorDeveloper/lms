import { TParams } from "../types";
import { hasDecimalPlaces } from "./hasDecimalPlaces";

export function convertNumericStringsToNumbers(data: any): any {
  if (Array.isArray(data)) {
    return data.map(convertNumericStringsToNumbers);
  } else if (typeof data === "object" && data !== null) {
    const newData: TParams = {};
    for (const key in data) {
      newData[key as keyof typeof newData] = convertNumericStringsToNumbers(
        data[key]
      );
    }
    return newData;
  } else if (
    typeof data === "string" &&
    !isNaN(parseFloat(data)) &&
    !/\s/g.test(data)
  ) {
    if (hasDecimalPlaces(parseFloat(data))) {
      return Number(Number(data).toFixed(2));
    } else return parseFloat(data);
  } else {
    if (typeof data === "number") {
      if (hasDecimalPlaces(data)) {
        return Number(Number(data).toFixed(2));
      } else return data;
    } else return data;
  }
}

export function convertNumericStringsToNumbersWithTarget({
  data,
  targetList,
  objKey,
}: {
  data: any;
  targetList?: string[];
  objKey?: string;
}): any {
  if (Array.isArray(data)) {
    return data.map((item) =>
      convertNumericStringsToNumbersWithTarget({ data: item, targetList })
    );
  } else if (typeof data === "object" && data !== null) {
    let newData: TParams = {};
    for (const key in data) {
      newData[key as keyof typeof newData] =
        convertNumericStringsToNumbersWithTarget({
          data: data[key],
          targetList,
          objKey: key,
        });
    }
    return newData;
  } else if (typeof data === "string" && !isNaN(parseFloat(data))) {
    if (targetList && targetList.includes(objKey || "")) {
      return parseFloat(data);
    } else return data;
  } else {
    return data;
  }
}

export function changeValuesToNumber({
  obj,
  array,
}: {
  obj: any;
  array: string[];
}) {
  let newObj = {};
  if (!!obj) {
    for (const [key, value] of Object.entries(obj)) {
      newObj = {
        ...newObj,
        [key]: array.includes(key) ? +(value || 0) : value,
      };
    }
    return newObj;
  } else return obj;
}
