import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const ActionInfoWrapper = styled.div<{
  bgColor?: string;
  color?: string;
}>`
  border-radius: 20px;
  padding: 6px 10px;
  background-color: ${({ bgColor }) => bgColor};
  display: flex;
  align-items: center;
  gap: 4px;
  p,
  span {
    font-size: ${fontSizes.f12};
    line-height: normal;
    font-weight: 500;
    color: ${({ color }) => color || textColors.white};
  }
`;
