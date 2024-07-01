import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const TitleText = styled.p`
  font-size: ${fontSizes.f14};
  font-weight: 700;
  color: ${textColors.sceptreBlue};
  padding: 20px;
`;

export const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px;
  background-color: ${bgColors.whiteSmoke};
  border-radius: 20px;
  border: 1px solid ${bgColors.whiteSmoke};
  box-shadow: 0 0 2px 0 #00000026;
`;

export const Info = styled.p`
  font-size: ${fontSizes.f12};
  font-weight: 500;
  line-height: 1.2;

  .hd {
    color: ${textColors.yourShadow};
  }
`;
