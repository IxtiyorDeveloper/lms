import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div<{ size?: string }>`
  width: ${(props) => props.size || "40px"};
  height: ${(props) => props.size || "40px"};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: ${fontSizes.f12};
  line-height: 1.2;

  text-align: center;
  letter-spacing: -0.01em;

  color: ${textColors.blueGray};
`;
