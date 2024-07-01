import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Top = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.01em;
  color: ${textColors.sceptreBlue};
`;
export const Bottom = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.01em;
  color: ${textColors.sceptreBlue};
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  .unfit {
    padding: 2px 4px;
    background: ${bgColors.pop};
    border-radius: 4px;
    font-style: normal;
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    letter-spacing: -0.01em;
    color: ${textColors.white};
    width: fit-content;
  }
`;
