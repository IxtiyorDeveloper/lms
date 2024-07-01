import React from "react";
import { removeIFrame, createIFrame, IEl } from "./printFunctions";

const state = {
  isLoading: false,
};

export const iframeTest = (_el: IEl) => {
  const $iframe = createIFrame(window, window.document.body);
  const { contentDocument, contentWindow } = $iframe;
  if (!contentDocument || !contentWindow) return;

  const doc = contentWindow.document;

  doc.open();
  doc.write(
    "<!doctype html>" +
      "<html lang='en'>" +
      "<head>" +
      '<meta charset="utf-8">' +
      "<title></title>" +
      "</head>" +
      "<body>" +
      _el.current?.["outerHTML"] +
      "</body>" +
      "</html>"
  );

  state.isLoading = false;
  if (!state.isLoading) contentWindow!.print();

  removeIFrame($iframe);
};
