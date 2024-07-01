import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";
import { HexToRgbA } from "utils/hexToRgba";

export const Wrapper = styled.div`
  text-align: center;
  padding: 20px 0;
`;

export const FullNameWrapper = styled.p`
  font-weight: 600;
  font-size: ${fontSizes.f14};
  line-height: 1.5;
  margin-top: 6px;
  margin-bottom: 30px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;

  .btn-cancel {
    width: 100%;
    background-color: ${HexToRgbA(bgColors.purpleCrystal, 0.8)};
    color: ${bgColors.yourShadow};
  }
`;
