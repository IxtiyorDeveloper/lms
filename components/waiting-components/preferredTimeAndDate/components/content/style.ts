import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export const Row = styled.div`
  gap: 4px;
  color: ${textColors.sceptreBlue} !important;
  font-weight: 600;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
  cursor: pointer;
  align-items: center;
  width: fit-content;
  .infoCell {
  }

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
  }
`;
