import styled from "@emotion/styled";
import { bgColors, borders, textColors } from "styles/theme";
import { css } from "@emotion/react";

function createCSS(divideRowNumbers: number[]) {
  let styles = "";

  for (let i = 0; i < divideRowNumbers?.length; i += 1) {
    styles += `
      tr:nth-of-type(${divideRowNumbers[i]}) {
       td{
        border-bottom: 15px solid ${bgColors.whiteSmoke}!important;
       }
      }
     `;
  }

  return css`
    ${styles}
  `;
}

function createThinBorder(divideRowNumbers: number[]) {
  let styles = "";
  const result = [];

  for (let i = 0; i < divideRowNumbers?.length - 1; i += 2) {
    result.push([divideRowNumbers[i], divideRowNumbers[i + 1]]);
  }
  for (let i = 0; i < result?.length; i += 1) {
    for (let j = result[i][0] + 1; j < result[i][1]; j++) {
      styles += `
      tr:nth-of-type(${j}) {
        td{
        border:none!important;
        border-bottom: 1px solid ${bgColors.whiteSmoke}!important;
        }
      }
     `;
    }
  }

  return css`
    ${styles}
  `;
}

export const Wrapper = styled.div<{ divideRowNumbers?: number[] }>`
  background: ${bgColors.white};

  .table-wrapper {
    td {
      padding: 10px !important;
    }
  }

  .basic-table-container {
    ${({ divideRowNumbers }) =>
      divideRowNumbers &&
      css`
        tbody {
          ${createCSS(divideRowNumbers)};
          ${createThinBorder(divideRowNumbers)};
        }
      `}
  }
`;

export const PaddingWrapper = styled.div`
  padding: 23px 20px;
  border-bottom: 1px solid ${bgColors.purpleCrystal};
  display: flex;
  width: 100%;
  gap: 10px;
  align-items: center;
  justify-content: space-between;

  .reset {
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
    border-radius: ${borders.b10};
    height: 40px;
    font-weight: 700;
    min-width: 88px;
    background-color: ${bgColors.wildSand};
    color: ${textColors.yourShadow};
  }
`;
