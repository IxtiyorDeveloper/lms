import styled from "@emotion/styled";
import { bgColors, borders, textColors } from "styles/theme";

export const WaitingListWrapper = styled.div`
  .group-info {
    overflow: auto;
    margin: 10px 40px 20px 40px;
    background: ${bgColors.white};
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
    border-radius: ${borders.b6};
  }
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
`;
export const PaddingWrapper = styled.div`
  padding: 20px 10px;
  border-bottom: 1px solid ${bgColors.purpleCrystal};
  display: flex;
  width: 100%;
  gap: 10px;
  align-items: center;
  justify-content: space-between;

  .reset {
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
    border-radius: ${borders.b10};
    height: 40px;
    font-weight: 700;
    min-width: 88px;
    background-color: ${bgColors.wildSand};
    color: ${textColors.yourShadow};
  }
`;

export const TabHeaderWrapper = styled.div<{ isActive?: boolean }>`
  width: 100%;
  padding: 12px;
  justify-content: center;
  z-index: 4;
  color: ${textColors.brilliance};
  border-radius: 6px;
  gap: 5px;
  .flex {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    z-index: 4;
    color: ${textColors.brilliance};
    border-radius: 6px;
    gap: 5px;
  }
`;
