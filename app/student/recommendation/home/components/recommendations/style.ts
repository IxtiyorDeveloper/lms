import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";
import { Swiper } from "swiper/react";
import { textColors } from "styles/theme";
import { Collapse } from "antd";

const { Panel } = Collapse;

export const MainContainer = styled.div`
  .ant-tag {
    border-radius: 6px;
    background: ${bgColors.wildSand};
    padding: 7px 8px;
    color: ${textColors.soulfulBlue};
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.24px;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;

    svg {
      path {
        stroke: ${textColors.yourShadow} !important;
      }

      circle {
        stroke: ${textColors.yourShadow} !important;
      }
    }
  }
  .ant-tag-checkable-checked {
    background: ${bgColors.primary};
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.24px;

    svg {
      path {
        stroke: ${bgColors.white} !important;
      }

      circle {
        stroke: ${bgColors.white} !important;
      }
    }

    p {
      color: ${bgColors.white} !important;
    }
  }

  .ant-tag-checkable:hover {
    color: ${textColors.blueGray} !important;
  }
`;

export const GridChildWrapper = styled.div`
  overflow: auto;
  padding: 20px 5px;
  border: 1px solid transparent;
  -webkit-overflow-scrolling: touch;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &::-webkit-scrollbar {
    width: 6px;
    background-color: ${bgColors.whiteSmoke};
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    border: 1px solid ${bgColors.whiteSmoke};
    border-radius: 4px;
    background-color: ${bgColors.yourShadow};
    background-image: url("/scroll.png");
    background-size: 12px 5px;
    background-position: center;
    background-repeat: no-repeat;
  }

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
`;

export const GridContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const Flex = styled.div`
  display: flex;
  gap: 10px;
`;

export const TextWrapper = styled.span`
  font-size: ${fontSizes.f12};
  font-weight: 600;
  letter-spacing: -0.01em;
`;

export const HeadTitle = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${fontSizes.f16};
  font-weight: 600;
  letter-spacing: -0.01em;
`;

export const WrapperT = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AntPanel: any = styled(Panel)`
  .ant-collapse-item {
    box-shadow: none !important;
  }

  .ant-collapse-header {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 15px !important;
    font-weight: 700;
    color: ${textColors.blueGray};
    text-transform: uppercase;
    font-size: ${fontSizes.f14};
  }

  padding: 0 !important;

  span[aria-label="caret-right"] svg {
    fill: ${bgColors.blueGray};
    margin-top: 10px;
    height: 20px;
    width: 20px;
  }

  .ant-collapse-content {
  }

  .ant-collapse-content-active {
  }

  .ant-collapse-content-box {
    padding: 10px 0 !important;
    background: ${bgColors.whiteSmoke} !important;
  }
`;

export const SwiperWrapper = styled(Swiper)`
  width: 100%;

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

export const Badge = styled.span`
  background: ${bgColors.pepper};
  color: ${textColors.white};
  font-size: ${fontSizes.f10};
  line-height: ${fontSizes.f16};
  font-weight: 700;
  border-radius: 40px;
  padding: 4px 6px;
`;

export const HeaderPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
