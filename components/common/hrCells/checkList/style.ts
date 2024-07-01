import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const CheckListWrapper = styled.div<{ passed: number }>`
  min-width: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  padding: 6px 8px;
  cursor: pointer;
  background: ${({ passed }) =>
    !passed
      ? `${bgColors.pastel}`
      : `linear-gradient(
      to right,
      ${passed === 100 ? bgColors.midori : bgColors.deep} ${passed}%,
      ${bgColors.pastel} ${passed}%
    )`};
  box-shadow: ${({ passed }) =>
    `0 0 4px 0 ${passed === 100 ? bgColors.pearl : bgColors.kitten} inset`};
`;

export const ProgressCount = styled.div`
  color: ${textColors.white};
  font-size: ${fontSizes.f14};
  font-weight: 500;
  letter-spacing: 0.5px;
`;
