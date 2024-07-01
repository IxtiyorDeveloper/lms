import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  background: ${bgColors.whiteSmoke};
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  margin: 14px 0;
  padding: 20px;

  .flex-wrap {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title-card {
      color: ${textColors.sceptreBlue};
      font-weight: 700;
      font-size: ${fontSizes.f14};
      line-height: 1.2;
    }

    .price-num {
      font-size: ${fontSizes.f18};
      font-weight: 700;
      color: ${textColors.pop};
      span {
        font-size: ${fontSizes.f18};
        font-weight: 700;
        color: ${textColors.midori};
      }
    }
    .price-num:nth-child(2) {
      font-size: ${fontSizes.f12};
      span {
        font-size: ${fontSizes.f12};
      }
    }
  }

  .flex-cards {
    display: flex;
    gap: 14px;
  }
`;

export const CardWrapper = styled.div<{
  first?: number;
  second?: number;
}>`
  width: 100%;
  background: ${bgColors.white};
  border: 1px solid ${bgColors.whiteSmoke};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), inset 0 0 12px #ffffff;
  border-radius: 16px;
  padding: 20px;

  .title-card {
    font-size: ${fontSizes.f14};
    font-weight: 600;
    color: ${textColors.sceptreBlue};
    margin-bottom: 60px;
  }

  .bar-chart {
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    gap: 11px;

    p {
      position: absolute;
      top: 5px;
      right: 10px;
      z-index: 10;
      font-weight: 500;
    }

    & > div {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 2px;

      .bar {
        height: 30px;
        border-radius: 2px;
      }
    }

    .bank-1 > .bar {
      background: linear-gradient(
        90deg,
        #44b26b 51.13%,
        rgba(68, 178, 107, 0.19) 105.6%
      );
      border-radius: 4px 0 0 4px;
      width: ${({ first }) => first}%;
      font-size: ${fontSizes.f12};
      font-weight: 500;
      border-right: 2px solid ${bgColors.serengeti};
      position: relative;

      &:after {
        content: "";
        height: 8px;
        width: 8px;
        background-image: url("/statistics/arrow1.svg");
        background-repeat: no-repeat;
        display: inline-block;
        position: absolute;
        right: -5px;
        bottom: 100%;
      }
    }

    .bank-2 > .bar {
      background: linear-gradient(270deg, #fdbf76 29.64%, #fa791d 100%);
      border-radius: 4px 0 0 4px;
      width: ${({ second }) => second}%;
      font-size: ${fontSizes.f12};
      font-weight: 500;
      border-right: 2px solid ${bgColors.ginger};
      position: relative;

      &:after {
        content: "";
        height: 8px;
        width: 8px;
        background-image: url("/statistics/arrow.svg");
        background-repeat: no-repeat;
        display: inline-block;
        position: absolute;
        right: -5px;
        bottom: 100%;
      }
    }

    .bank-1 {
      position: relative;
      width: 100%;
      background: rgba(221, 250, 220, 0.6);
      color: ${textColors.dark};
      box-shadow: inset 0 0 16px rgba(186, 247, 188, 0.4);
      border-radius: 4px;
    }

    .bank-2 {
      position: relative;
      width: 100%;
      background: rgba(255, 249, 203, 0.6);
      color: ${textColors.dark};
      box-shadow: inset 0 0 16px rgba(255, 241, 153, 0.4);
      border-radius: 4px;
    }
  }

  ul {
    list-style: none !important;
    margin-top: auto;
    display: flex;
    justify-content: flex-start;
    gap: 30px;

    li {
      &:last-child {
        border: none;
      }

      .title-num {
        font-weight: 700;
        font-size: ${fontSizes.f14};
        font-family: "Space Grotesk", sans-serif !important;
      }

      .li-label {
        display: flex;
        align-items: center;
        gap: 8px;
        color: ${textColors.dark};
        font-weight: 400;
        font-size: ${fontSizes.f12};
        line-height: 1.2;
        margin-bottom: 6px;
      }

      .dot {
        height: 8px;
        width: 8px;
        border-radius: 50%;
      }

      .blue {
        background: linear-gradient(90deg, #f05b71 51.13%, #fcada9 105.6%);
        border: 1px solid #c91d57;
      }

      .primary {
        background: ${bgColors.orange};
        border: 1px solid ${bgColors.orange};
      }

      .midori {
        background: ${bgColors.midori};
        border: 1px solid ${bgColors.midori};
      }
    }
  }
`;

export const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .chart-side {
    width: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }

  .first {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    gap: 20px;

    .box {
      border-left: 4px solid ${bgColors.transparent};
      padding: 0 8px;

      .box-title {
        font-size: ${fontSizes.f10};
        line-height: 1.2;
        font-weight: 500;
        letter-spacing: 0.02em;
        color: ${textColors.sceptreBlue};
      }

      .box-number {
        font-size: ${fontSizes.f14};
        line-height: 1.2;
        font-weight: 500;
        letter-spacing: 0.02em;
        color: ${textColors.dark};
        font-family: "Space Grotesk", sans-serif !important;
      }
    }

    .bank {
      border-color: ${bgColors.midori};
      background: linear-gradient(
        90deg,
        #ddfadc -84.25%,
        rgba(221, 250, 220, 0) 103.33%
      );
    }

    .mot {
      border-color: ${bgColors.pop};
      background: linear-gradient(
        90deg,
        #fed9a4 -51.18%,
        rgba(253, 238, 209, 0) 94.61%
      );
    }
  }
`;
