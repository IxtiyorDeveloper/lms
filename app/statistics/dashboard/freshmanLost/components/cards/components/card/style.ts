import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { IColor, IBgImages } from "./type";
import Link from "next/link";

const bgColor = {
  midori: "linear-gradient(96.92deg, #44b26b 3.03%, #70d088 99.6%)",
  pop: "linear-gradient(98.55deg, #E92857 1.13%, #F87C84 99.13%)",
  dark: "linear-gradient(98.35deg, #141416 1.07%, #353945 98.85%)",
};

const shadowColor = {
  midori: "inset 0 0 4px #BAF7BC",
  pop: "inset 0 0 4px #FCADA9",
  dark: "inset 0 0 4px #353945",
};

const bgImages: IBgImages = {
  midori: {
    first: "/bgImagesForStatistics/5-1.png",
    second: "/bgImagesForStatistics/5-2.png",
  },
  pop: {
    first: "/bgImagesForStatistics/6-1.png",
    second: "/bgImagesForStatistics/6-2.png",
  },
  dark: {
    first: "/bgImagesForStatistics/7-1.png",
    second: "/bgImagesForStatistics/7-2.png",
  },
};

export const CardWrapper = styled(Link)<{ color: IColor }>`
  position: relative;
  display: flex;
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  background:
    url("/bgImagesForStatistics/extra.png") no-repeat right 50%,
    url(${({ color }) => bgImages[color].first}) no-repeat right bottom,
    url(${({ color }) => bgImages[color].second}) no-repeat right 30%,
    ${({ color }) => bgColor[color]};
  box-shadow: ${({ color }) => shadowColor[color]};

  .main-part {
    height: 100%;

    .main-num {
      display: flex;
      gap: 4px;
      margin-bottom: 12px;
    }

    .footer {
      .text {
        font-size: ${fontSizes.f12};
        color: ${bgColors.transparentGreen};
        font-weight: 500;
        margin-bottom: 4px;
      }

      .footer-number {
        font-size: ${fontSizes.f20};
        color: ${bgColors.white};
        font-weight: 500;
      }
    }

    .main-number {
      font-weight: 700;
      font-size: ${fontSizes.f24};
      color: ${textColors.transparentGreen};
    }
  }

  .card-title {
    font-size: ${fontSizes.f16};
    font-weight: 600;
  }

  & * {
    color: ${textColors.white};
  }

  .icon-part {
    position: absolute;
    bottom: 30px;
    right: 25px;
  }
`;
