import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Content = styled.div`
  padding: 8px !important;
  border-radius: 8px;
  border: 1px solid ${bgColors.whiteSmoke};
  background: ${bgColors.white};
  box-shadow: 0 32px 48px -8px rgba(0, 0, 0, 0.1),
    0 0 14px -4px rgba(0, 0, 0, 0.05), 0 40px 64px -12px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(16px);
  width: 146px;

  .title {
    color: ${bgColors.blueGray};
    font-family: SF Pro Display sans-serif;
    font-size: ${fontSizes.f14};
    font-weight: 500;
    line-height: 1.28;
  }

  .items {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    .item.active {
      //background: ${bgColors.primary};
      background: ${bgColors.whiteSmoke};
    }
    .item:hover {
      background: ${bgColors.whiteSmoke};
    }
    .item {
      border-radius: 6px;
      padding: 8px;
      cursor: pointer;
    }

    .text {
      display: flex;
      justify-content: space-between;
      white-space: nowrap;
      color: ${textColors.soulfulBlue};
      font-size: ${fontSizes.f12};
      font-weight: 400;
      letter-spacing: -0.12px;
      div {
        color: ${textColors.sceptreBlue};
        font-size: ${fontSizes.f12};
        font-weight: 500;
        letter-spacing: -0.12px;
      }
    }
  }
`;

export const Wrapper = styled.div`
  margin-right: 10px;

  .flex {
    margin: 0 !important;
    display: flex;
  }

  .active {
    border-radius: 4px;
    padding: 1px 4px;
    display: flex;
    align-items: center;
    color: ${textColors.sceptreBlue};
    font-family: SF Pro Display sans-serif;
    font-size: ${fontSizes.f14};
    font-weight: 500 !important;
    line-height: 1.28;
  }

  .active:hover {
    background: ${bgColors.whiteSmoke};
  }

  .arrow {
    margin-left: 6px;

    .arrow-c {
      margin: 0 !important;
    }
  }

  .name {
    color: ${textColors.sadet};
    font-family: SF Pro Display sans-serif;
    font-size: ${fontSizes.f14};
    font-weight: 500;
    line-height: 1.28; /* 128.571% */
  }
`;
