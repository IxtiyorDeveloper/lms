import _ from "lodash";

export class RandomElementOfObject {
  usedKeys = new Set();

  getRandomValue(obj: any) {
    const keys = _.shuffle(_.keys(obj));

    for (const key of keys) {
      if (!this.usedKeys.has(key)) {
        this.usedKeys.add(key);
        return obj[key as keyof typeof obj];
      }
    }

    return "";
  }

  getChartColorValue(obj: any, index: number) {
    const objKeysList = Object.keys(obj);
    return obj[objKeysList[index]]
  }
}

export function randomRgba() {
  const o = Math.round,
    r = Math.random,
    s = 241;
  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    r().toFixed(1) +
    ")"
  );
}
