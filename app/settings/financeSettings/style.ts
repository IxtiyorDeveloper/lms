import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  margin: 20px 40px;
  background: ${bgColors.white};
  border: 1px solid ${bgColors.purpleCrystal};
  border-radius: 14px;
  overflow: hidden;
`;

export const StyledContainer = styled.div`
  border-radius: 10px;
  background: ${bgColors.dark};
  box-shadow: 0 32px 48px -8px rgba(0, 0, 0, 0.1),
    0 0 14px -4px rgba(0, 0, 0, 0.05), 0 40px 64px -12px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(16px);
  padding: 14px 8px;
`;
