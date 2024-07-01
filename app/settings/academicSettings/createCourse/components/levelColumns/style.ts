import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;

  .icon {
    padding: 10px 10px 10px 0;
    cursor: pointer;
  }
`;
export const Flex = styled.div`
  display: flex;
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${textColors.dark};
  gap: 10px;
`;
