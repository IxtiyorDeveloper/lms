import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const IncomeWrapper = styled.div`
  margin-top: 16px;
  overflow: hidden;
  border-radius: 15px;
  background: ${bgColors.purpleCrystal};

  .tabs.group {
    width: 500px;
  }
`;

export const TabNameWrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  gap: 8px;
  font-size: ${fontSizes.f12};
  font-weight: 700;
  line-height: 24px;

  span {
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
  }
`;
