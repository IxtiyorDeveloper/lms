import styled from "@emotion/styled";
import { bgColors, fontSizes, borders } from "styles/theme";
import { css } from "@emotion/react";

export const Wrapper = styled.div`
  margin-top: 32px;
`;
export const Label = styled.div`
  font-size: ${fontSizes.f12};
  line-height: 15px;
  position: relative;
  margin-bottom: 10px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: #353945;
  font-family: "Inter", sans-serif;
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
    background: ${bgColors.paleSky};
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
