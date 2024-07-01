import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 16px;
  width: fit-content;
  .top {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px solid ${bgColors.mineShaft};
    gap: 20px;
    .left {
      display: flex;
      gap: 8px;
      .name {
        color: ${textColors.brilliance};
        font-size: ${fontSizes.f12};
        font-style: normal;
        font-weight: 500;
        line-height: 1.6;
        letter-spacing: -0.12px;
      }
    }
    .right {
      color: ${textColors.sadet};
      font-size: ${fontSizes.f12};
      font-style: normal;
      font-weight: 500;
      line-height: 1.6;
      letter-spacing: -0.12px;
    }
  }
  .text {
    color: ${textColors.sadet};
    font-size: ${fontSizes.f10};
    font-style: normal;
    font-weight: 500;
    line-height: 1.6; /* 160% */
    letter-spacing: -0.1px;
    margin-top: 8px;
  }
`;
