import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div``;

export const ChartWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const CountsWrapper = styled.div`
  display: grid;
  gap: 8px;
  font-size: ${fontSizes.f10};
  font-weight: 500;
  grid-template-columns: 1fr 1fr;
  color: ${textColors.yourShadow};
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px;
  border-radius: 4px;
  background-color: ${bgColors.whiteSmoke};
`;

export const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  box-shadow: 0 2px 4px 0 ${(props) => props.color} inset;
`;

export const FirstSide = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
