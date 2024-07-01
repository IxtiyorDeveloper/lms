import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  p {
    width: 100%;
    color: ${textColors.red};
    margin-top: 6px;
    font-weight: 500;
    padding: 0 !important;
    font-size: ${fontSizes.f12};
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
