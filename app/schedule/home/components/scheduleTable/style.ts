import styled from "@emotion/styled";
import { bgColors } from "styles/theme";
export const Wrapper = styled.div`
  .basic-table-container {
    table {
      overflow: hidden !important;
      width: 100% !important;
      min-width: unset !important;
      table-layout: fixed !important;
      border-radius: 0 !important;

      @media (max-width: 1224px) {
        table-layout: auto !important;
      }

      .ant-table-row-expand-icon {
        display: none !important;
      }

      td {
        padding: 0 !important;
        border-bottom: 1px solid ${bgColors.purpleCrystal} !important;
        border-left: 1px solid ${bgColors.purpleCrystal} !important;
      }

      th {
        padding: 0 !important;
        border-bottom: 1px solid ${bgColors.purpleCrystal} !important;
      }
    }
  }

  @media (max-width: 1224px) {
    .basic-table-container {
      table {
        table-layout: auto;
        border-radius: 0 !important;
      }
    }
  }
`;
