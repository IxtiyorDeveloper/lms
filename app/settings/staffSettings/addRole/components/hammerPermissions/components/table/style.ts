import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  .switch-header {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${bgColors.black}!important;
    font-size: 12px !important;
    font-weight: 500 !important;
    line-height: 1.66 !important;
    letter-spacing: -0.12px !important;

    .name {
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  table {
    border-radius: 8px;
    background: ${bgColors.brilliance};

    .ant-table-cell {
      border-bottom: 1px solid ${bgColors.whiteSmoke} !important;
      border-left: 1px solid ${bgColors.whiteSmoke} !important;
    }

    .ant-table-cell:last-child {
      border-bottom: 1px solid ${bgColors.whiteSmoke} !important;
      border-left: 1px solid ${bgColors.whiteSmoke} !important;
      border-right: 1px solid ${bgColors.whiteSmoke} !important;
    }

    th.ant-table-cell {
      border-bottom: 1px solid ${bgColors.whiteSmoke} !important;
      border-left: 0 !important;
      border-right: 0 !important;
    }

    th.ant-table-cell:last-child {
      border-bottom: 1px solid ${bgColors.whiteSmoke} !important;
      border-left: 0 !important;
      border-right: 0 !important;
    }

    th {
      border-bottom: 0;
      border-right: 0;
      border-left: 0 !important;
    }
  }

  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cell {
    padding: 10px 14px;
    .item {
      display: inline-flex;
      padding: 10px;
      align-items: center;
      gap: 8px;
      border-radius: 6px;
      background: ${bgColors.whiteSmoke};
    }
  }
`;
