import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  background: ${bgColors.white};
  margin: 20px 40px;
  border-radius: 12px;
`;
export const TabHeaderWrapper = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  padding: 12px;
  justify-content: center;
  z-index: 4;
  color: ${textColors.brilliance};
  border-radius: 6px;
`;
export const Flex = styled.div`
  display: flex;
  gap: 10px;
`;
