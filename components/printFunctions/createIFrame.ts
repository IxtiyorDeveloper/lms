export function createIFrame(window: Window, parent: HTMLElement) {
  const el = window.document.createElement("iframe");
  el.setAttribute("src", "about:blank");
  el.setAttribute(
    "style",
    "visibility:hidden;width:0;height:0;position:absolute;z-index:-9999;bottom:0;"
  );
  el.setAttribute("width", "0");
  el.setAttribute("height", "0");
  el.setAttribute("wmode", "opaque");
  parent.appendChild(el);
  return el;
}
