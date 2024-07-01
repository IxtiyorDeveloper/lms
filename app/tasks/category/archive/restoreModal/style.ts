import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const IconWrapper = styled.div`
  margin: 20px auto 30px auto;
  text-align: center;
`;

export const TextWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;

  .close-btn {
    color: ${textColors.yourShadow};
    background-color: ${bgColors.purpleCrystal};
  }
`;
