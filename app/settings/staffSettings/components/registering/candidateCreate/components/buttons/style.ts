import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid ${bgColors.purpleCrystal};
  padding: 20px;
  margin-top: 40px;
  background-color: ${bgColors.brilliance};
  border-radius: 0 0 14px 14px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;

  .btn-secondary {
    background-color: ${bgColors.wildSand};
    color: ${textColors.yourShadow};
  }
`;
