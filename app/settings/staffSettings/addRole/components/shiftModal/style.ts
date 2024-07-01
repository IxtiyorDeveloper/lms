import styled from "@emotion/styled";
import {bgColors, borders, textColors} from "styles/theme";
import {css} from "@emotion/react";

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 50px;

  .cancel {
    width: 100%;
    height: 44px;
    color: ${textColors.yourShadow};
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
    border-radius: 8px;
    font-weight: 700;
  }

  .save {
    width: 100%;
    box-shadow: inset 0 4px 6px #ffe866;
    border-radius: 8px;
    font-weight: 700;
  }
`;
export const Grid = styled.div`
  width: 100%;
`;

export const Content = styled.div`
  border: 2px solid ${bgColors.whiteSmoke};
  border-radius: ${borders.b10};
  padding: 24px;
`;

export const StyledTable = styled.div<{ divideTableNumber?: number }>`
  th {
    border-bottom: 1px solid ${bgColors.whiteSmoke};
    border-radius: 10px;
  }

  td {
    border: none;
  }

  width: 100%;
  overflow: scroll;

  table {
    max-width: 700px;
  }

  ::-webkit-scrollbar {
    display: none;
    width: 10px !important;
  }

  ::-webkit-scrollbar-track {
    background-color: #ebebeb;
    -webkit-border-radius: 10px !important;
    border-radius: 10px;
    cursor: pointer !important;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px !important;
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
`;