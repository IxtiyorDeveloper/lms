import { ICallTemplatePageData } from "types/callSettings/templates";

export const generateKeyOptions = ({
  callPageData,
}: {
  callPageData: ICallTemplatePageData | undefined;
}) => {
  const isBoolean = (value: any) => {
    return typeof value === "boolean";
  };

  return [
    {
      label: "Templates",
      value: "1",
      options: callPageData?.greetings?.map((item) => ({
        label: !!item.name ? item.name : "-",
        value: item.num?.toString() ?? "-",
      })),
    },
    {
      label: "Groups",
      value: "2",
      options: !isBoolean(callPageData?.groups)
        ? callPageData?.groups?.map((item) => ({
            label: !!item.name ? item.name : "-",
            value: item.num?.toString() ?? "-",
          }))
        : [],
    },
    {
      label: "Operators",
      value: "3",
      options: callPageData?.operators?.map((item) => ({
        label: !!item.name ? item.name : "-",
        value: item.num?.toString() ?? "-",
      })),
    },
  ];
};

export function transformKeys(obj: {
  [x: string]: any;
  hasOwnProperty: (arg0: string) => any;
}) {
  const keyMap = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
    astr: "*",
    zero: "0",
    sharp: "#",
  };

  const transformedObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = keyMap[key as keyof typeof keyMap];
      transformedObj[newKey as keyof typeof transformedObj] = obj[key];
    }
  }
  return transformedObj;
}

export function reverseTransformKeys(obj: {
  [x: string]: any;
  hasOwnProperty: (arg0: string) => any;
}) {
  const keyMap = {
    "1": "one",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
    "6": "six",
    "7": "seven",
    "8": "eight",
    "9": "nine",
    "*": "astr",
    "0": "zero",
    "#": "sharp",
  };

  const reversedObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = keyMap[key as keyof typeof keyMap];
      reversedObj[newKey] = obj[key];
    }
  }
  return reversedObj;
}
