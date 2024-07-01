import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const IncomeWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

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
      font-family: "Space Grotesk", sans-serif !important;
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

export const TotalWrapper = styled.div`
    border-bottom: 1px solid #E6E8EC;
    padding-bottom: 30px;
    
    .total-text {
        font-size: ${fontSizes.f14};
        color: ${textColors.yourShadow};
        margin-left: 20px;
    }

    .real-total {
        margin-left: 20px;
    }
`;

export const CardWrapper = styled.div<{
  educational?: number;
  productAndService?: number;
  studentBalance?: number;
}>`
    width: 100%;
    background: ${bgColors.brilliance};
    border-radius: 16px;
    border: 1px solid #f4f5f6;
    box-shadow: 0 0 45px 0 #00000005 inset;

    .title-card {
        padding: 20px;
        font-size: ${fontSizes.f14};
        font-weight: 600;
        color: ${textColors.sceptreBlue};
        margin-bottom: 60px;
    }

    .wr {
        display: flex;
        gap: 10px;
        flex-direction: column;
        padding-bottom: 30px;
        border-bottom: 1px solid ${bgColors.purpleCrystal};

        .label {
            padding-inline: 20px;
            font-weight: 500;
            font-size: ${fontSizes.f14};
            line-height: 1.2;
            letter-spacing: 0.02em;
            color: ${textColors.yourShadow};
        }

        .amount {
            padding-inline: 20px;
            font-weight: 700;
            font-size: ${fontSizes.f24};
            line-height: 1.15;
            letter-spacing: 0.02em;
            color: ${textColors.blueGray};

            span {
                color: ${textColors.midori};
            }
        }
    }

    .bar-chart {
        padding: 20px;
        margin-bottom: 5px;
        display: flex;
        align-items: flex-end;
        gap: 4px;

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
            width: ${({educational}) => educational}%;
        }

        .card {
            width: ${({productAndService}) => productAndService}%;
        }

        .online-payment {
            width: ${({studentBalance}) => studentBalance}%;
        }
    }

    ul {
        padding: 20px;
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
                background: linear-gradient(147.53deg, #fa791d 28.86%, #fdbf76 90.28%);
                border: 1px solid #d65a14;
            }

            .midori {
                background: linear-gradient(146.31deg, #87a5ff 27.33%, #6084ff 90%);
                border: 1px solid #3047b7;
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
  display: flex;
  flex-direction: column;
  gap: 8px;

  .product {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 30px;
  }
`;
export const CWr = styled.div`
  .name {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 1;
    letter-spacing: -0.01em;
    color: ${textColors.brotherBlue};
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
