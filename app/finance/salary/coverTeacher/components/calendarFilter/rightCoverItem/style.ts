import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { css } from "@emotion/react";

export const Wrapper = styled.div<{ isFirst: boolean; isLast: boolean }>`
  border: 0.5px solid ${bgColors.whiteSmoke};
  background: ${bgColors.brilliance};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex: 1;
  padding: 14px 15px;
  align-items: center;
  justify-content: space-between;

  ${({ isFirst }) =>
    isFirst &&
    css`
      border-radius: 12px 12px 0 0;
    `}
  ${({ isLast }) =>
    isLast &&
    css`
      border-radius: 0 0 12px 12px;
    `}
  ${({ isLast, isFirst }) =>
    isLast &&
    isFirst &&
    css`
      border-radius: 12px;
    `}
  .profile {
    display: flex;
    gap: 10px;
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.12px;
    align-items: center;
    width: 33%;
    .image-custom {
      height: 40px;
      width: 40px;
      position: relative;
      .icon {
        width: 16px;
        height: 16px;
        position: absolute;
        bottom: -4px;
        right: -4px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
        cursor: pointer;

        &.active {
          background: ${bgColors.midori};
        }

        &.inactive {
          background: ${bgColors.pepper};
        }
      }
    }
    .name {
      gap: 10px;
      color: ${textColors.blueGray};
      font-size: ${fontSizes.f12};
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.12px;
      flex: 1;
      text-overflow: ellipsis;
      overflow-x: hidden;
      white-space: nowrap;
    }
  }

  .gr-wr {
    width: 20%;
    .groups {
      border-radius: 40px;
      background: var(--f-4-f-5-f-6, #f4f5f6);
      display: inline-flex;
      padding: 6px 10px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      color: ${textColors.blueGray};
      font-size: ${fontSizes.f12};
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.12px;
      cursor: pointer;
    }
  }

  .amount {
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.12px;
    min-width: 20%;
    &.plus {
      color: ${textColors.midori};
    }
    &.zero {
      color: ${textColors.yourShadow};
    }
  }

  .description {
    width: 20%;
    .sms {
      width: fit-content;
      cursor: pointer;
    }
  }
`;
