import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div<{ isStrict: boolean }>`
  padding: 20px;
  gap: 24px;
  background: ${bgColors.white};
  border: 0.5px solid ${bgColors.purpleCrystal};
  box-shadow:
    0px 2px 4px rgba(0, 0, 0, 0.12),
    inset 0px 0px 12px ${bgColors.white};
  border-radius: 16px;
  width: 100%;

  ${(p) =>
    p.isStrict
      ? css`
          outline: 1px solid ${bgColors.pop};
          box-shadow:
            0px 0px 2px 1px rgba(230, 16, 67, 0.25),
            0px 2px 4px rgba(230, 16, 67, 0.12),
            inset 0px 0px 12px ${bgColors.white};
        `
      : css`
          outline: 0 !important;
          box-shadow: none !important;
        `}
  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;

    .item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 147px;
      height: 71px;
      background: ${bgColors.brilliance};
      border: 1px solid ${bgColors.whiteSmoke};
      border-radius: 8px;
      justify-content: center;
      padding: 0 12px;
      gap: 8px;
      cursor: pointer;

      .branch-name {
        font-weight: 500;
        font-size: ${fontSizes.f12};
        line-height: 1.25;
        display: flex;
        color: ${textColors.sceptreBlue};
      }
    }
  }

  .disable-color {
    filter: grayscale(1);
  }

  .w-100 {
    width: 100%;
  }

  .divider {
    width: 100%;
    height: 1px;
    background-color: ${bgColors.whiteSmoke};
    margin: 16px 0 24px 0;
  }

  .flex {
    display: flex;
    justify-content: space-between;
    gap: 0 !important;
    align-items: center;
  }

  .gap-4 {
    gap: 4px !important;
  }

  .strict {
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.01em;
      color: ${textColors.onyx};
  }

  .ml-4 {
    margin-left: 4px;
  }

  .gap-14 {
    gap: 14px !important;
  }

  .title {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.01em;
    color: ${textColors.sceptreBlue};
  }

  .ant-switch-handle::before {
    background-color: ${bgColors.pop} !important;
  }

  .ant-switch-checked {
    background-color: ${bgColors.pop} !important;
  }

  .ant-switch-checked {
    .ant-switch-handle::before {
      background-color: ${bgColors.brilliance} !important;
    }
  }
`;

export const Item = styled.div<{ isActive: boolean }>`
  transition: 0.3s;
  ${(p) =>
    p.isActive
      ? css`
          background: #fff9cb !important;
          border: 1px solid #ffcf00 !important;
          box-shadow: 0px 0px 1px #ffcf00 !important;
        `
      : ""}
`;
