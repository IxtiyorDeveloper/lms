import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 20px;
  overflow: hidden;

  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .title {
      color: ${textColors.blueGray};
      font-size: ${fontSizes.f18};
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.18px;
    }
  }
  .info {
    font-size: ${fontSizes.f10};
    font-weight: 500;
    align-items: center;
    display: flex;
    gap: 8px;
    padding: 20px 20px 0 20px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InContainer = styled.div`
  background: ${bgColors.whiteSmoke};
  border-radius: 8px 8px 16px 16px;
`;

export const Info = styled.div`
  padding: 16px;
  border-radius: 16px;
  background: ${bgColors.midori};
  display: flex;
  gap: 12px;
  align-items: center;

  .left {
    border-radius: 12px;
    background: ${bgColors.white};
    display: flex;
    width: 44px;
    height: 44px;
    padding: 10px;
    justify-content: center;
    align-items: center;
  }

  .content {
    .sum {
      color: ${textColors.white};
      font-size: ${fontSizes.f18};
      font-style: normal;
      font-weight: 700;
      line-height: 1.2; /* 133.333% */
    }

    .text {
      color: ${textColors.white};
      font-size: ${fontSizes.f14};
      font-style: normal;
      font-weight: 400;
      line-height: 1.1; /* 114.286% */
    }
  }
`;

export const Flex = styled.div`
  padding: 16px;
  .prepayment {
    margin-top: 8px;
  }
  .items {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .down {
      transform: rotate(90deg) !important;
    }

    .up {
      transform: rotate(-90deg) !important;
    }
  }

  .ant-collapse {
    border: none !important;
    border-radius: 8px !important;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .ant-collapse-item {
      border: none !important;
      border-radius: 8px !important;
      overflow: hidden;
    }

    .ant-collapse-header {
      background: ${bgColors.white} !important;
      border-radius: 0 !important;
      border-bottom: 1px solid ${bgColors.whiteSmoke};
    }

    .ant-collapse-content {
      border: none !important;
    }
  }
`;
export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  border: 1px solid ${bgColors.yukon};
  padding: 12px;
  background: ${bgColors.white};

  .left {
    display: flex;
    align-items: center;
    gap: 10px;

    .text {
      color: ${textColors.blueGray};
      font-size: ${fontSizes.f16};
      font-style: normal;
      font-weight: 500;
      line-height: 20px; /* 125% */
    }
  }

  .right {
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f16};
    font-style: normal;
    font-weight: 700;
    line-height: 1.2; /* 125% */

    &.midori {
      color: ${textColors.midori};
    }

    &.pepper {
      color: ${textColors.pepper};
    }
  }
`;

export const Label = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  background: ${bgColors.white};

  .left {
    display: flex;
    align-items: center;
    gap: 10px;

    .text {
      color: ${textColors.blueGray};
      font-size: ${fontSizes.f16};
      font-style: normal;
      font-weight: 500;
      line-height: 20px; /* 125% */
    }
  }

  .right {
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f16};
    font-style: normal;
    font-weight: 700;
    line-height: 1.2; /* 125% */

    &.midori {
      color: ${textColors.midori};
    }

    &.pepper {
      color: ${textColors.pepper};
    }
  }
`;

export const ChildRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  background: ${bgColors.whiteSmoke};
  padding: 12px;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 70%;
    .text {
      color: ${textColors.harrison};
      font-size: ${fontSizes.f12};
      font-style: normal;
      font-weight: 500;
      line-height: 1.2; /* 125% */
      min-width: 120px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  .right {
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 700;
    line-height: 1.2; /* 125% */
    width: 30%;
    text-align: right;

    &.midori {
      color: ${textColors.midori};
    }

    &.pepper {
      color: ${textColors.pepper};
    }
  }
`;
export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  padding: 20px 0;
  justify-content: flex-end;

  .cancel {
    width: 100%;
    height: 44px;
    color: ${textColors.yourShadow};
    border-radius: ${borders.b8};
    background-color: ${bgColors.wildSand};
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
  }
`;

export const CC = styled.div`
  padding: 16px;
  display: flex;
  gap: 8px;
  .card {
    background: ${bgColors.white};
    width: 50%;
    padding: 12px;
    border-radius: 8px;
    .title-c {
      color: ${textColors.soulfulBlue};
      font-size: ${fontSizes.f16};
      font-style: normal;
      font-weight: 500;
      line-height: 1.2; /* 125% */
    }
    .row-c {
      display: flex;
      margin-top: 10px;
      gap: 8px;
      align-items: center;
      .amount {
        color: ${textColors.blueGray};
        font-size: ${fontSizes.f16};
        font-style: normal;
        font-weight: 700;
        line-height: 1.25; /* 125% */
      }
    }
  }
`;
