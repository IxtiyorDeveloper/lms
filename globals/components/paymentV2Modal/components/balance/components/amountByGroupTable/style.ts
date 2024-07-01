import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  margin-bottom: -20px;

  .ant-table-thead > tr > th {
    border-bottom: 1px solid ${bgColors.purpleCrystal} !important;
  }

  .row {
    .ant-table-cell {
      border-bottom: 1px solid ${bgColors.whiteSmoke}!important;
      padding: 8px 8px !important;
    }
  }
  .row:last-child {
    .ant-table-cell {
      border-bottom: 0 !important;
    }
  }

  font-family: "SF Pro Display", sans-serif;
  font-size: 13px;
  font-feature-settings: "clig" off, "liga" off;
  color: ${textColors.sceptreBlue};

  .group {
    font-weight: 500;
  }

  .period {
    color: ${textColors.soulfulBlue};
  }

  .lesson {
    font-weight: 500;
  }

  .amount {
    color: ${textColors.pop};
    text-align: right;
    font-family: "Space Grotesk", sans-serif;
    font-size: ${fontSizes.f12};
    font-weight: 700;
    letter-spacing: -0.12px;
  }
`;

export const TableHeader = styled.p`
  color: ${textColors.soulfulBlue};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.12px;
  padding-bottom: 12px;
  padding-left: 4px;
`;
