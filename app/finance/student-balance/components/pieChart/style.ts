import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  background-color: ${bgColors.brilliance};
  width: 30%;
  box-shadow: inset 0 0 12px #f4f5f6;
  border-radius: 8px;
  padding: 0 20px;
  margin-top: 10px;

  * {
    color: ${textColors.white};
  }

  .overall-amount {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: ${bgColors.white};
    border-radius: 6px;
    padding: 2px 8px;
    width: fit-content;
    margin-bottom: 4px;

    &:first-of-type {
      margin-top: 16px;
    }

    .title-label {
      font-size: ${fontSizes.f12};
      font-weight: 400;
    }

    .amount-label {
      font-size: ${fontSizes.f12};
      font-weight: 500;
    }

    .dot {
      height: 9px;
      width: 9px;
      border-radius: 50%;
      background-color: ${bgColors.pepper};
    }

    &:first-of-type .dot {
      background-color: ${bgColors.kitten};
    }

    * {
      color: ${textColors.dark} !important;
    }
  }
`;
