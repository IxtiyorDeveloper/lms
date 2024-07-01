import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const WrapperBranches = styled.div`
  display: flex;
  flex-wrap: wrap;
  //grid-template-columns: 1fr 1fr 1fr;
  padding: 10px 20px;
  gap: 12px;

  .branch-wrap {
    display: flex;

    .branch {
      background: ${bgColors.whiteSmoke};
      border-radius: 4px;
      padding: 3px 10px;
      display: flex;
      align-items: center;
      gap: 5px;

      .dot {
        height: 12px;
        width: 12px;
        border-radius: 50%;
      }

      .text {
        //max-width: calc(100% - 20px);
        font-weight: 500;
        font-size: ${fontSizes.f12};
        line-height: 1.2;
        text-align: center;
        letter-spacing: 0.02em;
        color: ${textColors.blueGray};
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        span {
          margin-left: 8px;
        }
      }
    }
  }
`;
export const PWr = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  .dot {
    height: 6px;
    width: 6px;
    border-radius: 50%;
  }
`;
export const CardWrapper = styled.div<{
  card?: number;
  cash?: number;
  onlinePayment?: number;
}>`
  border-radius: 16px;
  border: 1px solid ${bgColors.whiteSmoke};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), inset 0 0 12px #ffffff;
  background-color: ${bgColors.white};
  width: 100%;
  position: relative;
  overflow: hidden;

  .title-card {
    margin: 20px;
  }

  .bar-chart {
    display: flex;
    gap: 4px;
    padding: 4px 20px 20px 20px;

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
        height: 14px;
        border-radius: 2px;
        cursor: pointer;
      }
    }

    .cash {
      width: ${({ cash }) => cash}%;
      min-width: 3px;
    }

    .card {
      width: ${({ card }) => card}%;
    }

    .online-payment {
      width: ${({ onlinePayment }) => onlinePayment}%;
    }
  }

  .card-title {
    font-size: ${fontSizes.f14};
    font-weight: 600;
    line-height: 1.2;
    margin: 20px 20px 12px 20px;
    color: ${textColors.sceptreBlue};
  }

  .card-price {
    font-size: ${fontSizes.f18};
    font-weight: 700;
    line-height: 1.2;
    margin: 0 20px 14px 20px;
    font-family: "Space Grotesk", sans-serif !important;
    color: ${textColors.dark};
    letter-spacing: 0.02em;
  }
`;
