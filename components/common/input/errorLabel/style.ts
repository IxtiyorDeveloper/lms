import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div<{ hasThreeDots: boolean }>`
  p {
    color: ${textColors.red};
    margin-top: 6px;
    font-weight: 500;
    padding: 0 4px 0 0 !important;
    font-size: ${fontSizes.f12};
    width: 100%;
    ${({ hasThreeDots }) =>
      hasThreeDots &&
      css`
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      `}
  }
`;
