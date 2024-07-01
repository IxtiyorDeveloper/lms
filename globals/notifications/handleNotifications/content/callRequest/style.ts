import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 2px;
  .phone-wr {
    margin-top: 6px;
    color: ${textColors.blueGray};
  }
  .topContent {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .title {
      color: ${textColors.blueGray};
      font-size: ${fontSizes.f14};
      font-style: normal;
      font-weight: 700;
      line-height: 1.28; /* 128.571% */
      letter-spacing: 0.1px;
    }
    .close {
      border-radius: 50px;
      background: ${bgColors.pale};
      display: flex;
      width: 20px;
      height: 20px;
      padding: 1.455px;
      justify-content: center;
      align-items: center;
      gap: 7.273px;
      cursor: pointer;
    }
  }

  .description {
    color: ${textColors.brotherBlue};
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 400;
    line-height: 1.2; /* 133.333% */
    letter-spacing: 0.1px;
    margin-top: 4px;
    a {
      color: ${textColors.blueGray};
      font-size: ${fontSizes.f12};
      font-style: normal;
      font-weight: 400;
      line-height: 1.2;
      letter-spacing: 0.1px;
      &:hover {
        text-decoration: underline;
      }
    }
    span {
      color: ${textColors.blueGray};
      font-size: ${fontSizes.f12};
      font-style: normal;
      font-weight: 400;
      line-height: 1.2;
      letter-spacing: 0.1px;
    }
  }
`;
