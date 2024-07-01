import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 12px;
`;
export const Box = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex: 1 0 0;
  border-radius: 8px;
  background: ${bgColors.whiteSmoke};
`;
export const Names = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
export const Dot = styled.div<{ borderColor: string; bgColor: string }>`
  background: ${(props) => props.bgColor};
  border: 1px solid ${(props) => props.borderColor};
  width: 6px;
  height: 6px;
  border-radius: 50%;
`;
export const Title = styled.p`
  color: ${textColors.blueGray};
  font-size: ${fontSizes.f10};
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.2px;
`;
export const Amount = styled.p`
  color: ${textColors.dark};
  text-align: center;
  font-size: ${fontSizes.f14};
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.28px;
`;
