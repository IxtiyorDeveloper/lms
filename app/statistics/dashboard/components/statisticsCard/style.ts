import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const ChartWrapper = styled.div`
  padding: 20px;
  border-radius: 12px;
  height: 100%;
  background-color: ${bgColors.brilliance};
  border: 1px solid #f4f5f6;
  box-shadow: inset 0 0 45px rgba(0, 0, 0, 0.025);

  .tabLabel {
    text-align: center !important;
    display: flex;
    justify-content: center;
  }

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
    gap: 8px;
  }

  .gap {
    gap: 3px;
    max-width: 120px;
    width: 100%;
  }

  .body {
    display: flex;
    align-items: center;

    .chart {
      margin: 0;
    }

    .body-table {
      //max-height: 290px;
      //height: 290px;
      height: 255px;
      overflow-y: auto;

      ::-webkit-scrollbar {
        width: 3px;
      }

      /* Track */

      ::-webkit-scrollbar-track {
        box-shadow: none;
        border-radius: 20px;
      }

      ::-webkit-scrollbar {
        width: 8px;
      }

      &:hover {
        ::-webkit-scrollbar-thumb {
          width: 20px;
          border-radius: 20px;
          background: #c1c1c1;
        }
      }
    }
    .body-table {
      height: 255px;
      overflow-y: auto;
    }

    .table-side {
      margin-left: auto;
      width: 55%;
      height: 300px;
      margin-top: 16px;
      background: ${bgColors.white};
      border: 1px solid ${bgColors.purpleCrystal};
      box-shadow: inset 0 0 45px rgba(0, 0, 0, 0.02);
      border-radius: 6px;
      padding: 5px;

      .head-side {
        list-style: none;
        display: flex;
        background: ${bgColors.sceptreBlue};
        color: ${textColors.white};
        border-radius: 2px;
        padding: 5px;

        & * {
          font-size: ${fontSizes.f12};
        }

        .li-1 {
          width: 50%;
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
        border-radius: 2px;
        padding: 5px;
        min-height: 36px;
        border-bottom: 1px solid ${bgColors.whiteSmoke};

        & * {
          font-size: ${fontSizes.f12};
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
          width: 50%;
          padding-right: 10px;
          overflow-x: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          gap: 8px;
          margin-right: 5px;

          .dot {
            height: 8px;
            width: 8px;
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
