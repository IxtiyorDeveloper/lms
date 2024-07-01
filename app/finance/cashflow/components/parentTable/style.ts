import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  .ant-table-tbody > tr {
    margin-bottom: 200px !important;
  }

  .basic-table-container {
    .lemon {
      // background: ${bgColors.lemon}!important;
    }
    thead {
      tr {
        th {
          background: ${bgColors.sceptreBlue}!important;
          padding: 10px 16px !important;
          border-bottom: 4px solid ${bgColors.white} !important;
        }
      }
    }

    tbody {
      tr {
        border-radius: 6px !important;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1) !important;
        margin-bottom: 200px !important;
        padding-bottom: 200px !important;

        td {
          padding: 10px 16px !important;
          border-bottom: 0 !important;
        }
      }
    }
    th:nth-of-type(1) {
      border-radius: 10px 0 0 10px !important;
    }

    tbody td:last-child {
      border-radius: 0 10px 10px 0 !important;
    }

    td:nth-of-type(1) {
      border-radius: 10px 0 0 10px !important;
    }

    thead th:nth-of-type(1) {
      border-radius: 0 0 0 10px !important;
    }

    thead th:last-child {
      border-radius: 0 0 10px 0 !important;
    }

    tfoot td:last-of-type {
      border-radius: 0 0 10px 0 !important;
    }

    tfoot td:first-of-type {
      border-radius: 0 0 0 10px !important;
    }
  }
`;
