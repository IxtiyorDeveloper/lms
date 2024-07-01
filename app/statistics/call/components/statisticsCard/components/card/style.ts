import styled from "@emotion/styled";
import { ICard } from "./index";
import { bgColors, fontSizes, textColors } from "styles/theme";

const colors = {
  primary: "linear-gradient(96.85deg, #FFCF00 42.19%, #FFE866 98%)",
  orange: "linear-gradient(96.92deg, #FA791D 3.03%, #FBA454 99.6%)",
  deep: "linear-gradient(97.22deg, #4663DB 1.84%, #87A5FF 98.61%)",
};

const bgImage = {
  primary: "url(/bgImagesForStatistics/8-1.png)",
  primary1: "url(/bgImagesForStatistics/8-2.png)",
  orange: "url(/bgImagesForStatistics/9-1.png)",
  orange1: "url(/bgImagesForStatistics/9-2.png)",
  deep: "url(/bgImagesForStatistics/10-1.png)",
  deep1: "url(/bgImagesForStatistics/10-2.png)",
};

export const CardWrapper = styled.div<ICard>`
  position: relative;
  padding: 20px;
  margin-top: 20px;
  width: 100%;
  min-height: 160px;
  border-radius: 12px;
  background: url("/bgImagesForStatistics/extra.png") no-repeat right bottom,
    ${({ color }) => bgImage[color as keyof typeof bgImage]} no-repeat right
      bottom,
    ${({ color }) => bgImage[(color! + 1) as keyof typeof bgImage]} no-repeat
      right top,
    ${({ color }) => colors[color as keyof typeof colors]};
  color: ${textColors.white};

  .title {
    font-size: ${fontSizes.f16};
    font-weight: 600;
    line-height: 1.3;
  }

  .img {
    position: absolute;
    bottom: 10px;
    right: 20px;
  }

  .count {
    margin-top: 45px;
    font-size: 36px;
    color: ${bgColors.white};
    font-weight: 700;
    position: relative;

    sup {
      position: absolute;
      top: 10px;
      color: ${textColors.blackFire};
      font-size: ${fontSizes.f16};
    }
  }
`;
