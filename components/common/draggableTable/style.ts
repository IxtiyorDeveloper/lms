import styled from "@emotion/styled";
import { bgColors, borders } from "styles/theme";
import { css } from "@emotion/react";
import { Collapse } from "antd";

export const StyledTable = styled.div<{
  divideTableNumber?: number;
  divideRowNumber?: number;
}>`
  .ant-collapse-header {
    padding: 0 !important;
  }

  th:nth-of-type(1) {
    border-radius: 10px 0 0 10px !important;
  }

  td:last-child {
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

  width: 100%;
  overflow: scroll;

  table {
    min-width: 700px;

    table.expense-table {
      table-layout: fixed;
    }

    table.expense-table td {
      overflow: hidden;
    }
    tr {
      .cell {
        display: flex;
        gap: 3px;
        svg {
          opacity: 0;
        }
      }
      &:hover .active svg {
        opacity: 1;
      }
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
        border-left: 1px solid ${bgColors.whiteSmoke};
      }
    `}
  ${({ divideRowNumber }) =>
    divideRowNumber &&
    css`
      tr:nth-of-type(${divideRowNumber}) {
        border-bottom: 40px solid ${bgColors.whiteSmoke};
      }
    `}
`;
export const StyledTableRow = styled.tr`
  padding: 8px 10px;
  cursor: pointer;
  border-bottom: 4px solid ${bgColors.white};

  .grip {
    opacity: 0;
    width: 20px;
    padding: 8px 0;
  }

  td:last-child {
    border-radius: 0 ${borders.b6} ${borders.b6} 0;
  }

  .cell1 {
    border-radius: ${borders.b6} 0 0 ${borders.b6};
    flex: 1;
    line-height: 17px;
    padding: 8px 0 8px 5px;
    background-color: ${bgColors.brilliance};
  }

  td {
    background-color: ${bgColors.brilliance};
  }

  &:hover td {
    background-color: ${bgColors.whiteSmoke};
  }

  td:first-of-type {
    background-color: ${bgColors.white};
  }

  &:hover .grip {
    display: flex;
    opacity: 1;
  }

  &:hover td:first-of-type {
    background-color: ${bgColors.white};
  }

  &:hover .grip {
    display: flex;
    opacity: 1;
  }

  &:hover .cell1 {
    background-color: ${bgColors.whiteSmoke};
  }
`;
export const CollapseC = styled(Collapse)`
  & .ant-collapse-content-box {
    padding: 0 0 0 6px !important;
  }
`;
