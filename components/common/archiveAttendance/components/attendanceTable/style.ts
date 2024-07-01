import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  margin-top: 21px;
  .loading {
    display: none;
  }

  .basic-table-container {
    th {
      padding: 0 !important;
      height: 1px !important;
      border: none !important;
      &:before {
        display: none !important;
      }
    }
    td {
      padding: 0 !important;
      height: 1px !important;
      border-inline-end-color: ${bgColors.purpleCrystal}!important;
      border-bottom: 1px solid #f0f0f0 !important;
    }
  }

  .current-user {
    background-color: ${bgColors.lemon};
  }
`;
