interface IUrls {
  url?: string;
  key?: string;
}

export function urlToJson(url: string): IUrls[] {
  const segments = url.split("/");
  const a = [];
  for (let i = 1; i < segments.length; i++) {
    const segment = segments[i];
    const isDynamic = segment.startsWith("[") && segment.endsWith("]");

    if (isDynamic) {
      a.push({ key: segment.slice(1, -1) });
    } else {
      a.push({ url: segment });
    }
  }
  return a;
}
