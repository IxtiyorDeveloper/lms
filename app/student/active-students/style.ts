import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const StyledBox = styled.div`
  margin-inline: 40px;
  margin-top: 11px;
  overflow: hidden;
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
export const Wrapper = styled.div`
  .white {
    background: ${bgColors.white};
  }
`;
