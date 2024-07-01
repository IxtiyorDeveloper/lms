import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const StatusWrapper = styled.span`
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 3px;
  padding: 2px 8px;
  border-radius: 20px;
  color: ${textColors.white};
  font-weight: 500;
  font-size: ${fontSizes.f12};
`;
