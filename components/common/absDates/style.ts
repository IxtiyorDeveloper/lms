import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  overflow-y: auto;
  padding: 7px 2px;

  .container {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 15px;
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
      background: ${bgColors.paleSky};
      cursor: pointer !important;
    }
    .item {
      display: flex;
      flex-direction: column;
      cursor: pointer;
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
        line-height: 1;
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
        line-height: 1;
        letter-spacing: -0.1px;
        margin-top: 3px;
        width: 100%;
        min-width: max-content;
        height: 23px;
      }
      .icon {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
      }
      .yellow {
        outline: 2px solid ${bgColors.primary};
      }
    }
  }
`;
