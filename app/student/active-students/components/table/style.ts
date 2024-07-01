import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { colorizeRows } from "utils/colorizeRows";

export const Wrapper = styled.div<{
  numberedRowColors: { id: number; color: string }[];
}>`
  ${({ numberedRowColors }) =>
    numberedRowColors &&
    css`
      tbody {
        ${colorizeRows(numberedRowColors)};
      }
    `}
`;
