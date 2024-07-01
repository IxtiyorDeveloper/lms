import styled from "@emotion/styled";
import { textColors } from "styles/theme";

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
