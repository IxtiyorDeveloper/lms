import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { css } from "@emotion/react";

export const Wrapper = styled.div`
  width: 100% !important;

  .panel-header {
    white-space: nowrap;
    width: 100px;
    display: flex;
    align-items: center;
    color: ${textColors.dark};
    font-size: 12px;
    font-weight: 700;
    letter-spacing: -0.12px;
  }

  .ant-collapse > .ant-collapse-item {
    border-bottom: 0 !important;
  }

  .ant-collapse-content {
    border-radius: 8px;
    background: ${bgColors.brilliance};
    padding: 0;
    margin: 0;
    border: 0 !important;
  }

  .ant-collapse-content-box {
    padding: 0 20px !important;
  }

  .ant-collapse {
    border-radius: 8px;
    background: ${bgColors.brilliance};
    box-shadow: 0 0 12px 0 ${bgColors.whiteSmoke} inset;
    border: 0 !important;
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

export const Card = styled(SwiperSlide)<{ isPc?: boolean }>`
  display: flex;
  min-width: 172px;
  width: 172px;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  border-radius: 10px;
  background: ${bgColors.white};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);

  .items {
    color: ${textColors.soulfulBlue};
    font-size: 12px;
    font-weight: 400;
    letter-spacing: -0.12px;
    display: flex;
    justify-content: space-between;
    margin: 0 10px;
    .count {
      color: ${textColors.sceptreBlue};
      font-weight: 500;
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
  .img {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    img {
      flex-shrink: 0;
      border-radius: 10px;
    }

    .ant-badge {
      position: absolute;
      right: -12px;
      top: -18px;
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
      }
    }
  }
`;
