import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const MinusWrapper = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background: ${bgColors.yourShadow};
  color: ${textColors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: 20px;
  width: 20px;
`;

export const PlaceholderWrapper = styled.div`
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: transparent;

  .plus {
    margin-top: -30px;
  }
`;
