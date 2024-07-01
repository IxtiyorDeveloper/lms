import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  padding: 30px 40px 0 40px;
  .tabs {
    overflow: hidden;
  }
`;
export const StatisticsCollapse = styled.div`
  background: ${bgColors.white};
  box-shadow: 0px 0px 24px 0px #0000000d;
  padding: 4px 8px;
  border-radius: 8px;
  margin: 20px 0;
`;

export const WaitingListWrapper = styled.div`
  .sectionTable {
    overflow: auto;
    margin: 10px 40px 0 40px;
    background: ${bgColors.white};

    box-shadow:
      0 40px 64px -12px rgba(0, 0, 0, 0.08),
      0 0 14px -4px rgba(0, 0, 0, 0.05),
      0 32px 48px -8px rgba(0, 0, 0, 0.1);
    border-radius: ${borders.b6};
  }

  div[data-state="active"] {
    background: green;
    color: red;
  }
`;

export const Badge = styled.div`
  background-color: ${bgColors.pepper};
  color: ${textColors.white};
  border-radius: 40px;
  height: 20px;
  min-width: 25px;
  width: fit-content;
  font-size: ${fontSizes.f12};
  font-weight: 800;
  padding: 0 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
