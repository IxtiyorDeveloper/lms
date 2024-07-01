import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { css } from "@emotion/react";
import { Tooltip } from "antd";

export const Wrapper = styled.div<{ chartBg?: string }>`
  min-height: 274px;

  .tooltip-1 {
    width: 200px !important;
  }

  .title {
    font-weight: 600;
    font-size: 8px;
    line-height: 10px;
    letter-spacing: -0.01em;
    color: ${textColors.sceptreBlue};
    text-overflow: ellipsis;
    max-width: 60px;
    white-space: nowrap;
    overflow: hidden;
  }
  .swiper {
    .swiper-button-prev,
    .swiper-button-next {
      width: 45px;
      border-radius: 50%;
      background-color: white;
      box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
    }

    .swiper-button-prev::after,
    .swiper-button-next::after {
      font-size: 20px;
    }

    .flex {
      display: flex;
      justify-content: space-around;
      margin-right: 32px;
      align-items: flex-end;
      margin-top: auto;
      height: 100%;

      .element {
        width: 40px !important;
        margin-top: auto;
        height: 100%;

        .swiper_element {
          flex-shrink: 0;
          border-radius: 6px;
          /* background: linear-gradient(
            180deg,
            #e56070 0%,
            rgba(252, 217, 211, 0.3) 100%
          ); */

          background: linear-gradient(180deg, #42bd6e 0%, #7ae7a1 100%);
          /* shadow text */
          box-shadow:
            0px 1px 3px rgba(0, 0, 0, 0.1),
            0px 0px 1px rgba(0, 0, 0, 0.35);
          border-radius: 4px;

          ${({ chartBg }) =>
            chartBg &&
            css`
              background: ${chartBg};
            `}
        }
      }
    }
  }

  .name {
    font-weight: 600;
    font-size: ${fontSizes.f14};
    white-space: nowrap;
  }
`;

export const Phone = styled.div`
  font-weight: 600;
  font-size: ${fontSizes.f14};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
`;

export const TooltipTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4px 2px;
  gap: 8px;

  .w-100 {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .name {
    font-weight: 700;
    font-size: ${fontSizes.f14};
    line-height: 1.21;
    color: ${textColors.white};
  }

  .category {
    font-family: "SF Pro Display";
    font-size: ${fontSizes.f12};
    line-height: 1.16;
    color: ${textColors.brotherBlue};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 120px;
  }

  .ant-badge-count {
    box-shadow: unset !important;
  }

  .card {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12px;
    gap: 8px;
    background: ${bgColors.blueGray};
    border-radius: 8px;

    width: 253px;
  }

  .options {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 16px;
    letter-spacing: -0.01em;
    color: ${textColors.purpleCrystal};
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .cards {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 4px;

    .container {
      width: 100%;
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
      .item {
        padding: 4px 8px;
        gap: 4px;
        background: #353945;
        border-radius: 40px;
        display: flex;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: -0.01em;
        color: #b1b5c4;
      }

      .white {
        color: ${textColors.white};
        font-weight: 500;
      }
    }
  }
`;

export const CustomTooltip = styled(Tooltip)``;
