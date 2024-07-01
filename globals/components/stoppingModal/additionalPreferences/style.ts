import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  margin-top: 16px;

  .title {
    font-weight: 700;
    font-size: ${fontSizes.f14};
    line-height: 1.21;
    letter-spacing: -0.01em;
    color: ${textColors.blueGray};
    margin-top: 3px;
  }

  .ant-collapse-content > .ant-collapse-content-box {
    padding: 0 16px 16px 16px;
  }

  .input-container {
    display: flex;
    gap: 16px;
    margin-top: 16px;
  }

  .input-item {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 20px;
    min-height: 228px;
    background: ${bgColors.brilliance};
    border: 0.5px solid ${bgColors.purpleCrystal};
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.12),
      inset 0 0 12px ${bgColors.white};
    border-radius: 16px;
    width: 100%;

    .mt {
      margin-top: 24px;
      width: 100%;
    }

    .title {
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: -0.01em;
      color: ${textColors.sceptreBlue};
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .divider {
      width: 100%;
      height: 1px;
      background-color: ${bgColors.whiteSmoke};
      margin-top: 16px;
    }
  }
`;

export const Content = styled.div`
  .warning {
    display: flex;
    flex-direction: row;
    padding: 12px;
    gap: 10px;
    background: ${bgColors.pop};
    border-radius: 8px;
    font-weight: 400;
    font-size: ${fontSizes.f12};
    line-height: 1.66;
    color: ${textColors.white};
    align-items: center;
  }

  .x-button {
    display: flex;
    align-self: center;
    justify-content: center;
    cursor: pointer;
  }

  .teachers {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 24px;

    .teacher {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 8px 6px 8px 8px;
      gap: 8px;
      background: ${bgColors.whiteSmoke};
      border: 1px solid ${bgColors.purpleCrystal};
      border-radius: 6px;
    }
  }
`;
