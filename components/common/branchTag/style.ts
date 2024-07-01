import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 3px 8px;
  gap: 10px;
  background: ${bgColors.purpleCrystal};
  border-radius: 10px;
  font-style: normal;
  font-weight: 600;
  font-size: ${fontSizes.f10};
  line-height: 12px;
  text-align: center;
  color: ${textColors.yourShadow};
`;

export const Branches = styled.div`
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BranchRow = styled.p`
  font-weight: 600;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${textColors.blueGray};
`;
