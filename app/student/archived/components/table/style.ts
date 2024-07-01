import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";
import { css } from "@emotion/react";
import { colorizeRows } from "utils/colorizeRows";

export const Cell = styled.div`
  font-weight: 600;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${textColors.blueGray};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
  cursor: pointer;
`;
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
