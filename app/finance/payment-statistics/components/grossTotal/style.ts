import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { Collapse } from "antd";

const { Panel } = Collapse;

export const HeadContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  .total {
    font-size: ${fontSizes.f18};
    font-weight: 700;
    span {
      font-size: ${fontSizes.f18};
      font-weight: 700;
      color: ${textColors.midori};
    }
  }
`;
export const AntPanel: any = styled(Panel)`
  .title-class {
    font-size: ${fontSizes.f14};
    font-weight: 700;
    color: ${textColors.sceptreBlue};
  }

  .ant-collapse-item {
    box-shadow: none !important;
  }

  span[aria-label="caret-right"] svg {
    fill: ${bgColors.yourShadow};
    height: 12px;
    width: 12px;
  }

  .ant-collapse-content {
  }
`;

const colors = {
  midori: "linear-gradient(135deg, #44B26B 24.59%, #91E79E 87.5%)",
  primary: "linear-gradient(147.53deg, #FFDF3F 28.86%, #FFCF00 90.28%)",
  deep: "linear-gradient(146.31deg, #87A5FF 27.33%, #6084FF 90%)",
};

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

  .img {
    width: 60%;
    position: absolute;
    right: 0;
    bottom: -40px;
  }

  .img1 {
    width: 75%;
    right: -30px;
    bottom: -50px;
  }

  @media (max-width: 1380px) {
    .img {
      width: 90%;
      position: absolute;
      right: 0;
      bottom: -40px;
    }

    .img1 {
      width: 100%;
      right: -30px;
      bottom: -50px;
    }
  }

  .bar-chart {
    border-top: 1px solid ${bgColors.whiteSmoke};
    display: flex;
    gap: 4px;
    padding: 4px 30px 20px 30px;

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
        min-width: 3px;
      }
    }

    .cash > .bar {
      background: ${colors.midori};
    }

    .card > .bar {
      background: ${colors.primary};
    }

    .online-payment > .bar {
      background: ${colors.deep};
    }

    .cash {
      width: ${({ cash }) => cash}%;
      min-width: 3px;
    }

    .card {
      width: ${({ card }) => card}%;
      min-width: 3px;
    }

    .online-payment {
      width: ${({ onlinePayment }) => onlinePayment}%;
      min-width: 3px;
    }
  }

  ul {
    list-style: none !important;
    margin-top: auto;
    padding: 0 20px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;

    li {
      padding: 0 0 12px 0;
      width: 100%;

      &:last-child {
        border: none;
      }

      &:first-of-type {
        padding-top: 10px;
      }

      .title-num {
        font-weight: 700;
        font-size: ${fontSizes.f12};
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
        background: linear-gradient(146.31deg, #87a5ff 27.33%, #6084ff 90%);
        border: 0.5px solid #3047b7;
        box-shadow: 0 1px 4px #a0b8ff;
      }

      .primary {
        background: linear-gradient(147.53deg, #ffdf3f 28.86%, #ffcf00 90.28%);
        border: 0.5px solid #dbad00;
        box-shadow: 0 1px 4px #ffe866;
      }

      .midori {
        background: linear-gradient(135deg, #44b26b 24.59%, #91e79e 87.5%);
        border: 0.5px solid #329961;
        box-shadow: 0 1px 4px #baf7bc;
      }
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

export const FlexWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const Flex = styled.div`
  padding-bottom: 20px;
  width: 100%;
  display: flex;
  gap: 20px;

  & div {
    width: 100%;
  }
`;

export const Badge = styled.div`
  background-color: ${bgColors.pepper};
  color: ${textColors.white};
  border-radius: 40px;
  height: 20px;
  width: 25px;
  font-size: ${fontSizes.f12};
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
`;
