import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div``;
export const WaitingLabel = styled.div<{ bgColor?: string; color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 8px;
  background: ${bgColors.bonnie};
  border-radius: 20px;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 13px;
  text-transform: capitalize;
  color: ${textColors.orange};
  cursor: pointer;

  &:hover {
    background: ${bgColors.champagne};
  }
`;

export const ArchivedLabel = styled.div<{ bgColor?: string; color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 8px;
  background: ${bgColors.whiteSmoke};
  border-radius: 20px;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 13px;
  text-transform: capitalize;
  color: ${textColors.yourShadow};
  cursor: pointer;
  &:hover {
    background: ${bgColors.purpleCrystal};
  }
`;
