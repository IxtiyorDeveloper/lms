import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Box = styled.div`
  border-radius: 12px;
  background: ${bgColors.white};
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
`;
export const Top = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
export const TableWrapper = styled.div`
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
