import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  background-image: url("/statistics/bg2.png");
  background-repeat: no-repeat;
  background-position: top right;
  background-size: 150px;

  .body-sms-card {
    padding: 0 20px;
    margin: 0 !important;
  }

  .groteskFont {
    font-family: "Space Grotesk", sans-serif !important;
  }

  .number {
    margin-left: 20px;
    margin-top: 40px;
    font-family: "Space Grotesk", sans-serif !important;
    font-size: ${fontSizes.f24};
    font-weight: 500;
    color: ${textColors.white};

    .month {
      font-style: normal;
      font-weight: 500;
      font-size: ${fontSizes.f10};
      line-height: 12px;
      letter-spacing: -0.01em;
      color: ${textColors.white};
      opacity: 0.8;
    }
  }

  .btns {
    display: flex;
    gap: 5px;

    & button {
      border-radius: 3px;
      padding: 5px !important;
      font-size: 11px !important;
      min-height: auto !important;
    }

    .this-month {
      height: 24px;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 4px 6px;
      gap: 10px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 2px;
      flex: none;
      order: 2;
      flex-grow: 0;
      font-family: "Manrope", sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 10px;
      line-height: 14px;
      letter-spacing: -0.01em;
      color: ${textColors.white} !important;
    }

    .active {
      background-color: ${bgColors.white} !important;
      color: ${textColors.lucky}!important;
    }
  }
`;
