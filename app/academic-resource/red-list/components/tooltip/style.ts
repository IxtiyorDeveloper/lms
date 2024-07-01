import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  overflow-y: auto;

  .container {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding: 0 6px;
    ::-webkit-scrollbar {
      height: 15px !important;
    }

    ::-webkit-scrollbar-track {
      background-color: ${bgColors.mineShaft};
      -webkit-border-radius: 10px !important;
      border-radius: 10px;
      cursor: pointer !important;
    }

    ::-webkit-scrollbar-thumb {
      -webkit-border-radius: 10px !important;
      border-radius: 10px;
      background: #6f767e;
      cursor: pointer !important;
    }
    .merge-unit {
      display: flex;
      gap: 26px;
      background: linear-gradient(90deg, #d3d3d3 0%, #d3d3d3 1%, #e0e0e0 26%);
      border-radius: 2px;
      padding: 6px 20px;
      flex-shrink: 0;
      justify-content: space-between;
      align-items: center;
      color: ${textColors.sceptreBlue};
      font-size: ${fontSizes.f10};
      font-weight: 600;
      line-height: 12px;
      letter-spacing: -0.1px;
      margin-top: 3px;
    }
    .merge-percent {
      display: flex;
      gap: 26px;
      padding: 0 10px;
    }

    .item {
      display: flex;
      flex-direction: column;

      .day {
        border-radius: 2px;
        background: ${bgColors.sceptreBlue};
        padding: 6px 15px;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${textColors.brilliance};
        font-size: ${fontSizes.f10};
        font-weight: 600;
        line-height: 12px;
        letter-spacing: -0.1px;
        white-space: nowrap;
      }

      .unit {
        border-radius: 2px;
        background: linear-gradient(90deg, #d3d3d3 0%, #d3d3d3 1%, #e0e0e0 26%);
        padding: 6px 15px;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${textColors.sceptreBlue};
        font-size: ${fontSizes.f10};
        font-weight: 600;
        line-height: 12px;
        letter-spacing: -0.1px;
        margin-top: 3px;
      }

      .percent {
        width: 38px;
        height: 38px;
        display: flex;
        align-self: center;
        color: #fff;
        font-size: ${fontSizes.f11};
        font-weight: 500;
        line-height: 12px;
        letter-spacing: -0.11px;
        margin-top: 10px;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        background: ${bgColors.pop};
        outline-offset: 2px;
        margin-bottom: 10px;
      }

      .red-outline {
        outline: 3px solid ${bgColors.pop};
      }
      .yellow {
        outline: 3px solid ${bgColors.primary};
      }
      .transparent-outline {
        outline: 3px solid ${bgColors.secondary};
      }
      .none-outline {
        outline: 3px solid transparent;
      }
    }
  }
`;
