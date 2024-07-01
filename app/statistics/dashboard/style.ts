import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { IBgColors, IShadow, IShadows } from "./type";

const boxShadows: IShadows = {
  midori: "inset 0 0 14px rgba(77, 172, 105, 0.5)",
  orange: "inset 0 0 14px rgba(250, 121, 29, 0.5)",
  white: "0 0 24px rgba(0, 0, 0, 0.08)",
  deepFirst: "none",
  black: "inset 0 0 14px #23262F",
  purple: "inset 0 0 14px rgba(94, 70, 206, 0.5)",
  pop: "inset 0 0 14px rgba(201, 29, 87, 0.5)",
  darkGreen: "inset 0 0 14px rgba(41, 66, 46, 0.5)",
  yellow: "inset 0 0 14px rgba(208, 165, 1, 0.5)",
  deep: "inset 0 0 14px rgba(0, 66, 219, 0.5)",
  kpi: "inset 0 0 14px rgba(0, 66, 219, 0.5)",
};

const bgColor: IBgColors = {
  midori: "#5CC87B",
  orange:
    "linear-gradient(270deg, #FA791D 50.24%, rgba(253, 191, 118, 0.2) 140.56%)",
  white: bgColors.white,
  black: "#181818",
  deepFirst: "linear-gradient(96.92deg, #2573D6 3.03%, #295D9E 99.6%)",
  purple: "#7D63F2",
  pop: "linear-gradient(270deg, #E92857 15.92%, rgba(252, 173, 169, 0.9) 106.25%)",
  darkGreen: "#3E5843",
  yellow: "#FFDF55",
  deep: "#2573D6",
  kpi: "linear-gradient(276deg, #16A1BF 1.46%, #187387 97.8%)",
  greenCyan: "#44B27D",
};

export const Wrapper = styled.div`
  margin: 20px 40px;
  padding: 20px;
  background: ${bgColors.white};
  border-radius: 12px;

  .picker {
    display: flex;
    gap: 10px;
    max-width: 500px;
    width: 500px;

    .min {
      min-width: 250px;
    }
  }

  .header-side {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    h1 {
      font-size: ${fontSizes.f20};
      font-weight: 600;
    }
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 17px;
  }

  .first {
    background-image: url("/bgImagesForStatistics/1-0.png"),
      url("/bgImagesForStatistics/1-1.png"),
      url("/bgImagesForStatistics/1-2.png");
    background-repeat: no-repeat;
    background-position:
      bottom left,
      bottom left,
      top right;
  }

  .bgDeep {
    background-image: url("/bgImagesForStatistics/extra.png"),
      url("/bgImagesForStatistics/11-0.png"),
      url("/bgImagesForStatistics/11-1.png"),
      linear-gradient(96.92deg, #2573d6 3.03%, #295d9e 99.6%);
    background-repeat: no-repeat;
    background-position:
      bottom right,
      bottom right;
  }

  .bgDeepGroup {
    background-image: url("/bgImagesForStatistics/extra.png"),
      url("/bgImagesForStatistics/13-0.png"),
      url("/bgImagesForStatistics/13-1.png"),
      linear-gradient(96.92deg, #008f7a 3.03%, #008f7a 99.6%);
    background-repeat: no-repeat;
    background-position:
      bottom right,
      bottom right;
  }

  .bgBlue {
    background-image: url("/bgImagesForStatistics/12-1.png"),
      url("/bgImagesForStatistics/12-2.png");
    background-repeat: no-repeat;
    background-position:
      bottom left,
      bottom left;
  }
`;

export const CardWrapper = styled.div<{
  shadowColor: IShadow;
  freshman?: number;
  lost?: number;
}>`
  position: relative;
  cursor: pointer;
  height: 180px;
  border-radius: 8px;
  background: ${({ shadowColor }) => bgColor[shadowColor]};
  box-shadow: ${({ shadowColor }) => boxShadows[shadowColor]};
  overflow: hidden;

  .head-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
  }

  .title-card {
    color: ${textColors.white};
    font-weight: 700;
    font-size: ${fontSizes.f12};
  }

  .bars.waiting {
    height: 50%;
  }

  .foot-card {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 11px;
    height: 65%;

    .nums {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: ${fontSizes.f24};
      color: ${textColors.white};
      font-weight: 600;
    }

    .monthly {
      display: flex;
      align-items: center;
      gap: 5px;

      & *,
      & span {
        font-weight: 500;
        color: ${textColors.transparentGreen};
      }
    }
  }

  .bottom-wrapper {
    margin-top: 5px;
    padding-right: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .difference-count {
      background: ${bgColors.whiteSmoke};
      border-radius: 4px;
      padding: 2px 6px;
      font-size: ${fontSizes.f12};
    }

    .difference-text {
      color: ${textColors.yourShadow};
      font-weight: 500;
    }

    .difference-number {
      color: ${textColors.midori};
      font-weight: 500;
    }
  }

  .chart-side {
    display: flex;
    justify-content: flex-end;
    width: 50%;
    margin-left: auto;
    position: relative;
    margin-top: -10px;
  }

  .details {
    position: absolute;
    color: ${textColors.white};

    p {
      font-weight: 700;
      font-family: "Space Grotesk", sans-serif !important;
      margin-left: 15px;
      margin-top: 15px;
      font-size: ${fontSizes.f18};
    }

    p:first-of-type {
      font-size: ${fontSizes.f16};
      color: ${textColors.midori};
    }
  }

  .icon {
    position: absolute;
    right: 15px;
    bottom: 10px;
    z-index: 2;
  }

  .bg-img-right {
    position: absolute;
    right: 0;
    bottom: -45px;
    opacity: 0.7;
  }

  .bg-img-left {
    position: absolute;
    left: 0;
    bottom: -8px;
    opacity: 0.7;
  }

  .text-dark {
    color: ${textColors.dark} !important;
  }

  .bars {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-left: 0;

    .bar {
      font-weight: 600;
      color: ${bgColors.white};
      border-radius: 0 4px 4px 0;
      background: #93d195;

      .bar-percent {
        width: ${({ freshman }) => `${freshman}%` || "50%"};
        padding: 6px 0;
        background: linear-gradient(
          270deg,
          #329961 -0.87%,
          #118846 2.66%,
          #58b866 100%
        );

        p.number {
          text-shadow: 1px 2px 20px #0000003d !important;
          min-width: 100px;
          margin-left: 10px;
        }
      }
    }

    .bar:last-child {
      background: #fcada9;

      .bar-percent {
        width: ${({ lost }) => `${lost}%` || "20%"};
        padding: 6px 0;
        background: linear-gradient(
          90deg,
          #e92857 26.79%,
          rgba(248, 124, 132, 0.3) 169.29%
        );
        text-shadow: 1px 2px 20px #0000003d !important;

        p.number {
          min-width: 100px;
          margin-left: 10px;
        }
      }
    }
  }

  .bottom-side {
    display: flex;
    gap: 10px;
    padding-left: 10px;

    .tooltip {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: ${fontSizes.f10};
      font-weight: 600;
      color: ${textColors.yourShadow};

      .dot {
        height: 8px;
        width: 8px;
        border-radius: 50%;
      }

      .dot.midori {
        background: ${bgColors.eucalyptus};
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
      }

      .dot.pop {
        background: ${bgColors.pop};
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
      }
    }
  }

  .sms-count {
    margin-top: 20px;
    font-size: 36px;
    font-weight: 700;
    color: ${textColors.white};
  }
`;
