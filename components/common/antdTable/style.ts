import styled from "@emotion/styled";
import { bgColors } from "styles/theme";
import { css } from "@emotion/react";
import { colorizeRows } from "utils/colorizeRows";

export const Wrapper = styled.div<{
  numberedRowColors: { id: number; color: string }[] | undefined;
  isExpandIconVisible?: boolean;
}>`
  .loading {
    display: none;
  }

  .ant-table-tbody > tr.ant-table-row-level-0:hover > td {
    background: unset !important;
  }

  .ant-table-cell-row-hover {
    background: unset !important;
  }

  table {
    th {
      padding: 0 5px !important;
      height: 1px !important;
      border-bottom: 4px solid ${bgColors.hat} !important;
      background: ${bgColors.white} !important;

      &:before {
        display: none !important;
      }
    }

    .ant-table-measure-row td {
      border: none !important;
    }

    td {
      padding: 0 5px !important;
      height: 1px !important;
      border-inline-end-color: ${bgColors.purpleCrystal} !important;
      border-bottom: 4px solid ${bgColors.hat} !important;

      &:first-of-type {
        padding: 0 !important;
      }
    }
    ${({ numberedRowColors }) =>
      numberedRowColors &&
      css`
        tbody {
          ${colorizeRows(numberedRowColors)};
        }
      `}
  }

  .current-user {
    background-color: ${bgColors.lemon};
  }

  .ant-table-wrapper .ant-table-row-expand-icon-cell {
    display: ${(props) =>
      !props.isExpandIconVisible ? "none" : "unset"} !important;
  }

  .ant-table-expand-icon-col {
    display: ${(props) =>
      !props.isExpandIconVisible ? "none" : "unset"} !important;
  }
`;
