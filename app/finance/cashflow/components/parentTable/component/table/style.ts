import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  .index {
    white-space: nowrap;
  }
  .basic-table-container {
    margin-top: 2px !important;
    border-radius: 6px !important;
    background: #fff !important;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1) !important;
    overflow: hidden;

    thead {
      tr {
        border: 1px solid red !important;
        margin-top: 2px !important;
        th {
          //background: red !important;
          border-bottom: 1px solid ${bgColors.whiteSmoke} !important;
          background: #fff !important;
          padding: 10px 16px !important;
          color: ${textColors.soulfulBlue}!important;
          font-size: ${fontSizes.f10}!important;
          font-weight: 500 !important;
          line-height: 2 !important; /* 200% */
          letter-spacing: -0.1px !important;
          //border-bottom: 4px solid ${bgColors.white} !important;
        }
      }
    }
    tbody {
      tr {
        background: ${bgColors.white}!important;
        box-shadow: none !important;
        td {
          padding: 10px 16px !important;
          border-bottom: 1px solid ${bgColors.whiteSmoke} !important;
        }
      }
    }
  }
`;
