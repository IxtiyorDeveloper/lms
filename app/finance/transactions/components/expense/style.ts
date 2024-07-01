import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const ExpenseWrapper = styled.div`
  margin-top: 16px;
  overflow: hidden;
`;

export const TabNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${fontSizes.f12};
  font-weight: 700;
  line-height: 24px;
`;
