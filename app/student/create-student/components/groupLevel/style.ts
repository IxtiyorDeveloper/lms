import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";
import { css } from "@emotion/react";

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
