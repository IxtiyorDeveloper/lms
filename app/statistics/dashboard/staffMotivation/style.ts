import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  margin: 20px 40px;
  background-color: ${bgColors.white};
  border: 1px solid ${bgColors.purpleCrystal};
  border-radius: 14px;
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
    display: flex;
    gap: 4px;
    padding: 20px;
    button {
      color: ${textColors.brilliance}!important;
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
    //margin-left: 16px;
  }

  .arrow {
    transition: 0.3s;
  }
  .expanded {
    transform: rotate(90deg);
  }
`;
