import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div<{ isStrict: boolean }>`
  padding: 20px;
  gap: 24px;
  background: ${bgColors.brilliance};
  border: 0.5px solid ${bgColors.purpleCrystal};
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.12),
    inset 0 0 12px ${bgColors.white};
  border-radius: 16px;
  width: 100%;

  ${(p) =>
    p.isStrict
      ? css`
          outline: 1px solid ${bgColors.pop};
          box-shadow:
            0 0 2px 1px rgba(230, 16, 67, 0.25),
            0 2px 4px rgba(230, 16, 67, 0.12),
            inset 0 0 12px ${bgColors.white};
        `
      : css`
          outline: 0 !important;
          box-shadow: none !important;
        `}
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    margin-top: 10px;

    .item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      background: ${bgColors.brilliance};
      border: 1px solid ${bgColors.purpleCrystal};
      border-radius: 8px;
      justify-content: center;
      padding: 10px 12px;
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
          background: ${bgColors.lemon} !important;
          border: 1px solid ${bgColors.primary} !important;
          box-shadow: 0 0 1px ${bgColors.primary} !important;
        `
      : ""}
`;

export const Content = styled.div`
  display: flex;
`;

export const SubContent = styled.div`
  width: 50%;
  &:first-of-type {
    padding-right: 16px;
    border-right: 1px solid ${bgColors.purpleCrystal};
  }
  &:nth-of-type(2) {
    padding-left: 16px;
  }
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.01em;
  color: ${textColors.onyx};
`;

export const Right = styled.div`
  .ant-checkbox-wrapper {
    flex-direction: row-reverse;
    span {
      font-style: normal;
      font-weight: 400;
      font-size: ${fontSizes.f12};
      line-height: 1.2;
      letter-spacing: -0.01em;
      color: ${textColors.sceptreBlue};
    }
  }
`;
