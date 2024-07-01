import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 40px;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const RightContent = styled.div`
  //width: 50%;
`;

export const LeftContent = styled.div`
  //width: 50%;
  display: flex;
  gap: 16px;
  .text {
    font-weight: 400;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    letter-spacing: -0.01em;
    color: ${textColors.yourShadow};
    cursor: pointer;
  }
`;
