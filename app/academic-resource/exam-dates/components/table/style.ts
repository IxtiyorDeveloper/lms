import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const CellWrapper = styled.div`
  padding: 10px 0;
  color: ${textColors.blueGray};
  font-size: ${fontSizes.f12};
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 166.667% */
  letter-spacing: -0.12px;
  .index {
    padding-left: 5px;
  }
`;

export const Wrapper = styled.div`
  margin: 0 40px;
  background-color: ${bgColors.white};
  border-radius: 10px;
  overflow: hidden;
  padding: 20px;
  min-height: 75vh;
  .basic-table-container {
    thead {
      th {
        background: ${bgColors.whiteSmoke}!important;
        border-bottom: 4px solid ${bgColors.white} !important;
      }
    }
    tr {
      background: ${bgColors.brilliance};
      td {
        background: ${bgColors.brilliance};
        border-bottom: 4px solid ${bgColors.white} !important;
      }
    }
  }
`;
