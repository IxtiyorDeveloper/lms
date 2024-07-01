import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 85%;

  .capitalize {
    text-transform: capitalize;
  }

  .tab {
    font-size: ${fontSizes.f12};
    padding: 0;
    min-height: 10px;
    margin-top: 22px;
  }
`;

export const Count = styled.span`
  padding: 3px;
  border-radius: 6px;
  background: ${bgColors.wildSand};
  color: ${textColors.yourShadow};
  font-size: ${fontSizes.f10};
  font-weight: 700;
  font-family: "Space Grotesk", sans-serif;
`;
