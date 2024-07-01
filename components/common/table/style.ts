import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { bgColors } from "styles/theme";

function colorizeRows(numberedRowColors: { id: number; color: string }[]) {
  let styles = "";

  for (let i = 0; i < numberedRowColors?.length; i += 1) {
    styles += `
   tr:nth-of-type(${numberedRowColors[i]?.id}) {
        background-color:${numberedRowColors[i].color}
      }
     `;
  }

  return css`
    ${styles}
  `;
}

function createCSS(divideRowNumbers: number[]) {
  let styles = "";

  for (let i = 0; i < divideRowNumbers?.length; i += 1) {
    styles += `
   tr:nth-of-type(${divideRowNumbers[i]}) {
        border-bottom: 15px solid ${bgColors.whiteSmoke};
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
        border-bottom: 1px solid ${bgColors.whiteSmoke}!important;
        td{
        border:none;
        }
      }
     `;
    }
  }

  return css`
    ${styles}
  `;
}

export const StyledTable = styled.div<{
  divideTableNumber?: number;
  divideRowNumber?: number;
  divideRowNumbers?: number[];
  numberedRowColors?: { id: number; color: string }[];
  bordered: boolean;
}>`
  width: 100%;
  overflow: scroll;

  table {
    min-width: 700px;

    td {
      padding: 0 10px;
    }
    td:first-of-type {
      padding-left: 0;
    }

    table.expense-table {
      table-layout: fixed;
    }

    table.expense-table td {
      overflow: hidden;
    }
  }

  ::-webkit-scrollbar {
    display: none;
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: #ebebeb;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    cursor: pointer !important;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: #6f767e;
    cursor: pointer !important;
  }

  ${({ divideTableNumber }) =>
    divideTableNumber &&
    css`
      td:nth-of-type(${divideTableNumber}) {
        border-left: 10px solid ${bgColors.whiteSmoke};
      }
    `}
  ${({ divideRowNumber }) =>
    divideRowNumber &&
    css`
      tr:nth-of-type(${divideRowNumber}) {
        border-bottom: 40px solid ${bgColors.whiteSmoke};
      }
    `}
  ${({ divideRowNumbers }) =>
    divideRowNumbers &&
    css`
      tbody {
        ${createCSS(divideRowNumbers)};
        ${createThinBorder(divideRowNumbers)};
      }
    `}
  ${({ numberedRowColors }) =>
    numberedRowColors &&
    css`
      tbody {
        ${colorizeRows(numberedRowColors)};
      }
    `}
  ${({ bordered }) =>
    bordered &&
    css`
      th:nth-of-type(1) {
        border-radius: 10px 0 0 10px !important;
      }

      tbody td:last-child {
        border-radius: 0 10px 10px 0 !important;
      }

      td:nth-of-type(1) {
        border-radius: 10px 0 0 10px !important;
      }

      thead th:nth-of-type(1) {
        border-radius: 0 0 0 10px !important;
      }

      thead th:last-child {
        border-radius: 0 0 10px 0 !important;
      }

      tfoot td:last-of-type {
        border-radius: 0 0 10px 0 !important;
      }

      tfoot td:first-of-type {
        border-radius: 0 0 0 10px !important;
      }
    `}
  .empty {
    margin: 0 auto;
    width: 100%;
  }
`;
export const SkeletonWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 0;

  span {
    height: 50px;
    transform: scale(1, 0.9);
  }
`;

export const StyledFooter = styled.tfoot<{ color: string }>`
  background: ${(props) => props.color};
`;
