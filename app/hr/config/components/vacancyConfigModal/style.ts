import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 16px;
`;

export const ModalTitle = styled.div`
  font-weight: 700;
  font-size: ${fontSizes.f14};
  margin-bottom: 22px;
`;

export const WrapFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  margin-top: 20px;
  border-top: 1px solid ${bgColors.whiteSmoke};
`;
export const PaintWrapper = styled.div<{ bgColor?: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: ${fontSizes.f12};
  color: ${textColors.sceptreBlue};
  background: ${({ bgColor }) => bgColor || `${bgColors.wildSand}`};
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;
