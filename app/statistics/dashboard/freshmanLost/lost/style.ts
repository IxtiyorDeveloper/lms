import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const TabHeaderWrapper = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  padding: 12px;
  justify-content: center;
  z-index: 4;
  color: ${textColors.slate};
  border-radius: 6px;
  line-height: 20px;
`;
export const Wrapper = styled.div`
  margin: 0 40px;
  overflow: hidden;
  border-radius: 14px;
  .badge {
    padding: 20px;
    border-bottom: 1px solid ${bgColors.purpleCrystal};
    background: ${bgColors.brilliance};
    margin-bottom: 4px;
  }
`;
