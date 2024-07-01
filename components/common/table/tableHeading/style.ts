import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Heading = styled.div<{ padding: boolean }>`
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${textColors.paleSky};
  text-align: left;
  padding: ${(props) => (props.padding ? "16px" : 0)} 0;
  min-width: auto;
`;
