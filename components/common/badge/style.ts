import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  position: relative !important;
  width: fit-content;
`;
export const IconWrapper = styled.div``;
export const TextWrapper = styled.div<{ w: number }>`
  position: absolute;
  width: ${(props) => `${props.w}px`};
  height: ${(props) => `${props.w}px`};
  font-weight: 800;
  font-size: ${fontSizes.f8};
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${textColors.white};
  border-radius: 50%;
  background-color: ${bgColors.pepper};
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
`;
