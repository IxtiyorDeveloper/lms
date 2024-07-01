import styled from "@emotion/styled";

import { bgColors, borders } from "styles/theme";

export const Wrapper = styled.div`
  .sectionTable {
    margin: 20px 40px 0 40px;
    background: ${bgColors.white};

    box-shadow: 0 40px 64px -12px rgba(0, 0, 0, 0.08),
      0 0 14px -4px rgba(0, 0, 0, 0.05), 0 32px 48px -8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
  }

  .filter-wrapper {
    margin: 10px 40px 0 40px;
    background: ${bgColors.white};
    border-radius: ${borders.b6};
    padding: 20px;
  }

  table {
    .ind {
      padding: 0 6px;
      background: ${bgColors.primary};
      border-radius: 3px;
    }

    //td {
    //  padding: 0 5px !important;
    //  &:first-of-type {
    //    padding-left: 0 !important;
    //  }
    //}
  }
`;
export const TabsWrapper = styled.div`
  margin: 20px 40px 10px 40px;
  .ant-segmented {
    background: ${bgColors.white};
  }
`;
export const StatisticsCollapse = styled.div`
  background: ${bgColors.white};
  margin: 20px 40px 10px 40px;
  box-shadow: 0px 0px 24px 0px #0000000d;
  padding: 20px;
  border-radius: 8px;
`;
