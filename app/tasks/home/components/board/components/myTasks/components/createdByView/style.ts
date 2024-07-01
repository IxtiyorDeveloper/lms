import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0 0 0;
`;

export const TextView = styled.p<{ color?: string }>`
  font-weight: 500;
  color: ${(props) => (props.color ? props.color : textColors.harrison)};
  font-size: ${fontSizes.f12};
  line-height: 1.1;

  &:first-of-type {
    margin-bottom: 6px;
  }
`;
