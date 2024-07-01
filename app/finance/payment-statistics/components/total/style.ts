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
      span {
        font-size: ${fontSizes.f18};
        font-weight: 700;
        color: ${textColors.midori};
      }
    }

    .price-num:nth-child(2) {
      font-size: ${fontSizes.f12};
      text-align: center;
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

const colors = {
  pop: "linear-gradient(270deg, #E92857 0%, #F87C84 100%)",
  orange: "linear-gradient(270deg, #FA791D 29.64%, #FDBF76 100%)",
  deep: "linear-gradient(270deg, #6084FF 50.28%, #BFD1FF 100%)",
};

export const CardWrapper = styled.div<{
  educational?: number;
  productAndService?: number;
  studentBalance?: number;
}>`
  width: 100%;
  background: ${bgColors.white};
  border: 1px solid ${bgColors.whiteSmoke};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), inset 0 0 12px ${bgColors.white};
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
    gap: 4px;
    align-items: flex-end;

    p {
      font-family: "Space Grotesk", sans-serif !important;
    }

    & > div {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: ${fontSizes.f10};

      .bar {
        height: 30px;
        border-radius: 2px;
        min-width: 3px;
        cursor: pointer;
      }
    }

    .cash > .bar {
      background: ${colors.pop};
    }

    .card > .bar {
      background: ${colors.orange};
    }

    .online-payment > .bar {
      background: ${colors.deep};
    }

    .cash {
      width: ${({ educational }) => educational}%;
    }

    .card {
      width: ${({ productAndService }) => productAndService}%;
    }

    .online-payment {
      width: ${({ studentBalance }) => studentBalance}%;
    }
  }

  ul {
    list-style: none !important;
    margin-top: auto;
    display: flex;
    justify-content: space-between;

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

        &.pr {
          .ant-tooltip {
            max-width: unset !important;
          }
        }
      }

      .dot {
        height: 8px;
        width: 8px;
        border-radius: 50%;
      }

      .blue {
        background: linear-gradient(
          90deg,
          ${bgColors.pepper} 51.13%,
          ${bgColors.fond} 105.6%
        );
        border: 1px solid ${bgColors.rose};
      }

      .primary {
        background: linear-gradient(
          147.53deg,
          ${bgColors.orange} 28.86%,
          ${bgColors.nouveau} 90.28%
        );
        border: 1px solid ${bgColors.tomato};
      }

      .midori {
        background: linear-gradient(
          146.31deg,
          ${bgColors.kitten} 27.33%,
          ${bgColors.deep} 90%
        );
        border: 1px solid ${bgColors.night};
      }
    }
  }
`;
export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const Col = styled.div`
  width: 100%;
  .product {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 30px;
  }
`;
export const DetailedCol = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;
export const CWr = styled.div`
  .name {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 1;
    letter-spacing: -0.01em;
    color: ${textColors.brotherBlue};
  }
  .minWidth300 {
    min-width: 300px;
  }
`;
export const DetailedOnline = styled.div`
  padding-left: 30px;
  .price {
    font-weight: 700;
    font-size: ${fontSizes.f12};
    line-height: 1;
    letter-spacing: -0.01em;
    color: ${textColors.brilliance};
  }
`;
export const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 9px;
  }
  .price {
    font-weight: 700;
    font-size: ${fontSizes.f12};
    line-height: 1;
    letter-spacing: -0.01em;
    color: ${textColors.brilliance};
    margin-top: 4px;
  }
`;
export const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .chart-side {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    //align-items: flex-end;
    .custom-tooltip {
      background: ${bgColors.white};
      padding: 10px;
      box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
      font-size: ${fontSizes.f12};
      line-height: 1.2;
      font-weight: 500;
    }
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
        display: flex;
        gap: 7px;
        .icon {
          width: fit-content;
          height: fit-content;
        }
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
