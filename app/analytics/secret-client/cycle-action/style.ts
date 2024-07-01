import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 0 40px;
`;

export const Container = styled.div<{ mt?: number }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20px;
  gap: 20px;
  background: ${bgColors.white};
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  border-radius: 12px;

  margin-top: ${(p) => (p.mt ? `${p.mt}px` : "unset")};
`;
