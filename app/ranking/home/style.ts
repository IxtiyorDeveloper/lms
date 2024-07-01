import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div<{ mt: number }>`
  margin: 0 40px;
  padding: 20px;
  border-radius: 12px;
  background: ${bgColors.white};
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.05);
  margin-top: ${(props) => props.mt}px;

  .divider {
    height: 1px;
    width: 100%;
    background: ${bgColors.purpleCrystal};
    margin-top: 16px;
  }
`;
