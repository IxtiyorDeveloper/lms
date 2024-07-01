import { TLevel } from "types";

export function reverseLevel(obj: TLevel) {
  const levelArray: string[] = [];
  const reverseFunc = (obj1: TLevel) => {
    levelArray.push(obj1?.name);
    if (obj1?.parent) {
      reverseFunc(obj1.parent);
    }
  };
  reverseFunc(obj);

  return levelArray;
}