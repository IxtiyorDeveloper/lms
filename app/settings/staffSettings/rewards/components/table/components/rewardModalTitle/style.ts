import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Title = styled.h4`
  font-size: ${fontSizes.f14};
  font-style: normal;
  font-weight: 700;
  align-self: center;
`;

export const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px;
  border-radius: 20px;
  background: ${bgColors.white};
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.25) inset;
  color: ${textColors.blueGray};
  font-size: ${fontSizes.f12};
  font-weight: 500;
  letter-spacing: -0.12px;
`;
