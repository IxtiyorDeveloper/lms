import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const CustomTooltipWrapper = styled.div`
  background: ${bgColors.dark};
  color: ${textColors.white};
  border-radius: 8px;
  font-weight: 500;
  font-size: ${fontSizes.f12};
  padding: 4px;

  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ${fontSizes.f11};
  }
`;
