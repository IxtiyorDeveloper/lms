import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { Swiper, SwiperSlide } from "swiper/react";
import { EStockAmountStatus } from "types";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: space-between;
  border-radius: 12px;
  align-items: flex-start;
  align-self: stretch;
  margin-top: 24px;

  .item {
    width: 100%;
    .category {
      display: flex;
      gap: 10px;
      align-items: center;

      .title {
        color: ${textColors.sceptreBlue};
        text-align: center;
        font-size: ${fontSizes.f14};
        font-weight: 700;
        letter-spacing: -0.14px;
      }

      .circle {
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid ${bgColors.purpleCrystal};
        background: ${bgColors.brilliance};
        cursor: pointer;
      }
    }

    .swiper-container {
      width: 100%;
    }
  }
`;

export const SwiperWrapper = styled(Swiper)`
  width: 100%;
  padding: 10px 0 10px 0;

  & .swiper-scrollbar {
    height: 14px !important;
    background-color: ${bgColors.whiteSmoke};
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
  }

  & .swiper-scrollbar-drag {
    width: 300px !important;
    margin: 0 !important;
    border: 1px solid ${bgColors.whiteSmoke};
    border-radius: 4px;
    background-color: ${bgColors.yourShadow};
    background-image: url("/scroll.png");
    background-size: 12px 5px;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

export const Card = styled(SwiperSlide)<{
  isPc?: boolean;
  isEmpty?: boolean;
}>`
  display: flex;
  min-width: 172px;
  width: 172px;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  border-radius: 10px;
  background: ${bgColors.white};
  //box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
  overflow: hidden;

  .hidden {
    overflow: hidden;
    width: 100%;
  }

  &.amount_status_${EStockAmountStatus.NORMAL} {
    box-shadow: none;
  }

  &.amount_status_${EStockAmountStatus.LITTLE_LEFT} {
    box-shadow: 0px 0px 6px 1px rgba(233, 40, 87, 0.88);
  }

  &.amount_status_${EStockAmountStatus.MORE_THAN_NORMAL} {
    box-shadow: 0px 0px 6px 1px rgba(96, 132, 255, 0.88);
  }

  ${(props) =>
    props.isEmpty &&
    css`
      min-height: 215px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      border: 1px dashed ${bgColors.primary};
      background: rgba(255, 207, 0, 0.08);
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
      color: ${textColors.kenyan};
      font-size: ${fontSizes.f12};
      font-weight: 500;
      letter-spacing: -0.12px;

      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
      }
    `}
  .img {
    position: relative;
    width: 100%;

    img {
      flex-shrink: 0;
      border-radius: 10px;
    }

    .ant-badge-container {
      position: absolute;
      right: -6px;
      top: -6px;
      display: flex;
      gap: 5px;

      .red-alert {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 0px 5px;

        height: 16px;
        background: #e92857;
        border-radius: 10px;
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
        text-transform: uppercase;
        color: #ffffff;
      }

      .more-alert {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 0px 5px;

        height: 16px;
        background: ${textColors.deep};
        border-radius: 10px;
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
        text-transform: uppercase;
        color: #ffffff;
      }
    }

    .type {
      display: flex;
      height: 16px;
      padding: 0 4px;
      justify-content: center;
      align-items: center;
      gap: 4px;
      font-family: SF Pro Display sans-serif;
      font-size: ${fontSizes.f9};
      font-weight: 500;
      text-transform: uppercase;
      position: absolute;
      bottom: 4px;
      left: 4px;
      border-radius: 10px;
      background: ${bgColors.lemon};
      color: ${textColors.kenyan};

      ${(props) =>
        props.isPc
          ? css`
              background: ${bgColors.sinter};
              color: ${textColors.royal};
            `
          : ""}
    }

    .student {
      background: ${bgColors.lemon};
      color: ${textColors.kenyan};
    }
  }

  .name {
    color: ${textColors.dark};
    font-family: SF Pro Display sans-serif;
    font-size: ${fontSizes.f14};
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .counts {
    display: flex;
    flex-direction: column;
    gap: 1px;
    width: 100%;

    .item {
      display: flex;

      //padding: 6px 8px;
      justify-content: space-between;
      align-items: center;
      align-self: stretch;
      background: ${bgColors.whiteSmoke};

      .amount {
        color: ${textColors.dark};
        text-align: center;
        font-family: Space Grotesk sans-serif;
        font-size: 12px;
        padding: 7px 8px;
        font-weight: 500;
        line-height: 1.16; /* 116.667% */
        letter-spacing: 0.24px;
      }

      .title {
        padding: 7px 8px;
        display: flex;
        align-items: center;
        gap: 6px;
        color: ${textColors.sceptreBlue};
        text-align: center;
        font-size: ${fontSizes.f10};
        font-weight: 500;
        letter-spacing: 0.2px;

        .circle {
          background: linear-gradient(
            135deg,
            ${bgColors.midori} 24.59%,
            ${bgColors.pearl} 87.5%
          );
          width: 6px;
          height: 6px;
          stroke-width: 0.5px;
          stroke: ${bgColors.eucalyptus};
          border-radius: 50%;
        }

        .second-circle {
          background: linear-gradient(146deg, #ec913d 27.33%, #fac16c 90%);
          stroke: ${bgColors.ginger};
        }

        .third-circle {
          stroke: ${bgColors.pop};
          background: linear-gradient(148deg, #c00f3a 28.86%, #ef7492 90.28%);
        }

        .primary {
          stroke: ${bgColors.pop};
          background: ${bgColors.primary};
        }
      }
    }

    .item:last-child {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    .item:first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
  }

  .actions {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .circle {
      display: flex;
      width: 24px;
      height: 24px;
      padding: 4.8px;
      justify-content: center;
      align-items: center;
      gap: 6.4px;
      border-radius: 19.2px;
      border: 0.632px solid ${bgColors.purpleCrystal};
      background: ${bgColors.white};
    }
  }
`;
