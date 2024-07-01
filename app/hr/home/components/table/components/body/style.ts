import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
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
  .ant-table-wrapper .ant-table-tbody >tr {
    border-radius: 6px !important;
  }
  .ant-table-row {
  }
`;

export const CellNameWrapper = styled.div`
  display: flex;
  min-width: 180px;
  color: ${textColors.sceptreBlue}!important;

  .divider {
    background: ${bgColors.midori};
    border-radius: 0 5px 5px 0;
    width: 3px;
    margin-left: -13px;
    margin-right: 13px;
  }

  .index {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    /* identical to box height */

    letter-spacing: -0.01em;

    /* #353945 */
  }

  .image {
    margin-left: 21px;
  }

  .name {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
    margin-left: 7px;
    align-self: center;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const CellValue = styled.div`
  font-weight: 600;
  font-size: ${fontSizes.f12};
  color: ${textColors.sceptreBlue};
`;
