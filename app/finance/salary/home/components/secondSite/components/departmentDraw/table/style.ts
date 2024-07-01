import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";
import { ESalaryRange, StaffStatus } from "types/finance/salary";

export const TableWrapper = styled.div`
  width: 100%;
  background: ${bgColors.brilliance};
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin-bottom: 10px;
  overflow: hidden;

  .custom-popover {
  }

  .range-${ESalaryRange.UNCLEAR} {
    color: ${textColors.yourShadow};
    background: ${bgColors.purpleCrystal};
  }

  .ml {
    margin-left: 10px;
    white-space: nowrap;
  }

  .range-${ESalaryRange.LOW} {
    background: ${textColors.pop};
    color: ${textColors.white};
  }

  .collapse_red {
    color: ${textColors.pop};
  }

  .range-${ESalaryRange.HIGH} {
    color: ${textColors.white};
    background: ${bgColors.deep};
  }

  .range-${ESalaryRange.NORMAL} {
    color: ${textColors.white};
    background: ${bgColors.secondary};
  }

  .collapse_green {
    color: ${textColors.secondary};
  }

  .ant-table-tbody > tr.ant-table-row-level-0:hover > td {
    background: unset !important;
  }

  .ant-table-cell-row-hover {
    background: unset !important;
  }

  .row-${StaffStatus.STATUS_FIRED} {
    background: ${bgColors.pale};
  }

  .row-${StaffStatus.STATUS_NEW} {
    background: ${bgColors.lemon};
  }

  .row-${StaffStatus.WORKING} {
  }

  .row-${StaffStatus.STATUS_STOPPING} {
  }

  .ant-table-footer {
    padding: 0 !important;
  }

  table {
    position: relative !important;

    thead {
      position: sticky !important;
      top: 0 !important;
    }

    th {
      padding: 0 !important;

      &:before {
        display: none !important;
      }
    }

    td {
      padding: 0 !important;

      &:before {
        display: none !important;
      }
    }
  }
`;

export const Content = styled.div`
  padding: 10px;
`;

export const Badge = styled.div`
  position: absolute;
  width: 22px;
  height: 22px;
  right: 0;
  top: -10px;
  font-weight: 900;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  color: ${textColors.dark};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TableFooter = styled.div`
  padding: 10px;
  color: ${textColors.white};
  background: ${bgColors.midori};
  font-weight: 600;
  font-size: ${fontSizes.f12};
  height: 100%;
`;

export const TableFooterWrapper = styled.div`
  padding: 10px;
  color: ${textColors.white};
  background: ${bgColors.midori};
  font-weight: 600;
  font-size: ${fontSizes.f12};
  height: 100%;
  display: flex;

  .title {
    width: calc(20% - 33px);
  }

  .total {
    width: 12%;
  }
`;
export const ComplexTotal = styled.div`
  display: flex;
  width: calc(12% + 33px);
  gap: 10px;
`;
