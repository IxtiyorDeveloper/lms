import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const ChartWrapper = styled.div`
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #f4f5f690;
  box-shadow: inset 0 0 45px rgba(0, 0, 0, 0.025);

  .node {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .select {
    width: 50%;
  }

  .flex {
    display: flex;
    align-items: center;
  }

  .gap {
    gap: 3px;
  }

  .body {
    display: flex;
    align-items: center;

    .chart {
      margin: 0;
    }

    .body-table {
      height: 255px;
      overflow-y: auto;

      ::-webkit-scrollbar {
        width: 3px;
      }

      /* Track */

      ::-webkit-scrollbar-track {
        box-shadow: none;
        border-radius: 10px;
      }

      /* Handle */

      ::-webkit-scrollbar-thumb {
        background: ${bgColors.primary};
        border-radius: 10px;
      }

      /* Handle on hover */

      ::-webkit-scrollbar-thumb:hover {
        background: ${bgColors.brilliance};
      }
    }

    .table-side {
      margin-left: auto;
      width: 240px;
      background: ${bgColors.white};
      border: 1px solid ${bgColors.purpleCrystal};
      box-shadow: inset 0 0 45px rgba(0, 0, 0, 0.02);
      border-radius: 6px;
      padding: 5px;

      .name-width {
        max-width: 60px;
        text-overflow: ellipsis;
        overflow-x: hidden;
        white-space: nowrap;
      }

      .head-side {
        list-style: none;
        display: flex;
        background: ${bgColors.sceptreBlue};
        color: ${textColors.white};
        border-radius: 2px;
        padding: 5px;

        & * {
          font-size: ${fontSizes.f12};
          text-overflow: ellipsis;
          overflow-x: hidden;
          white-space: nowrap;
        }

        .li-1 {
          width: 60%;
          padding-left: 20px;
        }

        .li-2 {
          width: 40%;
        }

        .li-3 {
          width: 5%;
        }
      }

      .body-side {
        list-style: none;
        display: flex;
        min-height: 36px;
        border-radius: 2px;
        padding: 5px;
        border-bottom: 1px solid ${bgColors.whiteSmoke};

        & * {
          font-size: ${fontSizes.f12};
          text-overflow: ellipsis;
          overflow-x: hidden;
          white-space: nowrap;
        }

        & > li {
          display: flex;
          align-items: center;
        }

        & > li:last-of-type {
          justify-content: center;
        }

        .text {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        li:first-of-type {
          display: flex;
          align-items: center;
          width: 70%;
          padding-right: 10px;
          overflow-x: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          gap: 8px;
          margin-right: 5px;

          .dot {
            height: 8px !important;
            width: 8px !important;
            border-radius: 50%;
          }
        }

        li:nth-of-type(2) {
          width: 30%;
        }

        li:last-child {
          text-align: right;
          width: 20%;
          color: ${textColors.yourShadow};
        }
      }
    }
  }

  .recharts-default-legend {
    padding-bottom: 20px !important;
  }
`;
