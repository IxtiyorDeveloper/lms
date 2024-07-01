import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const UnitPreviewWrapper = styled.div`
  margin-top: 20px;
`;
export const Wrapper = styled.div`
  .title {
    font-weight: 700;
    font-size: ${fontSizes.f14};
    line-height: 17px;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
  }

  .segmented-content-container {
    margin-top: 20px;
  }

  .flex {
    display: flex;
    align-items: center;
    gap: 8px;
    transition: 0.3s;
  }

  .flex.inactive {
    color: ${textColors.yourShadow};
    transition: 0.3s;
  }
`;
export const Content = styled.div`
  margin-top: 20px;
  height: fit-content;
  //min-height: 470px;
  .running {
    margin-top: 20px;
    .c-label {
      color: ${textColors.blueGray};
      text-align: left;
      font-size: ${fontSizes.f14};
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.14px;
      margin-bottom: 20px;
    }
    .box {
      border-radius: 10px;
      border: 1px solid ${bgColors.purpleCrystal};
      background: ${bgColors.whiteSmoke};
      padding: 10px 14px;
      display: flex;
      gap: 12px;
      .circle {
        width: 40px;
        height: 40px;
        color: ${textColors.white};
        text-align: center;
        font-size: ${fontSizes.f18};
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: -0.18px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${bgColors.pepper};
        box-shadow: 0 1px 8px 0 #ef466f inset;
        border-radius: 50%;
      }
      .cont {
        display: flex;
        gap: 4px;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        .units {
          color: ${textColors.blueGray};
          text-align: center;
          font-size: ${fontSizes.f14};
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: -0.14px;
        }
        .info {
          color: ${textColors.yourShadow};
          text-align: center;
          font-size: ${fontSizes.f12};
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          letter-spacing: -0.12px;
        }
      }
    }
  }
  .flex {
    margin-top: 20px;
    display: flex;
    gap: 14px;
    .col {
      width: 50%;
    }
    align-items: flex-end;
  }

  .group {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .count {
    padding: 4px 8px;
    gap: 10px;
    background: ${bgColors.pop};
    border-radius: 24px;
    font-weight: 500;
    font-size: ${fontSizes.f14};
    line-height: 15px;
    text-align: center;
    letter-spacing: -0.01em;
    color: ${textColors.brilliance};
    flex: none;
    order: 0;
    flex-grow: 0;
    margin-left: 8px;
  }
`;
export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: flex-end;
  .cancel {
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
    border-radius: ${borders.b10};
    height: 40px;
    font-weight: 700;
    min-width: 88px;
  }
  .save {
    border-radius: ${borders.b10};
    box-shadow: inset 0 4px 6px ${bgColors.friedEgg};
    font-weight: 700;
    height: 40px;
    min-width: 88px;
  }
`;
