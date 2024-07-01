import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Image } from "antd";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div<{ border?: string }>`
  position: relative;

  z-index: 2;

  .ant-image .ant-image-mask {
    border-radius: ${(props) =>
      props.border ? (props) => props.border : "50%"};
  }
`;
export const StyledImage = styled(Image)<{
  border?: string;
  maxHeight: number | string;
}>`
  width: 40px;
  height: 40px;
  border-radius: ${(props) => (props.border ? (props) => props.border : "50%")};
  object-fit: cover;
  max-height: ${(props) => `${props.maxHeight}px`}!important;

  .custom-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${bgColors.white};
    font-size: 20px;
  }
`;
export const Circle = styled.div<{ color?: string; border?: string }>`
  border-radius: ${(props) => (props.border ? (props) => props.border : "50%")};
  position: relative;

  .abs {
    position: absolute;
    z-index: 12;
    background: ${bgColors.sinter};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    border-radius: 50%;
    top: -7px;
    right: -4px;
  }

  .abs-bottom {
    position: absolute;
    z-index: 12;
    background: ${bgColors.sinter};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    bottom: -7px;
    right: -4px;
  }

  .absn {
    position: absolute;
    z-index: 12;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    border-radius: 50%;
    top: -12px;
    right: -9px;

    .num {
      font-weight: 600;
      font-size: ${fontSizes.f8};
      color: ${textColors.blueGray};
      position: absolute;
    }

    .num_new {
      font-weight: 600;
      font-size: ${fontSizes.f7};
      color: ${textColors.blueGray};
      position: absolute;
    }
  }

  .abs1 {
    position: absolute;
    z-index: 12;
    background: ${bgColors.lemon};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    border-radius: 50%;
    top: -7px;
    right: -4px;
  }

  ${({ color }) =>
    !!color &&
    css`
      padding: 1px;
      border: 2px solid ${color};
    `}
`;
