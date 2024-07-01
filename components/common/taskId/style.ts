import styled from "@emotion/styled";
import {  fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  padding: 4px 8px 4px 6px;
  background-color: ${(props) => props.color};
  color: ${textColors.white};
  border-radius: 40px;
  font-size: ${fontSizes.f12};
  font-weight: 500;
`;

export const IdWrapper = styled.span`
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
  gap: 3px;
`;
