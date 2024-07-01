import { css } from "@emotion/react";

export function colorizeRows(
  numberedRowColors: { id: number; color: string }[]
) {
  let styles = "";

  for (let i = 0; i < numberedRowColors?.length; i += 1) {
    styles += `
   tr:nth-of-type(${numberedRowColors[i]?.id}) {
        background-color:${numberedRowColors[i].color}!important;
      }
     `;
  }
  return css`
    ${styles}
  `;
}
