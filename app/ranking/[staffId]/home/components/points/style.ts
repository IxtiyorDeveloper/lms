import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { css } from "@emotion/react";

export const Wrapper = styled.div<{ teacherId?: any; bool?: boolean }>`
  padding: ${(props) => (props?.bool ? "0 20px" : 0)};
  .container {
    display: flex;
    //justify-content: space-between;
    margin-top: 25px;
    gap: 20px;
    ${(props) =>
      !!props.teacherId
        ? css`
            padding-right: 20px;
          `
        : ``};

    .card {
      width: 100%;
      padding: 20px;
      border-radius: 12px;
      border: 0.5px solid ${bgColors.purpleCrystal};
      background: ${bgColors.brilliance};
      box-shadow: 0 0 12px 0 ${bgColors.white} inset,
        0 2px 4px 0 rgba(0, 0, 0, 0.12);
      height: ${(props) => (props?.bool ? "unset" : "282px")};
      overflow-x: auto;

      .title {
        font-size: ${fontSizes.f14};
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        color: ${textColors.sceptreBlue};
        font-weight: 600;
        line-height: 1.28;
        letter-spacing: -0.14px;
        .number {
          font-family: Space Grotesk sans-serif;
          font-size: ${fontSizes.f18};
          font-weight: 500;
          letter-spacing: 0.36px;
        }
      }

      .divider {
        width: 100%;
        height: 1px;
        background: ${bgColors.purpleCrystal};
        margin-top: 15px;
      }

      .progress {
        margin-top: 20px;

        .ant-progress-outer {
          display: flex;
          padding-inline-end: 0;

          .ant-progress-inner {
            position: relative;
            width: 100%;
          }
        }

        .ant-progress-text {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          display: flex;
          width: 100%;
          justify-content: center;
          align-items: center;
          color: ${textColors.white};
          font-size: ${fontSizes.f14};
          font-weight: 600;
        }
      }

      .cards {
        display: grid;
        gap: 4px;
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: repeat(2, 1fr);
        margin-top: 12px;

        .item {
          border: 1px solid ${bgColors.purpleCrystal};
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border-radius: 6px;
          background: ${bgColors.whiteSmoke};
          color: ${textColors.sceptreBlue};
          font-family: Space Grotesk sans-serif;
          font-size: ${fontSizes.f10};
          font-weight: 700;
          letter-spacing: 0.2px;
          .title {
            color: ${textColors.dark};
            font-weight: 400;
            letter-spacing: 0.2px;
            font-size: ${fontSizes.f10};

            .red {
              border-radius: 50%;
              width: 6px;
              height: 6px;
              background: linear-gradient(180deg, #e9286a 0%, #ec98ac 100%);
              stroke-width: 0.5px;
              stroke: ${bgColors.pop};
              filter: drop-shadow(0 1px 4px rgba(233, 40, 87, 0.28));
            }

            .orange {
              border-radius: 50%;
              width: 6px;
              height: 6px;
              background: linear-gradient(180deg, #f90 0%, #ffdc99 114.89%);
              stroke-width: 0.5px;
              stroke: ${bgColors.ginger};
              filter: drop-shadow(0 1px 4px ${bgColors.friedEgg});
            }

            .green {
              border-radius: 50%;
              width: 6px;
              height: 6px;
              background: linear-gradient(
                135deg,
                ${bgColors.midori} 24.59%,
                ${bgColors.pearl} 87.5%
              );
              stroke-width: 0.5px;
              stroke: ${bgColors.eucalyptus};
              filter: drop-shadow(0 1px 4px ${bgColors.spring});
            }
          }
        }
      }

      .chart {
        //margin-top: 12px;
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        height: 80%;

        .percent {
          color: ${textColors.sceptreBlue};
          font-family: Space Grotesk sans-serif;
          font-size: 24px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          letter-spacing: 0.48px;
        }
      }
      .flex {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        margin-top: 12px;
        padding: 0;

        .item {
          border-radius: 6px;
          background: ${bgColors.whiteSmoke};
          display: flex;
          padding: 8px 18px;
          color: ${textColors.sceptreBlue};
          font-size: ${fontSizes.f12};
          align-items: center;
          white-space: nowrap;
          justify-content: space-between;
          text-align: center;
          font-weight: 500;
          letter-spacing: 0.24px;

          div {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            padding: 8px 12px !important;
            color: ${textColors.white};
            font-size: ${fontSizes.f12};
            font-weight: 500;
            line-height: 0.92;
            border-radius: 30px;
            background: ${bgColors.midori};
            letter-spacing: -0.13px;
          }

          .red {
            background: #ff5247;
          }
        }

        .item.center {
          //justify-content: center;
        }
      }

      .groups {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 4px;
        margin-top: 12px;

        .item {
          //border-radius: 100px;
          //border: 1px solid #e3e5eb;
          border-radius: 6px;
          background: ${bgColors.whiteSmoke};
          display: flex;
          padding: 8px 18px;
          color: ${textColors.sceptreBlue};
          font-size: ${fontSizes.f12};
          align-items: center;
          white-space: nowrap;
          justify-content: space-between;
          text-align: center;
          font-weight: 500;
          letter-spacing: 0.24px;

          div {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            padding: 8px 12px !important;
            color: ${textColors.white};
            font-size: ${fontSizes.f12};
            font-weight: 500;
            line-height: 0.92;
            border-radius: 30px;
            background: ${bgColors.midori};
            letter-spacing: -0.13px;
          }

          .red {
            background: #ff5247;
          }
        }

        .item.center {
          //justify-content: center;
        }
      }
    }

    .card:last-child {
      border-right: 0;
    }

    .line {
      display: flex;
      margin: 20px 0 34px 0;
      width: 1px;
      background: ${bgColors.whiteSmoke};
    }
  }
`;
