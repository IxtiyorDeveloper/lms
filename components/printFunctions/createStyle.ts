export function createStyle(doc: Document, cssText: string) {
  const style = doc.createElement("style");
  style.appendChild(doc.createTextNode(cssText));
  return style;
}
