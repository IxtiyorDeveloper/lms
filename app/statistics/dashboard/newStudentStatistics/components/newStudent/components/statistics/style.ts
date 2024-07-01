import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  .by_amount {
    font-weight: 700;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: ${textColors.blueGray};
  }
  .flex-filter-info {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    .card {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      //padding: 10px;
      height: 40px;
      padding: 0 10px;
      gap: 6px;
      background: ${bgColors.whiteSmoke};
      border-radius: 8px;
      margin: 0;
      font-family: "Space Grotesk", sans-serif;
      font-weight: 700;
      font-size: 14px;
      line-height: 18px;
      letter-spacing: 0.02em;
      color: #23262f;

      .student {
        color: ${textColors.midori};
      }
    }
  }
`;

const colors = {
  pop: "linear-gradient(270deg, #E92857 0%, #F87C84 100%)",
  primary: bgColors.primary,
  orange: "linear-gradient(270deg, #FA791D 29.64%, #FDBF76 100%)",
  deep: "linear-gradient(270deg, #6084FF 50.28%, #BFD1FF 100%)",
};

export const CardWrapper = styled.div<{
  educational?: number;
  productAndService?: number;
  studentBalance?: number;
}>`
  margin-top: 60px;
  position: relative;
  .title-card {
    font-size: ${fontSizes.f14};
    font-weight: 600;
    color: ${textColors.sceptreBlue};
    margin-bottom: 60px;
  }

  .title1 {
    display: flex;
    //justify-content: space-between;
    font-style: normal;
    gap: 8px;
    font-weight: 500;
    font-size: ${fontSizes.f14};
    line-height: 17px;
    text-align: center;
    letter-spacing: 0.02em;
    color: ${textColors.sceptreBlue};
    margin-bottom: 10px;
    //overflow: hidden;
    //text-overflow: ellipsis;

    p:nth-of-type(2) {
      font-family: "Space Grotesk", sans-serif;
      font-style: normal;
      font-weight: 700;
    }
  }

  .title1.right {
    right: 0;
    bottom: 30px;
    position: absolute;
  }
  .title1.left {
    left: 0;
    bottom: 30px;
    position: absolute;
  }

  .bar-chart {
    margin-bottom: 24px;
    display: flex;
    gap: 8px;
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
      background: ${colors.primary};
    }

    .card > .bar {
      background: ${colors.orange};
    }

    .online-payment > .bar {
      background: ${colors.deep};
    }

    .secondary {
      color: ${textColors.soulfulBlue} !important;
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
