import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";
import { HexToRgbA } from "utils/hexToRgba";

export const Wrapper = styled.div``;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 16px 0;

  .btn-rewards {
    background-color: ${bgColors.deep};
    color: ${textColors.white};
    box-shadow: 0 3px 4px 0 #87a5ff inset;
  }

  .btn-rewards:hover {
    background-color: ${HexToRgbA(bgColors.royal, 0.8)};
  }
`;
