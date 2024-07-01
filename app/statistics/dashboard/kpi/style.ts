import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  margin: 20px 40px;
  background-color: ${bgColors.white};
  border: 1px solid ${bgColors.purpleCrystal};
  border-radius: 14px;

  .table .basic-table-container {
    tr {
      background: ${bgColors.brilliance} !important;
    }

    .ant-table-expanded-row-level-1 {
      tr {
        background: ${bgColors.white} !important;
      }
      th {
        border-color: ${bgColors.hat} !important;
      }
    }

    table {
      th {
        border-bottom-width: 2px !important;
        border-color: ${bgColors.white} !important;
        background: ${bgColors.purpleCrystal} !important;
        &:first-of-type {
          border-radius: 10px !important;
        }
      }

      td {
        border-bottom-width: 2px !important;
        border-color: ${bgColors.white} !important;
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

  .ten {
    width: 25%;
  }

  .ten:first-of-type {
    width: 5%;
  }

  .head {
    padding: 20px;

    .flex-cash {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .flex {
      display: flex;
      align-items: flex-end;
      gap: 20px;
      width: 320px !important;
    }

    .title-cash {
      font-size: ${fontSizes.f14};
      font-weight: 700;
      color: ${textColors.sceptreBlue};
    }
  }

  .tabs {
    gap: 12px;
    padding: 20px;
    border: 1px solid ${bgColors.whiteSmoke};
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    div {
      width: 100% !important;
    }
    button {
      color: ${textColors.brilliance} !important;
      border-radius: 8px;
    }
  }

  .scenario {
    width: 200px;
    padding: 20px;
  }

  .table {
    padding: 0 20px 20px 20px;

    th {
      color: red !important;
    }
  }

  .header_staff {
    display: flex;
    gap: 16px;
    padding: 10px 0;
  }

  .ml {
    margin-left: 0;
  }

  .arrow {
    transition: 0.3s;
  }

  .expanded {
    transform: rotate(90deg);
  }

  .pd-vertical-10 {
    padding: 10px 0;
  }
`;
