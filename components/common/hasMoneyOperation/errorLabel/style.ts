import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  p {
    color: ${textColors.red};
    margin-top: 6px;
    font-weight: 500;
    padding: 0 !important;
    font-size: ${fontSizes.f12};
  }
`;
