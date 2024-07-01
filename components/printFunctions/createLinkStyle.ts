export function createLinkStyle(doc: Document, url: string) {
  const style = doc.createElement("link");
  style.type = "text/css";
  style.rel = "stylesheet";
  style.href = url;
  return style;
}
