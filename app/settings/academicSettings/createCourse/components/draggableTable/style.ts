import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";
export const StyledTable = styled.div`
  thead th:nth-of-type(1) {
    padding-left: 25px;
  }
  width: 100%;
  overflow: scroll;

  table {
    min-width: 700px;
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
  td {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
    padding: 8px 0;
  }
  td:first-of-type {
    padding: 0;
  }
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
export const DraggingRow = styled.td`
  background: rgba(127, 207, 250, 0.3);
`;

export const TableData = styled.td``;
export const FirstTd = styled.td`
  display: flex;
  align-items: center;
`;
