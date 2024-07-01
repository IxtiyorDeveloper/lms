import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { css } from "@emotion/react";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  gap: 8px;
  .flex {
    display: flex;
  }

  .name {
    color: ${textColors.sceptreBlue};
    font-size: ${fontSizes.f14};
    font-weight: 700;
    letter-spacing: -0.14px;
    display: flex;
    gap: 10px;
  }

  .percent1 {
    font-family: Space Grotesk sans-serif;
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f14};
    font-weight: 500;
    letter-spacing: 0.16px;
  }

  .flex {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }
`;

export const Card = styled.div<{
  background?: string;
  boxShadow?: string;
  color?: string;
  isActive?: boolean;
}>`
  border-radius: 12px;
  background: ${(props) =>
    props.background
      ? props.background
      : css`linear-gradient(97deg, ${bgColors.midori} 3.03%, ${bgColors.serengeti} 99.6%)`};
  box-shadow: ${(props) =>
    props.boxShadow ? props.boxShadow : "0 0 4px 0 ${bgColors.spring} inset"};
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 145px;
  overflow: hidden;
  color: ${(props) => props?.color || textColors.white};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.16px;
  outline: 3px solid
    ${(props) => (props?.isActive ? bgColors.primary : "transparent")};
  transition: 0.3s;
  opacity: ${(props) => (props?.isActive ? 1 : 0.7)};
  cursor: pointer;

  .info {
    margin: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .child {
      font-size: ${fontSizes.f14};
    }

    .number {
      font-family: Space Grotesk sans-serif;
      font-size: ${fontSizes.f24};
      font-weight: 700;
      line-height: 0.83;
      letter-spacing: -0.24px;
    }

    .mt-auto {
      margin-top: auto;
    }
  }

  .icons {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .chart {
      align-self: flex-end;
      margin-bottom: 20px;
      margin-right: 20px;

      .percent {
        color: ${textColors.white};
        font-family: Space Grotesk sans-serif;
        font-size: ${fontSizes.f12};
        font-weight: 500;
        letter-spacing: 0.272px;
      }
    }

    .back {
      position: absolute;
      right: 0;
      bottom: -4px;
      z-index: 2;
    }

    .main {
      z-index: 20 !important;
      display: flex;
      align-self: flex-end;
      margin-bottom: 20px;
      margin-right: 20px;
    }
  }
`;
