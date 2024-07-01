import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  gap: 8px;
`;

export const Btn = styled.div<{ bgColor?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 10px;
  gap: 10px;
  height: 36px;
  background: ${(p) => p.bgColor ?? bgColors.sceptreBlue};
  border-radius: 6px;
  width: 100%;
`;
