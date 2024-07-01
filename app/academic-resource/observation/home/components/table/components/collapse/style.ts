import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 20px;
  background: ${bgColors.white};

  .custom-row {
    background: ${bgColors.whiteSmoke};
    overflow: hidden;
    border-radius: 10px;
  }

  .basic-table-container {
    table {
      td {
        border-bottom: 4px solid ${bgColors.white} !important;
        &:first-child {
          border-radius: 10px 0 0 10px;
          overflow: hidden;
        }
        &:last-child {
          border-radius: 0 10px 10px 0;
          overflow: hidden;
        }
      }
      th {
        border-bottom: 4px solid ${bgColors.white} !important;
      }
    }
  }
`;
