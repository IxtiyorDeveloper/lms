import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  gap: 2px;
  width: 100%;
  align-items: flex-end;
`;

export const Col = styled.div<{ percentage: number }>`
  width: ${(props) => `${props.percentage}%`};
  min-width: 3px;
`;

export const Part = styled.div<{ color: string }>`
  background: ${(props) => props.color};
  border-radius: 4px;
  height: 30px;
`;

export const Label = styled.div`
  color: ${textColors.blueGray};
  text-align: center;
  font-size: ${fontSizes.f14};
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.28px;
`;

export const Top = styled.div<{ percentage: number }>`
  display: flex;
  margin-bottom: 10px;
  justify-content: ${(props) =>
    props.percentage > 50 ? "flex-end" : "flex-start"};
`;
