import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  border-radius: 20px;
  background: ${bgColors.brotherBlue};
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.25);
  padding: 32px 30px;
  margin-top: 20px;
  position: relative;
  overflow: hidden;

  .title {
    color: ${textColors.dark};
    font-size: ${fontSizes.f24};
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .text {
    color: ${textColors.inkDark};
    font-size: ${fontSizes.f16};
    font-style: normal;
    font-weight: 500;
    line-height: 1; /* 87.5% */
    margin-top: 13px;
  }
  .img {
    position: absolute;
    top: 30px;
    right: 30px;
  }
`;
